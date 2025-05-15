import DateOrDisasterWrapper from "@/components/layouts/DateOrDisasterWrapper.tsx";
import dateIcon from "../../../assets/images/date-disaster-icon.svg"
import shareImg from "../../../assets/images/share.svg"
import importImg from "../../../assets/images/import.svg"


export default function DatingAnswer (){
    return(
        <>
            <DateOrDisasterWrapper>
                <div className="bg-[#EBEBEB4D]  flex gap-4 flex-col items-center  rounded-[40px] border-2 border-[#DEE4FF2E] h-[482px] w-[508px] ">
                    <img src={dateIcon} className={"my-6"} width={236} height={119} alt={""}/>
                    <div className="bg-white p-3 flex rounded-[32px] justify-center  h-[287px] w-[476px]">
                        <p className={"text-[#A6A5A5] text-base"}>you are a</p>
                        <p className={"text-[#010101] font-bold text-4xl"}></p>
                        <p className={"text-[#646363] text-xl"}></p>

                    </div>

                </div>
                <div className={"flex gap-2 mt-8"}>
                    <a className={"bg-[#0D0735] flex justify-center rounded-[64px] h-[64px] w-[64px]"}>
                        <img src={shareImg} height={30} width={30} alt={""}/>
                    </a>
                    <a className={"bg-[#0D0735] flex justify-center rounded-[64px] h-[64px] w-[64px]"}>
                        <img src={importImg} height={30} width={30} alt={""}/>
                    </a>

                </div>

            </DateOrDisasterWrapper>
        </>
    )
}