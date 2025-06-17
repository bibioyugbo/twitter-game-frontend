import DateOrDisasterWrapper from "../../layouts/DateOrDisasterWrapper.tsx";
import DefaultButton from "../../button/DefaultButton.tsx";
import { Progress } from "@/components/ui/progress"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Loader from "@/components/loader/Loader.tsx";
import {useDispatch, useSelector} from "react-redux";
import {
    DaterTypeRequest,
    getDaterType,
    Question,
    selectQuestions,
    selectQuestionsLoading
} from "@/store/modules/questionSlice.ts";
import {AppDispatch} from "@/store";


export default function DatingQuestions(){

    const [progress, setProgress] = useState(12.5)
    const [isNotSelected, setIsNotSelected] = useState(false)
    const loading = useSelector(selectQuestionsLoading);
    // const loading = true;
    const [questionCount, setQuestionCount] = useState(1)
    const navigate = useNavigate()
    const questions = useSelector(selectQuestions);
    const [selectedOptions, setSelectedOptions] = useState<{ [questionIndex: number]: number | null }>({});
    const questionsToMap = questions
    const dispatch = useDispatch<AppDispatch>();

    function updateProgress(){
        setProgress(progress + 11.11)
    }
    const [currentPage, setCurrentPage] = useState(0);
    const currentQuestions2 = questionsToMap.slice(currentPage, currentPage+1);

    function getCharacter() {
        const body: DaterTypeRequest = {
            q1: getLetter(selectedOptions[0]),
            q2: getLetter(selectedOptions[1]),
            q3: getLetter(selectedOptions[2]),
            q4: getLetter(selectedOptions[3]),
            q5: getLetter(selectedOptions[4]),
            q6: getLetter(selectedOptions[5]),
            q7: getLetter(selectedOptions[6]),
            q8: getLetter(selectedOptions[7]),
        };
        console.log("User answers:", body);
        dispatch(getDaterType(body));
        navigate("/date-or-disaster")
    }
    function goToNextQuestion(){
        console.log("Your selected object before:",selectedOptions)
        // if(Object.keys(selectedOptions).length===0){
        //     setIsNotSelected((prevState)=>!prevState)
        //     return;
        // }
        if (selectedOptions[currentPage]===undefined) {
            setIsNotSelected(prev => !prev);
            return;
        }
        else if (questionCount < 8){
            console.log("Bibi was here")
            setQuestionCount(questionCount + 1)
            setCurrentPage(prev => prev + 1)
            updateProgress()
        }
        else {
            console.log("Your selected object:",selectedOptions)
            getCharacter()
        }

    }
    function getLetter(index: number | null | undefined): string {
        return index !== undefined && index !== null
            ? String.fromCharCode(65 + index) // 0 => "A", 1 => "B", etc.
            : "";
    }


    function optionClicked(currentPage: number, optionIndex: number){
        const clickSound = new Audio ('/select-sound-121244.mp3')
        clickSound.play()
        setSelectedOptions((prev=>({
            ...prev,
               [currentPage]:optionIndex
        })))
        console.log("Selected options",selectedOptions)
        // console.log("Question Index",questionIndex)
        console.log("Option Index",optionIndex)
    }




    return(
        <>
            <DateOrDisasterWrapper>
                {loading?
                    <Loader showLoader={loading}/>:
                    <div className="h-dvh overflow-scroll items-center justify-center flex flex-col gap-4">
                        <div className="text-white font-[Satoshi-Bold] text-base md:text-xl">
                            {"0" + questionCount} of 08
                        </div>
                        <Progress style={{marginTop:"5px", marginBottom:"5px"}} value={progress} className="h-[21px]"/>
                        <div className="bg-[#EBEBEB4D] w-full md:w-full md:max-w-[508px] px-2 py-2 flex items-center justify-center rounded-[40px] border-2 border-[#DEE4FF2E]   ">
                            <div className="bg-white px-5 py-5 md:max-w-[476px]  rounded-[32px]">
                                {currentQuestions2?.map((item:Question,questionIndex)=>{
                                    console.log(currentQuestions2)
                                    return(
                                        <div key={questionIndex}>
                                            <div className={"text-[#003A58] font-[Satoshi-Bold] text-base md:text-xl mt-4"}>
                                                {item.question}
                                            </div>
                                            <div className={"text-[#646363] font-[Satoshi-Bold] cursor-pointer mt-9 flex flex-col gap-2 text-sm md:text-base "}>
                                                {item.options.map((item, optionIndex)=>{
                                                    const isSelected =  selectedOptions[currentPage] === optionIndex;
                                                    // console.log(optionIndex)
                                                    // console.log("Selected options is:",selectedOptions[currentPage])
                                                    return(
                                                        <a key={optionIndex} onClick={()=>optionClicked(currentPage, optionIndex)} className={`${isSelected?"border-[#11A401] flex text-[#11A401]":"border-[#F1F1F1]"} flex gap-1 rounded-[12px] p-5 border-2`}>
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
                        <DefaultButton shake={isNotSelected} customClass={`w-full max-w-[232px] md:max-w-[444px] bottom-[calc(20px+env(safe-area-inset-bottom))]`}  style={{ marginBottom:"10px" ,height:"55px", padding:0}} onClick={()=>goToNextQuestion()} text={questionCount===8?"What Dater are you?":"Continue"} />
                    </div>
                }
            </DateOrDisasterWrapper>

        </>
    )
}