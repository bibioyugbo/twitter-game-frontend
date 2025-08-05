import dateIcon from "../../../assets/images/date-disaster-icon.svg"
import importImg from "../../../assets/images/import.svg"
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import domtoimage from 'dom-to-image-more';
import shareImg from "../../../assets/images/export.svg";
import reverseImg from "../../../assets/images/reverse2.svg"
import {useNavigate, useLocation} from "react-router-dom";
import Loader from "@/components/loader/Loader.tsx";
import {RootState} from "@/store";

export default function DatingAnswer (){
    const resultRef = useRef<HTMLDivElement>(null)
    const buttonsRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const location = useLocation();
    const [isDomReady, setIsDomReady] = useState(false);
    const [isFullyRendered, setIsFullyRendered] = useState(false);
    const [isSharing, setIsSharing] = useState(false);

    const routeData = location.state;
    const { daterType: reduxDaterType } = useSelector((state: RootState) => state.daterType);
    const daterType = routeData?.daterType || reduxDaterType;

    const goToStart = () => {
        navigate("/")
    }

    // Aggressive rendering verification
    const verifyFullyRendered = async () => {
        const node = resultRef.current;
        if (!node) return false;

        // Take a test screenshot to verify rendering
        try {
            const testBlob = await domtoimage.toBlob(node, {
                width: node.offsetWidth,
                height: node.offsetHeight,
                quality: 0.1, // Low quality for speed
            });

            // Convert to canvas to check if we have actual content
            return new Promise<boolean>((resolve) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();

                img.onload = () => {
                    if (!ctx) {
                        resolve(false);
                        return;
                    }

                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    // Check if we have non-transparent pixels AND decent color variety
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    let hasContent = false;
                    let colorVariety = new Set();

                    for (let i = 0; i < imageData.data.length; i += 4) {
                        const r = imageData.data[i];
                        const g = imageData.data[i + 1];
                        const b = imageData.data[i + 2];
                        const a = imageData.data[i + 3];

                        if (a > 0) { // Has content
                            hasContent = true;
                            // Track color variety (helps detect if fonts/backgrounds loaded)
                            colorVariety.add(`${r}-${g}-${b}`);
                        }
                    }

                    // We should have content AND reasonable color variety (indicates fonts/backgrounds loaded)
                    const hasGoodVariety = colorVariety.size > 5; // At least 5 different colors

                    console.log(`Render check: hasContent=${hasContent}, colorVariety=${colorVariety.size}`);
                    resolve(hasContent && hasGoodVariety);
                };

                img.onerror = () => resolve(false);
                img.src = URL.createObjectURL(testBlob);
            });
        } catch (error) {
            console.error('Render verification failed:', error);
            return false;
        }
    };

    // Enhanced DOM preparation function
    const ensureDomReady = async (maxRetries = 5) => {
        let attempt = 0;

        while (attempt < maxRetries) {
            attempt++;

            // Load fonts with timeout
            try {
                await Promise.race([
                    document.fonts.load('bold 1rem "Recoleta-Bold"'),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Font timeout')), 3000))
                ]);
                await document.fonts.ready;
            } catch (error) {
                console.warn('Font loading issue:', error);
            }

            // Preload the main image
            const img = new Image();
            await new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
                img.src = dateIcon;
            });

            // Wait for all page images
            const allImages = Array.from(document.images);
            await Promise.all(allImages.map(image => {
                if (image.complete) return Promise.resolve();
                return new Promise(resolve => {
                    image.onload = resolve;
                    image.onerror = resolve;
                    setTimeout(resolve, 2000); // Timeout fallback
                });
            }));

            // Force multiple repaints with increasing delays
            for (let i = 0; i < 3; i++) {
                await new Promise(resolve => {
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            void document.body.offsetHeight; // Force reflow
                            setTimeout(resolve, 200 * (i + 1));
                        });
                    });
                });
            }

            // Verify rendering worked
            const isRendered = await verifyFullyRendered();
            if (isRendered) {
                console.log(`DOM ready after ${attempt} attempts`);
                return true;
            }

            console.warn(`Render verification failed, attempt ${attempt}/${maxRetries}`);

            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        console.error('Failed to verify complete rendering after all attempts');
        return false;
    };

    const downloadResult = async () => {
        const node = resultRef.current;
        const buttons = buttonsRef.current;

        if (!node || !isFullyRendered) {
            console.error(`Element not ready for capture`);
            return;
        }

        if (buttons) buttons.style.display = "none";

        try {
            const blob = await domtoimage.toBlob(node, {
                quality: 1,
                pixelRatio: 2
            });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'date-or-disaster.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error downloading image:', error);
        } finally {
            if (buttons) buttons.style.display = '';
        }
    };

    const shareWithImage = async () => {
        const node = resultRef.current;
        const buttons = buttonsRef.current;

        if (!node || !buttons || !isFullyRendered) {
            console.error(`Not ready for sharing`);
            return;
        }

        setIsSharing(true);

        try {
            buttons.style.display = "none";

            // MANDATORY: Force everything to load again before sharing
            console.log("Forcing final render verification...");

            // Re-verify fonts are loaded
            await document.fonts.load('bold 1rem "Recoleta-Bold"');
            await document.fonts.ready;

            // Force image reload
            const img = new Image();
            await new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
                img.src = dateIcon;
            });

            // Force 3 paint cycles with longer delays
            for (let i = 0; i < 3; i++) {
                await new Promise(resolve => {
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            void document.body.offsetHeight;
                            void node.offsetHeight; // Force reflow on specific element
                            setTimeout(resolve, 300);
                        });
                    });
                });
            }

            // FINAL verification - if this fails, we abort
            let verificationAttempts = 0;
            let isVerified = false;

            while (verificationAttempts < 3 && !isVerified) {
                verificationAttempts++;
                console.log(`Final verification attempt ${verificationAttempts}/3`);

                isVerified = await verifyFullyRendered();

                if (!isVerified) {
                    console.warn(`Verification failed, retrying...`);
                    await new Promise(resolve => setTimeout(resolve, 500));

                    // Force another repaint
                    await new Promise(resolve => {
                        requestAnimationFrame(() => {
                            requestAnimationFrame(resolve);
                        });
                    });
                }
            }

            if (!isVerified) {
                throw new Error('Content verification failed after multiple attempts');
            }

            console.log("✅ All content verified - proceeding with share");

            const scale = 2;
            const style = {
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: `${node.offsetWidth}px`,
                height: `${node.offsetHeight}px`,
            };

            const blob = await domtoimage.toBlob(node, {
                width: node.offsetWidth * scale,
                height: node.offsetHeight * scale,
                style,
                quality: 1,
                pixelRatio: 1
            });

            const file = new File([blob], "date-or-disaster.png", { type: "image/png" });

            if (navigator.canShare?.({ files: [file] })) {
                await navigator.share({
                    title: "Date or Disaster",
                    text: `I am a ${daterType?.name}!\nFind out yours! 👉`,
                    files: [file],
                    url: 'https://date-or-disaster.netlify.app',
                });
            } else if (navigator.share) {
                await navigator.share({
                    title: "Date or Disaster",
                    text: `I am a ${daterType?.name}!\nFind out yours! 👉`,
                    url: 'https://date-or-disaster.netlify.app',
                });
            } else {
                const url = URL.createObjectURL(file);
                const link = document.createElement("a");
                link.href = url;
                link.download = "date-or-disaster.png";
                link.click();
                URL.revokeObjectURL(url);
            }
        } catch (err) {
            console.error("Sharing failed", err);
            alert("Content not ready yet. Please wait a moment and try again.");
        } finally {
            if (buttons) buttons.style.display = "flex";
            setIsSharing(false);
        }
    };

    // Initialize DOM preparation immediately when component mounts
    useEffect(() => {
        // Show loader immediately
        if (daterType) {
            const prepareDOM = async () => {
                // Check if assets were preloaded from the previous page
                const wasPreloaded = location.state?.preloaded;

                if (wasPreloaded) {
                    console.log("✅ Using preloaded assets");
                    // Still do a quick verification but with shorter timeouts
                    await new Promise(resolve => {
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                setTimeout(resolve, 100);
                            });
                        });
                    });
                    setIsDomReady(true);
                    setIsFullyRendered(true);
                } else {
                    console.log("⏳ Loading assets from scratch");
                    const success = await ensureDomReady();
                    setIsDomReady(true);

                    if (success) {
                        // Additional wait to ensure paint completion
                        await new Promise(resolve => setTimeout(resolve, 300));
                        setIsFullyRendered(true);
                    } else {
                        // Fallback - set as rendered anyway after timeout
                        setTimeout(() => setIsFullyRendered(true), 1000);
                    }
                }
            };

            prepareDOM();
        }
    }, [daterType, location.state]);

    return (
        <>
            <div ref={resultRef} className={'no-border justify-center h-dvh app-wrapper date-or-disaster p-5 flex items-center flex-col w-full'}>
                <div className={"no-border mt-[20px] justify-center flex-1 flex gap-4 flex-col w-full items-center"}>
                    {
                        (!daterType) ? <Loader showLoader={true}/> :
                            !isDomReady ? <Loader showLoader={true}/> :
                                <div className={"no-border flex flex-col items-center"}>
                                    <div className="bg-[#EBEBEB1A] px-3 py-3 w-full flex gap-4 flex-col items-center rounded-[26px] md:rounded-[40px] border-[2.14px] border-[#DEE4FF2E] md:w-[508px]">
                                        <img
                                            src={dateIcon}
                                            className={"no-border my-3"}
                                            width={236}
                                            height={119}
                                            alt={""}
                                            loading="eager"
                                            style={{ imageRendering: 'auto' }}
                                        />
                                        <div className="bg-white p-5 pb-12 flex flex-col items-center rounded-[18px] md:w-[476px] w-full">
                                            <p className={"no-border text-[#A6A5A5] text-base"}>you are {daterType?.name !== "Difficult to Date 🐍"? "a": ""}</p>
                                            <p className={"no-border text-[#010101] my-3 font-[Recoleta-Bold] text-3xl"}>{daterType?.name}</p>
                                            <p className={"no-border text-[#646363] font-medium text-base md:text-xl"}>{daterType?.description}</p>
                                        </div>
                                    </div>

                                    <div ref={buttonsRef} className={"no-border flex gap-2 mt-8"}>
                                        <button
                                            onClick={goToStart}
                                            className={"no-border bg-[#0D0735] cursor-pointer hover:scale-105 transition-transform flex items-center justify-center rounded-[64px] h-[44px] w-[44px] md:h-[64px] md:w-[64px]"}
                                        >
                                            <img className={"no-border h-7 w-7"} src={reverseImg} alt={""}/>
                                        </button>

                                        <button
                                            disabled={!isFullyRendered || isSharing}
                                            onClick={shareWithImage}
                                            className={"no-border bg-[#0D0735] md:hidden cursor-pointer hover:scale-105 transition-transform flex items-center justify-center rounded-[64px] h-[44px] w-[44px] md:h-[64px] md:w-[64px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"}
                                            title={!isFullyRendered ? "Preparing content..." : "Share result"}
                                        >
                                            {isSharing ? (
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                            ) : (
                                                <img className={"no-border h-6 w-6 md:h-[25px] md:w-[25px]"} src={shareImg} alt={""}/>
                                            )}
                                        </button>

                                        <button
                                            disabled={!isFullyRendered}
                                            onClick={downloadResult}
                                            className={"hidden no-border bg-[#0D0735] cursor-pointer hover:scale-105 transition-transform md:flex items-center justify-center rounded-[64px] h-[44px] w-[44px] md:h-[64px] md:w-[64px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"}
                                        >
                                            <img
                                                className="no-border h-6 w-6 md:h-[30px] md:w-[30px]"
                                                src={importImg}
                                                alt=""
                                            />
                                        </button>
                                    </div>
                                </div>
                    }
                </div>

                <footer className={"no-border footer-text flex-nowrap text-xs md:text-sm text-white"}>
                    Made with ❤️ by <a className={"no-border underline"} target="_blank" rel="noopener noreferrer" href="https://x.com/adathedesigner">Adaeze</a> and <a className={"no-border underline"} target="_blank" rel="noopener noreferrer" href="https://x.com/bibibuilds">Bibi</a>
                </footer>
            </div>
        </>
    )
}