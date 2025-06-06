import {ReactNode} from "react";
import * as React from "react";

interface DateOrDisasterWrapperProps{
    children?: ReactNode,
    style?:  React.CSSProperties
}

export default function DateOrDisasterWrapper({...props}:DateOrDisasterWrapperProps){

    return(
        <>
            {/*<div className={"bg-gradient-to-br h-screen from-yellow-200 via-yellow-400 to-yellow-600"}>*/}
            {/*    {children}*/}
            {/*</div>*/}
            <div style={props.style} className={'date-or-disaster p-5 flex items-center flex-col justify-center w-full h-dvh'}>
                {props.children}
            </div>
        </>
    )
}