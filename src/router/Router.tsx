import {Route, Routes} from "react-router-dom"
import DateOrDisasterLandingPage from "../components/games/DateOrDisaster/DateOrDisasterLandingPage.tsx";
import DatingQuestions from "@/components/games/DateOrDisaster/DatingQuestions.tsx";
import DatingAnswer from "@/components/games/DateOrDisaster/DatingAnswer.tsx";


export default function GameRoutes(){
    return(
        <>
            <Routes>
                {/*<Route path={"/"} element={<RedFlagLandingPage/>}/>*/}
                <Route path={"/"} element={<DateOrDisasterLandingPage/>}/>
                <Route path={"/dating-questions"} element={<DatingQuestions/>}/>
                <Route path={"/date-or-disaster"} element={<DatingAnswer/>}/>
            </Routes>
        </>
    )
}