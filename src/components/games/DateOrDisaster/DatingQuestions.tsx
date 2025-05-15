import DateOrDisasterWrapper from "../../layouts/DateOrDisasterWrapper.tsx";
import DefaultButton from "../../button/DefaultButton.tsx";
import { Progress } from "@/components/ui/progress"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Loader from "@/components/loader/Loader.tsx";


export default function DatingQuestions(){

    const [progress, setProgress] = useState(12.5)
    const [loader, setLoader] = useState(false)
    const [questionCount, setQuestionCount] = useState(1)
    const navigate = useNavigate()

    function goToNextQuestion(){
        console.log(questionCount)
        if (questionCount < 8){
            setQuestionCount(questionCount + 1)
            setProgress(progress + 12.5)
        }
        navigate("/date-or-disaster")
    }


    return(
        <>
            <DateOrDisasterWrapper>
                <div className="w-full max-w-[508px] items-center flex flex-col gap-4">
                    <div className="text-white font-bold text-xl">
                        {"0" + questionCount} of 8
                    </div>
                    <Progress value={progress} className="h-[21px]" />
                    <div className="bg-[#EBEBEB4D]  flex items-center justify-center rounded-[40px] border-2 border-[#DEE4FF2E] h-[540px] w-[508px] ">
                        <div className="bg-white p-5 rounded-[32px] h-[508px] w-[476px]">
                            <div className={"text-[#003A58] text-xl my-4 font-bold"}>
                                hey
                            </div>
                            <div className={"  text-[#646363] text-xl "}>
                                <p className={"border-[#F1F1F1] flex gap-1 w-full rounded-[12px] p-5 border-2"}>
                                    <p>a</p> -
                                    hello
                                </p>
                            </div>
                        </div>
                    </div>
                    <DefaultButton onClick={()=>goToNextQuestion()} text={questionCount===8?"What Dater are you?":"Continue"} />
                    <Loader/>
                </div>
            </DateOrDisasterWrapper>

        </>
    )
}