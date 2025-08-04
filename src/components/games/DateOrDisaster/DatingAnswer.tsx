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
    // const daterType = useSelector(dataType)
    // const loading = useSelector(dataTypeLoading);
    const resultRef = useRef<HTMLDivElement>(null)
    const buttonsRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const location = useLocation();
    const [isDomReady, setIsDomReady] = useState(false);

    // const [showButton, setShowButton] = useState(false);

    // const [imageUrl, setImageUrl] = useState<string | null>(null);
    // const [showModal, setShowModal] = useState(false);

    const routeData = location.state;
    const { daterType: reduxDaterType } = useSelector((state: RootState) => state.daterType);

    const daterType = routeData?.daterType || reduxDaterType;

    const goToStart=()=>{
        navigate("/")
    }
    const downloadResult = async () => {
        const node = resultRef.current;
        const buttons = buttonsRef.current
        if (!node) {
            console.error(`Element with ID not found`);
            return;
        }

        if (buttons)buttons.style.display= "none"

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
        finally {
            if (buttons) buttons.style.display = '';
        }
    };

    const shareWithImage = async () => {
        const node = resultRef.current;
        const buttons = buttonsRef.current;

        if (!isDomReady) {
            console.warn("Preparing your results");
            return;
        }

        if (!node || !buttons) {
            console.error(`Missing DOM references`);
            return;
        }

        try {
            buttons.style.display = "none";

            const scale = 2;
            const style = {
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: `${node.offsetWidth}px`,
                height: `${node.offsetHeight}px`,
            };

            node.scrollIntoView({ behavior: "auto", block: "center" });

            // Just a tiny delay since everything should be loaded
            await new Promise<void>(resolve => setTimeout(resolve, 100));

            const blob = await domtoimage.toBlob(node, {
                width: node.offsetWidth * scale,
                height: node.offsetHeight * scale,
                style,
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
        }
    };

    useEffect(() => {
        if (daterType && !isDomReady) {
            const prepareDOM = async () => {
                await document.fonts.load('bold 1rem "Recoleta-Bold"');
                await document.fonts.ready;

                const images = document.images;
                for (const img of images) {
                    if (!img.complete) {
                        await new Promise(resolve => {
                            img.onload = resolve;
                            img.onerror = resolve;
                        });
                    }
                }

                // Force two animation frames to guarantee DOM layout is fully flushed
                await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

                // Tiny buffer to be extra safe
                await new Promise(resolve => setTimeout(resolve, 100));

                setIsDomReady(true);
            };

            prepareDOM();
        }
    }, [daterType, isDomReady]);



    return(
        <>

                <div ref={resultRef} className={'no-border justify-center h-dvh app-wrapper date-or-disaster p-5 flex items-center flex-col  w-full '}>


                        <div className={" no-border mt-[20px] justify-center flex-1 flex gap-4 flex-col w-full items-center"}>
                            {
                                (!daterType || !isDomReady) ? <Loader showLoader={true}/>:
                                    <div className={"no-border flex flex-col items-center"}>
                                        <div  className="bg-[#EBEBEB1A] px-3 py-3 w-full flex gap-4 flex-col items-center  rounded-[26px] md:rounded-[40px] border-[2.14px] border-[#DEE4FF2E]  md:w-[508px] ">
                                        <img src={dateIcon} className={"no-border  my-3"} width={236} height={119} alt={""}/>
                                        <div className="bg-white p-5 pb-12 flex flex-col items-center rounded-[18px] md:w-[476px] w-full">
                                            <p className={"no-border  text-[#A6A5A5] text-base"}>you are {daterType?.name !== "Difficult to Date 🐍"? "a": ""}</p>
                                            <p className={"no-border  text-[#010101] my-3 font-[Recoleta-Bold] text-3xl"}>{daterType?.name}</p>
                                            <p className={"no-border text-[#646363] font-medium text-base md:text-xl "}>{daterType?.description}</p>
                                        </div>
                                    </div>
                                        <div ref={buttonsRef}  className={" no-border flex gap-2 mt-8"}>
                                        {/*<button onClick={shareToTwitter} className={"bg-[#0D0735]  cursor-pointer hover:scale-105 transition-transform flex justify-center items-center rounded-[64px] h-[64px] w-[64px]"}>*/}
                                        {/*    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 15 15"><path fill="#fff" fill-rule="evenodd" d="M7.233 4.696c0-1.727 1.4-3.127 3.127-3.127c1.014 0 1.823.479 2.365 1.175a5.3 5.3 0 0 0 1.626-.629a2.63 2.63 0 0 1-1.148 1.45l.002.003a5.3 5.3 0 0 0 1.5-.413l-.001.002c-.337.505-.76.95-1.248 1.313q.04.266.04.53c0 3.687-2.809 7.975-7.975 7.975a7.93 7.93 0 0 1-4.296-1.26a.5.5 0 0 1-.108-.748a.45.45 0 0 1 .438-.215c.916.108 1.83-.004 2.637-.356a3.1 3.1 0 0 1-1.69-1.876a.45.45 0 0 1 .103-.448a3.07 3.07 0 0 1-1.045-2.31v-.034a.45.45 0 0 1 .365-.442a3.1 3.1 0 0 1-.344-1.416c0-.468.003-1.058.332-1.59a.45.45 0 0 1 .323-.208a.5.5 0 0 1 .538.161a6.96 6.96 0 0 0 4.46 2.507zm-1.712 7.279a7 7 0 0 1-2.249-.373a5.3 5.3 0 0 0 2.39-1.042a.45.45 0 0 0-.27-.804a2.17 2.17 0 0 1-1.714-.888q.285-.023.556-.096a.45.45 0 0 0-.028-.876a2.18 2.18 0 0 1-1.644-1.474q.301.073.623.084a.45.45 0 0 0 .265-.824a2.18 2.18 0 0 1-.97-1.812q-.001-.25.013-.453a7.95 7.95 0 0 0 5.282 2.376a.5.5 0 0 0 .513-.61a2.127 2.127 0 0 1 2.071-2.614c1.234 0 2.136 1.143 2.136 2.432c0 3.256-2.476 6.974-6.975 6.974" clip-rule="evenodd"/></svg>                           */}
                                        {/*</button>*/}


                                        {/*{showButton?*/}
                                        {/*    <button onClick={shareWithImage} className={"no-border bg-[#0D0735] cursor-pointer hover:scale-105 transition-transform flex items-center justify-center rounded-[64px] h-[44px] w-[44px] md:h-[64px] md:w-[64px]"}>*/}
                                        {/*        <img className={"no-border h-6 w-6  md:h-[30px] md:w-[30px]"} src={shareImg} alt={""}/>*/}
                                        {/*    </button>: <p className={"no-border text-white"}>Processing Image...</p>*/}
                                        {/*}*/}
                                        <button onClick={goToStart} className={"no-border md:hidden bg-[#0D0735] cursor-pointer hover:scale-105 transition-transform flex items-center justify-center rounded-[64px] h-[44px] w-[44px] md:h-[64px] md:w-[64px]"}>
                                            <img className={"no-border h-7 w-7"} src={reverseImg} alt={""}/>
                                        </button>
                                        <button disabled={!isDomReady} onClick={shareWithImage} className={"no-border bg-[#0D0735] cursor-pointer hover:scale-105 transition-transform flex items-center justify-center rounded-[64px] h-[44px] w-[44px] md:h-[64px] md:w-[64px]"}>
                                            <img className={"no-border h-6 w-6  md:h-[25px] md:w-[25px]"} src={shareImg} alt={""}/>
                                        </button>


                                        <button onClick={downloadResult} className={" hidden no-border bg-[#0D0735] cursor-pointer hover:scale-105 transition-transform md:flex items-center  justify-center rounded-[64px] h-[44px] w-[44px] md:h-[64px] md:w-[64px]"}>
                                            <img
                                                className="no-border h-6 w-6  md:h-[30px] md:w-[30px]"
                                                src={importImg}
                                                alt=""
                                            />
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
                                    </div>
                            }
                        </div>


                    <footer className={"no-border footer-text flex-nowrap text-xs md:text-sm text-white"}>Made with ❤️ by <a className={"no-border underline"} target="_blank" rel="noopener noreferrer"  href="https://x.com/adathedesigner">Adaeze</a> and <a className={"no-border underline"} target="_blank" rel="noopener noreferrer"  href="https://x.com/bibibuilds">Bibi</a></footer>

                </div>



        </>
    )
}