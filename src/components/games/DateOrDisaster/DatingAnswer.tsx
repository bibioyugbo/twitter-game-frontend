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
    const [isSharing, setIsSharing] = useState(false);

    const routeData = location.state;
    const { daterType: reduxDaterType } = useSelector((state: RootState) => state.daterType);
    const daterType = routeData?.daterType || reduxDaterType;

    const goToStart = () => {
        navigate("/")
    }

    // Enhanced DOM preparation function
    const ensureDomReady = async () => {
        // Load fonts
        await document.fonts.load('bold 1rem "Recoleta-Bold"');
        await document.fonts.ready;

        // Wait for all images to load
        const images = document.images;
        const imagePromises = Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        });
        await Promise.all(imagePromises);

        // Force multiple repaints to ensure everything is rendered
        await new Promise(resolve => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        // Force reflow
                        void document.body.offsetHeight;
                        setTimeout(resolve, 300); // Increased timeout
                    });
                });
            });
        });
    };

    const downloadResult = async () => {
        const node = resultRef.current;
        const buttons = buttonsRef.current;

        if (!node) {
            console.error(`Element with ID not found`);
            return;
        }

        if (buttons) buttons.style.display = "none";

        try {
            // Ensure DOM is ready before capturing
            await ensureDomReady();

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

        if (!node || !buttons) {
            console.error(`Missing DOM references`);
            return;
        }

        setIsSharing(true);

        try {
            buttons.style.display = "none";

            // Only do minimal preparation if DOM isn't ready, otherwise trust the useEffect
            if (!isDomReady) {
                await ensureDomReady();
            } else {
                // Just a quick paint cycle wait since everything should already be ready
                await new Promise(resolve => requestAnimationFrame(() => {
                    requestAnimationFrame(resolve);
                }));
            }

            // Scroll into view and minimal wait
            node.scrollIntoView({ behavior: "auto", block: "center" });
            await new Promise(resolve => setTimeout(resolve, 50));

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
            alert("Sharing is not supported or failed.");
        } finally {
            if (buttons) buttons.style.display = "flex";
            setIsSharing(false);
        }
    };

    // Initialize DOM preparation on mount
    useEffect(() => {
        if (daterType && !isDomReady) {
            const prepareDOM = async () => {
                await ensureDomReady();
                // Additional browser paint cycle wait after setting ready state
                await new Promise(resolve => setTimeout(resolve, 100));
                setIsDomReady(true);
            };

            prepareDOM();
        }
    }, [daterType, isDomReady]);

    return (
        <>
            <div ref={resultRef} className={'no-border justify-center h-dvh app-wrapper date-or-disaster p-5 flex items-center flex-col w-full'}>
                <div className={"no-border mt-[20px] justify-center flex-1 flex gap-4 flex-col w-full items-center"}>
                    {
                        (!daterType || !isDomReady) ? <Loader showLoader={true}/> :
                            <div className={"no-border flex flex-col items-center"}>
                                <div className="bg-[#EBEBEB1A] px-3 py-3 w-full flex gap-4 flex-col items-center rounded-[26px] md:rounded-[40px] border-[2.14px] border-[#DEE4FF2E] md:w-[508px]">
                                    <img src={dateIcon} className={"no-border my-3"} width={236} height={119} alt={""} loading="eager"/>
                                    <div className="bg-white p-5 pb-12 flex flex-col items-center rounded-[18px] md:w-[476px] w-full">
                                        <p className={"no-border text-[#A6A5A5] text-base"}>you are {daterType?.name !== "Difficult to Date 🐍"? "a": ""}</p>
                                        <p className={"no-border text-[#010101] my-3 font-[Recoleta-Bold] text-3xl"}>{daterType?.name}</p>
                                        <p className={"no-border text-[#646363] font-medium text-base md:text-xl"}>{daterType?.description}</p>
                                    </div>
                                </div>

                                <div ref={buttonsRef} className={"no-border flex gap-2 mt-8"}>
                                    <button
                                        onClick={goToStart}
                                        className={"no-border md:hidden bg-[#0D0735] cursor-pointer hover:scale-105 transition-transform flex items-center justify-center rounded-[64px] h-[44px] w-[44px] md:h-[64px] md:w-[64px]"}
                                    >
                                        <img className={"no-border h-7 w-7"} src={reverseImg} alt={""}/>
                                    </button>

                                    <button
                                        disabled={!isDomReady || isSharing}
                                        onClick={shareWithImage}
                                        className={"no-border bg-[#0D0735] cursor-pointer hover:scale-105 transition-transform flex items-center justify-center rounded-[64px] h-[44px] w-[44px] md:h-[64px] md:w-[64px] disabled:opacity-50 disabled:cursor-not-allowed"}
                                    >
                                        {isSharing ? (
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                        ) : (
                                            <img className={"no-border h-6 w-6 md:h-[25px] md:w-[25px]"} src={shareImg} alt={""}/>
                                        )}
                                    </button>

                                    <button
                                        onClick={downloadResult}
                                        className={"hidden no-border bg-[#0D0735] cursor-pointer hover:scale-105 transition-transform md:flex items-center justify-center rounded-[64px] h-[44px] w-[44px] md:h-[64px] md:w-[64px]"}
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