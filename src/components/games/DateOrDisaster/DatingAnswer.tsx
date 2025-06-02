import DateOrDisasterWrapper from "@/components/layouts/DateOrDisasterWrapper.tsx";
import dateIcon from "../../../assets/images/date-disaster-icon.svg"
import importImg from "../../../assets/images/import.svg"
import {useSelector} from "react-redux";
import {dataType, dataTypeLoading} from "@/store/modules/questionSlice.ts";
import Loader from "@/components/loader/Loader.tsx";
import {useEffect} from "react";


export default function DatingAnswer (){

    const daterType = useSelector(dataType)
    const loading = useSelector(dataTypeLoading);
    const downloadResult = async (sectionId:string) => {
        try {
            const section = document.getElementById(sectionId);
            if (!section) {
                console.error(`Element with ID "${sectionId}" not found`);
                return;
            }

            console.log('Found element:', section); // Debug log
            const html2canvas = (await import('html2canvas')).default;


            const canvas = await html2canvas(section, {
                backgroundColor: '#ffffff', // Try with white background instead of null
                scale: 1, // Reduce scale to see if that helps
                useCORS: true,
                allowTaint: true,
                logging: true, //
                ignoreElements: (element) => {
                    // Skip elements with oklch colors
                    const computedStyle = window.getComputedStyle(element);
                    return computedStyle.backgroundColor.includes('oklch') ||
                        computedStyle.color.includes('oklch');
                }
            });

            canvas.toBlob((blob:Blob | null) => {
                if (!blob) {
                    console.error('Failed to create blob');
                    return;
                }
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'section.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            });
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };
    const shareToTwitter = () => {
        const text = `Date or Disaster\nhttps://date-or-disaster.netlify.app/\nI am a ${daterType?.name}! Find out yours!`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    useEffect(() => {
        console.log(daterType)
    }, []);

    return(
        <>
            <DateOrDisasterWrapper>
                {
                    loading? <Loader showLoader={loading}/>:
                    <div className={"flex gap-4 flex-col w-full items-center"}>
                        <div id={"result"} className="bg-[#EBEBEB1A] px-3 py-3 w-full flex gap-4 flex-col items-center  rounded-[40px] border-[2.14px] border-[#DEE4FF2E]  md:w-[508px] ">
                            <img src={dateIcon} className={"my-3"} width={236} height={119} alt={""}/>
                            <div className="bg-white p-5 pb-12 flex flex-col items-center rounded-[32px] md:w-[476px] w-full">
                                <p className={"text-[#A6A5A5] text-base"}>you are a</p>
                                <p className={"text-[#010101] my-3 font-[Recoleta-Bold] text-3xl"}>{daterType?.name}</p>
                                <p className={"text-[#646363] font-medium text-base"}>{daterType?.description}</p>
                            </div>

                        </div>
                        <div className={"flex gap-2 mt-8"}>
                            <button onClick={shareToTwitter} className={"bg-[#0D0735]  cursor-pointer hover:scale-105 transition-transform flex justify-center items-center rounded-[64px] h-[64px] w-[64px]"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 15 15"><path fill="#fff" fill-rule="evenodd" d="M7.233 4.696c0-1.727 1.4-3.127 3.127-3.127c1.014 0 1.823.479 2.365 1.175a5.3 5.3 0 0 0 1.626-.629a2.63 2.63 0 0 1-1.148 1.45l.002.003a5.3 5.3 0 0 0 1.5-.413l-.001.002c-.337.505-.76.95-1.248 1.313q.04.266.04.53c0 3.687-2.809 7.975-7.975 7.975a7.93 7.93 0 0 1-4.296-1.26a.5.5 0 0 1-.108-.748a.45.45 0 0 1 .438-.215c.916.108 1.83-.004 2.637-.356a3.1 3.1 0 0 1-1.69-1.876a.45.45 0 0 1 .103-.448a3.07 3.07 0 0 1-1.045-2.31v-.034a.45.45 0 0 1 .365-.442a3.1 3.1 0 0 1-.344-1.416c0-.468.003-1.058.332-1.59a.45.45 0 0 1 .323-.208a.5.5 0 0 1 .538.161a6.96 6.96 0 0 0 4.46 2.507zm-1.712 7.279a7 7 0 0 1-2.249-.373a5.3 5.3 0 0 0 2.39-1.042a.45.45 0 0 0-.27-.804a2.17 2.17 0 0 1-1.714-.888q.285-.023.556-.096a.45.45 0 0 0-.028-.876a2.18 2.18 0 0 1-1.644-1.474q.301.073.623.084a.45.45 0 0 0 .265-.824a2.18 2.18 0 0 1-.97-1.812q-.001-.25.013-.453a7.95 7.95 0 0 0 5.282 2.376a.5.5 0 0 0 .513-.61a2.127 2.127 0 0 1 2.071-2.614c1.234 0 2.136 1.143 2.136 2.432c0 3.256-2.476 6.974-6.975 6.974" clip-rule="evenodd"/></svg>                            </button>
                            <button onClick={()=>downloadResult('result')} className={"bg-[#0D0735] cursor-pointer hover:scale-105 transition-transform flex justify-center rounded-[64px] h-[64px] w-[64px]"}>
                                <img src={importImg} height={30} width={30} alt={""}/>
                            </button>
                        </div>
                    </div>
                }
            </DateOrDisasterWrapper>
        </>
    )
}