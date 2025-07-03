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
            <div style={props.style} className={'no-border min-h-screen app-wrapper date-or-disaster p-5 flex items-center flex-col  w-full '}>
                <div className={"no-border flex-1 flex items-center "}>
                    <div className={'no-border'}>
                        {props.children}
                    </div>
                </div>

            </div>

        </>
    )
}