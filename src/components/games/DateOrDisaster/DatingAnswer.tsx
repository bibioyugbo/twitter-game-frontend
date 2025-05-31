import DateOrDisasterWrapper from "@/components/layouts/DateOrDisasterWrapper.tsx";
import dateIcon from "../../../assets/images/date-disaster-icon.svg"
import shareImg from "../../../assets/images/share.svg"
import importImg from "../../../assets/images/import.svg"
import {useSelector} from "react-redux";
import {dataType, dataTypeLoading} from "@/store/modules/questionSlice.ts";
import Loader from "@/components/loader/Loader.tsx";
import {useEffect} from "react";


export default function DatingAnswer (){

    const daterType = useSelector(dataType)
    const loading = useSelector(dataTypeLoading);
    useEffect(() => {
        console.log(daterType)
    }, []);

    return(
        <>
            <DateOrDisasterWrapper>
                {
                    loading? <Loader showLoader={loading}/>:
                    <div className={"flex gap-4 flex-col items-center"}>
                        <div className="bg-[#EBEBEB1A]  flex gap-4 flex-col items-center  rounded-[40px] border-[2.14px] border-[#DEE4FF2E] h-[482px]  md:w-[508px] w-[350px] ">
                            <img src={dateIcon} className={"my-6"} width={236} height={119} alt={""}/>
                            <div className="bg-white p-5 flex flex-col items-center rounded-[32px]  h-[287px] md:w-[476px] w-[326px]">
                                <p className={"text-[#A6A5A5] text-base"}>you are a</p>
                                <p className={"text-[#010101] my-3 font-[Recoleta-Bold] font-bold text-4xl"}>{daterType?.name}</p>
                                <p className={"text-[#646363] mt-1 text-xl"}>{daterType?.description}</p>
                            </div>

                        </div>
                        <div className={"flex gap-2 mt-8"}>
                            <a className={"bg-[#0D0735] cursor-pointer hover:scale-105 transition-transform flex justify-center rounded-[64px] h-[64px] w-[64px]"}>
                                <img src={shareImg} height={30} width={30} alt={""}/>
                            </a>
                            <a className={"bg-[#0D0735] cursor-pointer hover:scale-105 transition-transform flex justify-center rounded-[64px] h-[64px] w-[64px]"}>
                                <img src={importImg} height={30} width={30} alt={""}/>
                            </a>
                        </div>
                    </div>
                }
            </DateOrDisasterWrapper>
        </>
    )
}