import DateOrDisasterWrapper from "@/components/layouts/DateOrDisasterWrapper.tsx";
import dateIcon from "../../../assets/images/date-disaster-icon.svg"
import importImg from "../../../assets/images/import.svg"
import {useSelector} from "react-redux";
import {dataType, dataTypeLoading} from "@/store/modules/questionSlice.ts";
import Loader from "@/components/loader/Loader.tsx";
import {useEffect, useRef, useState} from "react";
import domtoimage from 'dom-to-image-more';
import shareImg from "../../../assets/images/export.svg"



export default function DatingAnswer (){
    const daterType = useSelector(dataType)
    const loading = useSelector(dataTypeLoading);
    const resultRef = useRef<HTMLDivElement>(null)
    const [showButton, setShowButton] = useState(false);

    // const [imageUrl, setImageUrl] = useState<string | null>(null);
    // const [showModal, setShowModal] = useState(false);

    const downloadResult = async () => {
        const node = resultRef.current;
        if (!node) {
            console.error(`Element with ID not found`);
            return;
        }

        try {
            const blob = await domtoimage.toBlob(node);
            const link = document.createElement('a');
            // setImageUrl(URL.createObjectURL(blob))
            link.href = URL.createObjectURL(blob);
            link.download = 'date-or-disaster.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };
    // const shareWithImage = async () => {
    //     const node = resultRef.current;
    //     if (!node) {
    //         console.error(`Element not found`);
    //         return;
    //     }
    //
    //     // First, let's test if sharing works at all
    //     console.log('Testing navigator.share capability...');
    //     console.log('navigator.share exists:', !!navigator.share);
    //     console.log('navigator.canShare exists:', !!navigator.canShare);
    //
    //     // Test basic text sharing first
    //     if (navigator.share) {
    //         try {
    //             console.log('Attempting basic text share...');
    //             await navigator.share({
    //                 title: "Date or Disaster",
    //                 text: `I am a ${daterType?.name}!\nFind out yours! 👉 https://date-or-disaster.netlify.app`,
    //             });
    //             console.log('Basic text sharing worked!');
    //             return; // Remove this return after testing
    //         } catch (textErr) {
    //             console.error('Basic text sharing failed:', textErr);
    //         }
    //     }
    //
    //     // Now try with image generation
    //     try {
    //         console.log('Starting image generation process...');
    //         await document.fonts.ready;
    //         console.log('Fonts ready');
    //
    //         const scale = 2; // Reduced scale for better mobile performance
    //         const style = {
    //             transform: `scale(${scale})`,
    //             transformOrigin: 'top left',
    //             width: `${node.offsetWidth}px`,
    //             height: `${node.offsetHeight}px`,
    //         };
    //
    //         node.scrollIntoView({ behavior: "auto", block: "center" });
    //         await new Promise(resolve => requestAnimationFrame(resolve));
    //         await new Promise(resolve => setTimeout(resolve, 500));
    //
    //         console.log('About to generate blob...');
    //         const blob = await domtoimage.toBlob(node, {
    //             width: node.offsetWidth * scale,
    //             height: node.offsetHeight * scale,
    //             style,
    //             quality: 0.9, // Slightly lower quality for better compatibility
    //         });
    //
    //         console.log('Blob generated:', !!blob);
    //         if (!blob) {
    //             throw new Error('Blob generation returned null');
    //         }
    //
    //         const file = new File([blob], "date-or-disaster.png", { type: "image/png" });
    //         console.log('File created, size:', file.size);
    //
    //         // Test file sharing capability
    //         if (navigator.canShare) {
    //             const canShareFile = navigator.canShare({ files: [file] });
    //             console.log('Can share files:', canShareFile);
    //         }
    //
    //         if (navigator.canShare && navigator.canShare({ files: [file] })) {
    //             console.log('Attempting to share with file...');
    //             await navigator.share({
    //                 title: "Date or Disaster",
    //                 text: `I am a ${daterType?.name}!\nFind out yours! 👉`,
    //                 files: [file],
    //                 url: 'https://date-or-disaster.netlify.app',
    //             });
    //             console.log('File sharing successful!');
    //         } else if (navigator.share) {
    //             console.log('File sharing not supported, trying text only...');
    //             await navigator.share({
    //                 title: "Date or Disaster",
    //                 text: `I am a ${daterType?.name}!\nFind out yours! 👉 https://date-or-disaster.netlify.app`,
    //             });
    //             console.log('Text sharing successful!');
    //         } else {
    //             console.log('No sharing support, using fallback...');
    //             // Your modal fallback
    //             // const imageUrl = URL.createObjectURL(file);
    //             // setImageUrl(imageUrl);
    //             // setShowModal(true);
    //         }
    //
    //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     } catch (err) {
    //         console.error('Error details:');
    //
    //         // Try text sharing as last resort
    //         if (navigator.share) {
    //             try {
    //                 console.log('Attempting fallback text sharing...');
    //                 await navigator.share({
    //                     title: "Date or Disaster",
    //                     text: `I am a ${daterType?.name}!\nFind out yours! 👉 https://date-or-disaster.netlify.app`,
    //                 });
    //                 console.log('Fallback text sharing worked!');
    //             } catch (shareErr) {
    //                 console.error('Fallback sharing also failed:', shareErr);
    //                 alert(`Sharing failed. Error:`);
    //             }
    //         } else {
    //             alert(`Sharing not supported. Error: `);
    //         }
    //     }
    // };
    const shareWithImage = async () => {
        const node = resultRef.current;
        if (!node) {
            console.error(`Element not found`);
            return;
        }

        try {
            await document.fonts.ready;
            const scale = 3; // or 3 for ultra HD
            const style = {
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: `${node.offsetWidth}px`,
                height: `${node.offsetHeight}px`,
            };
            node.scrollIntoView({ behavior: "auto", block: "center" });
            await new Promise(resolve => requestAnimationFrame(resolve));
            await new Promise(resolve => setTimeout(resolve, 300));

            const blob = await domtoimage.toBlob(node, {
                width: node.offsetWidth * scale,
                height: node.offsetHeight * scale,
                style,
            });

            const file = new File([blob], "date-or-disaster.png", { type: "image/png" });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: "Date or Disaster",
                    text: `I am a ${daterType?.name}!\nFind out yours! 👉`,
                    files: [file],
                    url: 'https://date-or-disaster.netlify.app',
                });
            }
            // else {
            //     // fallback
            //     setImageUrl(URL.createObjectURL(file));
            //     setShowModal(true);
            // }

        } catch (err) {
            console.error("Sharing failed", err);
            alert("Sharing is not supported or failed.");
        }
    };

    // const downloadResult = async (sectionId:string) => {
    //     try {
    //         const section = document.getElementById(sectionId);
    //         if (!section) {
    //             console.error(`Element with ID "${sectionId}" not found`);
    //             return;
    //         }
    //
    //         console.log('Found element:', section);
    //         console.log('Is in DOM:', document.contains(section));
    //
    //         // const html2canvas = (await import('html2canvas')).default;
    //
    //         await document.fonts.ready;
    //         await new Promise(resolve => setTimeout(resolve, 100));
    //
    //         const canvas = await html2canvas(section, {
    //             logging: true,
    //             useCORS: true,
    //             // backgroundColor: '#ffffff', // Try with white background instead of null
    //             // scale: 1, // Reduce scale to see if that helps
    //             // useCORS: true,
    //             // allowTaint: true,
    //             // logging: true, //
    //             ignoreElements: (element) => {
    //                 // Skip elements with oklch colors
    //                 const computedStyle = window.getComputedStyle(element);
    //                 return computedStyle.backgroundColor.includes('oklch') ||
    //                     computedStyle.color.includes('oklch');
    //             }
    //         });
    //         console.log("This is your section after", section)
    //         console.log("This is your canvas", canvas)
    //         canvas.toBlob((blob:Blob | null) => {
    //             if (!blob) {
    //                 console.error('Failed to create blob');
    //                 return;
    //             }
    //             const url = URL.createObjectURL(blob);
    //             const link = document.createElement('a');
    //             link.href = url;
    //             link.download = `date-or-disaster.png`;
    //             document.body.appendChild(link);
    //             link.click();
    //             document.body.removeChild(link);
    //             URL.revokeObjectURL(url);
    //         });
    //     } catch (error) {
    //         console.error('Error downloading image:', error);
    //     }
    // };
    // const shareToTwitter = () => {
    //     const text = `Date or Disaster\nI am a ${daterType?.name}!\nhttps://date-or-disaster.netlify.app/\n${imageUrl}\n Find out yours!`;
    //     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    //     window.open(url, '_blank');
    // };


    // useEffect(() => {
    //     const node = document.getElementById('result');
    //     if (isMobile && node) {
    //         domtoimage.toBlob(node).then(blob => {
    //             const url = URL.createObjectURL(blob);
    //             setImageUrl(url);
    //         }).catch(err => {
    //             console.error('Image generation failed', err);
    //         });
    //     }
    // }, [daterType]);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 10000); // 7 seconds

        return () => clearTimeout(timer);
    }, []);

    return(
        <>
            <div className={"no-border"} ref={resultRef}>
                <DateOrDisasterWrapper>
                    {
                        loading? <Loader showLoader={loading}/>:
                            <div className={" no-border mt-[20px] flex gap-4 flex-col w-full items-center"}>
                                <div  className="bg-[#EBEBEB1A] px-3 py-3 w-full flex gap-4 flex-col items-center  rounded-[26px] border-[2.14px] border-[#DEE4FF2E]  md:w-[508px] ">
                                    <img src={dateIcon} className={"no-border  my-3"} width={236} height={119} alt={""}/>
                                    <div className="bg-white p-5 pb-12 flex flex-col items-center rounded-[18px] md:w-[476px] w-full">
                                        <p className={"no-border  text-[#A6A5A5] text-base"}>you are {daterType?.name !== "Difficult to Date 🐍"? "a": ""}</p>
                                        <p className={"no-border  text-[#010101] my-3 font-[Recoleta-Bold] text-3xl"}>{daterType?.name}</p>
                                        <p className={"no-border text-[#646363] font-medium text-base"}>{daterType?.description}</p>
                                    </div>
                                </div>
                                <div className={" no-border flex gap-2 mt-8"}>
                                    {/*<button onClick={shareToTwitter} className={"bg-[#0D0735]  cursor-pointer hover:scale-105 transition-transform flex justify-center items-center rounded-[64px] h-[64px] w-[64px]"}>*/}
                                    {/*    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 15 15"><path fill="#fff" fill-rule="evenodd" d="M7.233 4.696c0-1.727 1.4-3.127 3.127-3.127c1.014 0 1.823.479 2.365 1.175a5.3 5.3 0 0 0 1.626-.629a2.63 2.63 0 0 1-1.148 1.45l.002.003a5.3 5.3 0 0 0 1.5-.413l-.001.002c-.337.505-.76.95-1.248 1.313q.04.266.04.53c0 3.687-2.809 7.975-7.975 7.975a7.93 7.93 0 0 1-4.296-1.26a.5.5 0 0 1-.108-.748a.45.45 0 0 1 .438-.215c.916.108 1.83-.004 2.637-.356a3.1 3.1 0 0 1-1.69-1.876a.45.45 0 0 1 .103-.448a3.07 3.07 0 0 1-1.045-2.31v-.034a.45.45 0 0 1 .365-.442a3.1 3.1 0 0 1-.344-1.416c0-.468.003-1.058.332-1.59a.45.45 0 0 1 .323-.208a.5.5 0 0 1 .538.161a6.96 6.96 0 0 0 4.46 2.507zm-1.712 7.279a7 7 0 0 1-2.249-.373a5.3 5.3 0 0 0 2.39-1.042a.45.45 0 0 0-.27-.804a2.17 2.17 0 0 1-1.714-.888q.285-.023.556-.096a.45.45 0 0 0-.028-.876a2.18 2.18 0 0 1-1.644-1.474q.301.073.623.084a.45.45 0 0 0 .265-.824a2.18 2.18 0 0 1-.97-1.812q-.001-.25.013-.453a7.95 7.95 0 0 0 5.282 2.376a.5.5 0 0 0 .513-.61a2.127 2.127 0 0 1 2.071-2.614c1.234 0 2.136 1.143 2.136 2.432c0 3.256-2.476 6.974-6.975 6.974" clip-rule="evenodd"/></svg>                           */}
                                    {/*</button>*/}


                                    {showButton?
                                        <button onClick={shareWithImage} className={"no-border bg-[#0D0735] cursor-pointer hover:scale-105 transition-transform flex items-center justify-center rounded-[64px] h-[64px] w-[64px]"}>
                                            <img className={"no-border"} src={shareImg} height={24} width={24} alt={""}/>
                                        </button>: <p className={"text-white"}>Processing Image...</p>
                                    }

                                    <button onClick={downloadResult} className={" no-border bg-[#0D0735] cursor-pointer hover:scale-105 transition-transform flex items-center  justify-center rounded-[64px] h-[64px] w-[64px]"}>
                                        <img className={"no-border"} src={importImg} height={24} width={24} alt={""}/>
                                    </button>
                                    {/*        {showModal && imageUrl &&*/}
                                    {/*            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">*/}
                                    {/*            <div className="relative max-w-md w-full p-4">*/}
                                    {/*            <button*/}
                                    {/*            onClick={() => {*/}
                                    {/*            setShowModal(false);*/}
                                    {/*            setImageUrl(null);*/}
                                    {/*        }}*/}
                                    {/*            className="absolute top-2 right-2 text-white text-2xl"*/}
                                    {/*            >*/}
                                    {/*            &times;*/}
                                    {/*            </button>*/}
                                    {/*            <img*/}
                                    {/*            src={imageUrl}*/}
                                    {/*        alt="Your result"*/}
                                    {/*        className="w-full rounded-lg"*/}
                                    {/*    />*/}
                                    {/*    <p className="mt-2 text-center text-white text-sm">*/}
                                    {/*        Tap and hold the image to save or share*/}
                                    {/*    </p>*/}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                    {/*}*/}
                                    {/*{isMobile && imageUrl && (*/}
                                    {/*    <div className="text-center">*/}
                                    {/*        <img*/}
                                    {/*            src={imageUrl}*/}
                                    {/*            alt="Generated result"*/}
                                    {/*            style={{ maxWidth: '100%', borderRadius: '1rem', marginBottom: '0.5rem' }}*/}
                                    {/*        />*/}
                                    {/*        <p style={{ fontSize: '0.9rem', color: '#555' }}>*/}
                                    {/*            Tap and hold the image to save it*/}
                                    {/*        </p>*/}
                                    {/*    </div>*/}
                                    {/*)}*/}
                                </div>
                                <footer className={"no-border footer-text flex-nowrap text-xs md:text-sm text-white"}>Made with ❤️ by <span className={"no-border underline"}>Adaeze</span> and <span className={" no-border underline"}>Bibi</span></footer>

                            </div>

                    }
                </DateOrDisasterWrapper>
            </div>

        </>
    )
}