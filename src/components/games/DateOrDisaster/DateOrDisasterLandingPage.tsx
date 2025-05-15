import DateOrDisasterWrapper from "../../layouts/DateOrDisasterWrapper.tsx";
import dateIcon from "../../../assets/images/title-icon.svg"
import DefaultButton from "../../button/DefaultButton.tsx";
import {useNavigate} from "react-router-dom";

export default function DateOrDisasterLandingPage(){

    const navigate = useNavigate()
    function startQuiz(){
        navigate("/dating-questions")
    }

    return(
        <>
            <DateOrDisasterWrapper>
                    <img src={dateIcon} alt={""}/>
                    <p className={"text-white"}> Are you a dream partner or just pure
                        stress? Take this quiz to find out!
                    </p>
                        <DefaultButton style={{marginTop:"40px"}} onClick={()=>startQuiz()} text={"Start Quiz"}/>
            </DateOrDisasterWrapper>

        </>
    )
}