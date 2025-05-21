import DateOrDisasterWrapper from "../../layouts/DateOrDisasterWrapper.tsx";
import DefaultButton from "../../button/DefaultButton.tsx";
import { Progress } from "@/components/ui/progress"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Loader from "@/components/loader/Loader.tsx";
import {useSelector} from "react-redux";
import {Question, selectQuestions} from "@/store/modules/questionSlice.ts";


export default function DatingQuestions(){

    const [progress, setProgress] = useState(12.5)
    const [loader, setLoader] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
    const questionsPerPage = 1;
    const [questionCount, setQuestionCount] = useState(1)
    const navigate = useNavigate()
    const questions = useSelector(selectQuestions);
    const [selectedOptions, setSelectedOptions] = useState<{ [questionIndex: number]: number | null }>({});
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const questionsToMap = questions
    const currentQuestions = questionsToMap.slice(startIndex, endIndex);
    const currentQuestions2 = questionsToMap.slice(currentPage, currentPage+1);


    function goToNextQuestion(){
        console.log(questionCount)
        if (questionCount < 8){
            setSelectedOptions({})
            setQuestionCount(questionCount + 1)
            setCurrentPage(prev => prev + 1)
            setProgress(progress + 12.5)
        }
        else
        navigate("/date-or-disaster")
    }
    function optionClicked(questionIndex: number, optionIndex: number){
        const clickSound = new Audio ('/select-sound-121244.mp3')
        clickSound.play()
        setSelectedOptions((prev=>({
            ...prev,
               [questionIndex]:optionIndex
        })))
        // setSelectedOptions({[questionIndex]:optionIndex})
        console.log("Question Index",questionIndex)
        console.log("Option Index",optionIndex)
        console.log("Selected options",selectedOptions)
    }

    useEffect(() => {
        console.log("Selected options updated", selectedOptions);
    }, [selectedOptions]);


    return(
        <>
            <DateOrDisasterWrapper>
                <div className=" h-full items-center justify-center flex flex-col gap-4">
                    <div className="text-white font-[Satoshi-Bold] text-xl">
                        {"0" + questionCount} of 8
                    </div>
                    <Progress value={progress} className="h-[21px]"/>
                    <div className="bg-[#EBEBEB4D] md:h-[540px] md:w-full md:max-w-[508px] px-4 py-4 flex items-center justify-center rounded-[40px] border-2 border-[#DEE4FF2E]   ">
                        <div className="bg-white px-5 py-10 md:max-w-[476px] md:h-[508px] rounded-[32px]">
                            {currentQuestions2?.map((item:Question,questionIndex)=>{
                                console.log(currentQuestions2)
                                return(
                                    <div key={questionIndex}>
                                        <div className={"text-[#003A58] font-[Satoshi-Bold] text-xl my-4"}>
                                            {item.question}
                                        </div>
                                        <div className={"text-[#646363] font-[Satoshi-Bold] cursor-pointer mt-9 flex flex-col gap-2 text-[16px] "}>
                                            {item.options.map((item, optionIndex)=>{
                                                const isSelected =  selectedOptions[questionIndex] === optionIndex;
                                                // console.log(optionIndex)
                                                console.log(selectedOptions[questionIndex])
                                                return(
                                                    <a key={optionIndex} onClick={()=>optionClicked(questionIndex, optionIndex)} className={`${isSelected?"border-[#11A401] flex text-[#11A401]":"border-[#F1F1F1]"} flex gap-1 rounded-[12px] p-5 border-2`}>
                                                        <div>{String.fromCharCode(97 + optionIndex)}</div>
                                                        <span>-</span>
                                                        {item}
                                                    </a>
                                                )
                                            })}
                                        </div>
                                    </div>
                                     )
                            })}
                        </div>
                    </div>
                      <DefaultButton customClass={"w-full max-w-[232px]  md:max-w-[444px]"}  style={{marginTop:"36px"}} onClick={()=>goToNextQuestion()} text={questionCount===8?"What Dater are you?":"Continue"} />

                        {/*<Loader showLoader={true}/>*/}
                </div>
            </DateOrDisasterWrapper>

        </>
    )
}