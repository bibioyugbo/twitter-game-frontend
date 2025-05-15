import {ReactNode} from "react";

interface RedFlagWrapperProps{
    children: ReactNode
}


export default function RedFlagWrapper({children}:RedFlagWrapperProps){
  return(
      <>
          <div className={"bg-black h-screen w-full"}>
              {children}
          </div>
      </>
  )
}