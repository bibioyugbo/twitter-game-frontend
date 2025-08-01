import DefaultButton from "../../button/DefaultButton.tsx";
import {useNavigate} from "react-router-dom";
import {fetchQuestions} from "@/store/modules/questionSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";

export default function DateOrDisasterLandingPage(){
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    function startQuiz(){
        // fetch("http://localhost:8000/questions")
        //     .then(res=>res.json())
        //     .then(data=>{
        //         console.log(data)
        //         setQuestionList(data)
        //     })
        //     .catch(err => {
        //         console.error("Error fetching questions:", err);
        //     });
            dispatch(fetchQuestions());
        navigate("/dating-questions")
    }

    return(
        <>
            <div className={'no-border h-dvh app-wrapper date-or-disaster p-5 flex items-center flex-col  w-full '}>
                <div className={"flex flex-col flex-1 items-center justify-center"}>
                    <img src={"https://raw.githubusercontent.com/bibioyugbo/my-assets/main/logo.svg"}  alt="Logo"
                         className="h-[295px] md:h-[474px] w-auto"
                    />
                    <p className={"text-white font-[Satoshi-Bold] md:max-w-[412px] text-base text-center"}> Are you a dream partner or just pure
                        stress? Take this quiz to find out!
                    </p>
                    <DefaultButton style={{marginTop:"40px"}} customClass={"w-full max-w-[232px] h-[64px] md:h-[68px] md:max-w-[444px]"} onClick={()=>startQuiz()} text={"Start Quiz"}/>
                </div>
            </div>
        </>
    )
}