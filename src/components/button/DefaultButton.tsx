import {ButtonHTMLAttributes} from "react";
import * as React from "react";

interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    text?:string,
    style?:React.CSSProperties,
    customClass?:string
}


export default function DefaultButton({text,style,customClass, ...props}:DefaultButtonProps){
    return(
        <>
            <button style={style}  {...props} className={`${customClass||""} rounded-xl font-[Satoshi-Bold] active:scale-95 transition-transform tap-effect bg-[#00E4A0] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]  cursor-pointer p-5 text-[20px] font-bold text-[#003A58]`}>
                {text}
            </button>
        </>
    )
}