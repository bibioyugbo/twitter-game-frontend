
interface LoaderProps{
    showLoader?:boolean
}
export default function Loader({...props}:LoaderProps){
    return(
        <>
            {props.showLoader &&
                <div className={"bg-white rounded-[30px]   h-[154px] w-[318px]"}>
                    <div className={"bg-[#E3E3E3] h-[40px] w-full flex gap-2  p-2  justify-end items-center rounded-t-[30px]"}>
                        <div className={"bg-[#EE3333] rounded-[100%]  h-[14px] w-[13px]"}/>
                        <div className={"bg-[#D8D841] rounded-[100%] border-[#F5F507] h-[14px] w-[13px]"}/>
                        <div className={"bg-[#00BB00] rounded-[100%] h-[14px] w-[13px]"}/>
                    </div>
                    <div  style={{ fontFamily: '"Courier New", Courier, monospace' }} className={"px-5 py-3 text-[#11A401] text-base flex text-left mt-6.5 "}>
                        Loading...
                    </div>
                </div>
            }
        </>

    )
}