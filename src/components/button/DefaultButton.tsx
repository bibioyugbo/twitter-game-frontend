import {ButtonHTMLAttributes} from "react";
import * as React from "react";

interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    text?:string,
    style?:React.CSSProperties,
    customClass?:string
    shake?:boolean
}


export default function DefaultButton({text,style,customClass, shake, ...props}:DefaultButtonProps){
    return(
        <>
            <button style={style}  {...props} className={`${customClass||""}  bottom-fixed rounded-[12px] font-[Satoshi-Bold] ${shake? "shake duration-300" : "active:scale-95"} transition-transform bg-[#00E4A0] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]  cursor-pointer  text-[18px] md:text-[20px] font-bold text-[#003A58]`}>
                {text}
            </button>
        </>
    )
}