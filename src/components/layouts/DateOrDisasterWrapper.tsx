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
            <div style={props.style} className={'no-border date-or-disaster p-5 flex items-center flex-col justify-center w-full h-dvh'}>
                <div className={"no-border flex-1 flex items-center justify-center"}>
                    <div className={'no-border'}>
                        {props.children}
                    </div>
                </div>

                <footer  className={"no-border footer-text flex-nowrap text-white"}>Made with ❤️ by <span className={"no-border underline"}>Adaeze</span> and <span className={" no-border underline"}>Bibi</span></footer>
            </div>

        </>
    )
}