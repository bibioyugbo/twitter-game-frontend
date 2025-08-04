import DateOrDisasterWrapper from "../../layouts/DateOrDisasterWrapper.tsx";
import DefaultButton from "../../button/DefaultButton.tsx";
import { Progress } from "@/components/ui/progress"
import { useState} from "react";
import {useNavigate} from "react-router-dom";
import Loader from "@/components/loader/Loader.tsx";
import {useDispatch, useSelector} from "react-redux";
import {
    DaterTypeRequest,
    getDaterType,
    selectQuestions,
    selectQuestionsLoading
} from "@/store/modules/questionSlice.ts";
import {AppDispatch} from "@/store";

export default function DatingQuestions(){
    const [progress, setProgress] = useState(12.5)
    const [isNotSelected, setIsNotSelected] = useState(false)
    const loading = useSelector(selectQuestionsLoading);
    const [questionCount, setQuestionCount] = useState(1)
    const navigate = useNavigate()
    const questions = useSelector(selectQuestions);
    const [selectedOptions, setSelectedOptions] = useState<{ [questionIndex: number]: number | null }>({});
    const dispatch = useDispatch<AppDispatch>();
    const [isLoadingResults, setIsLoadingResults] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const currentQuestion = questions[currentPage];
    const clickSound = new Audio('/select-sound-121244.mp3');
    clickSound.preload = 'auto';

    function updateProgress(){
        setProgress(progress + 11.11)
    }

    // Preload assets for faster rendering
    const preloadAssets = async () => {
        try {
            // Preload fonts
            await document.fonts.load('bold 1rem "Recoleta-Bold"');
            await document.fonts.ready;

            // Preload the main image that will be used in results
            const dateIcon = new Image();
            await new Promise<void>((resolve) => {
                dateIcon.onload = () => resolve();
                dateIcon.onerror = () => resolve(); // Continue even if image fails
                dateIcon.src = "../../../assets/images/date-disaster-icon.svg"; // Adjust path as needed
            });

            console.log("✅ Assets preloaded successfully");
        } catch (error) {
            console.warn("Asset preloading failed:", error);
        }
    };

    async function getCharacter() {
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

        try {
            // Dispatch and wait for the results
            const resultAction = await dispatch(getDaterType(body));

            // Check if the request was successful
            if (getDaterType.fulfilled.match(resultAction)) {
                const daterTypeResult = resultAction.payload;

                // Preload assets for the results page
                await preloadAssets();

                // Small delay to ensure everything is ready
                await new Promise(resolve => setTimeout(resolve, 200));

                // Navigate with the results data
                navigate("/date-or-disaster", {
                    state: {
                        daterType: daterTypeResult,
                        preloaded: true // Flag to indicate assets are preloaded
                    }
                });
            } else {
                // Handle error
                console.error("Failed to get character type");
                setIsLoadingResults(false);
            }
        } catch (error) {
            console.error("Error getting character:", error);
            setIsLoadingResults(false);
        }
    }

    function goToNextQuestion(){
        console.log("Your selected object before:",selectedOptions)

        if (selectedOptions[currentPage] === undefined) {
            setIsNotSelected(prev => !prev);
            return;
        }
        else if (questionCount < 8){
            setQuestionCount(questionCount + 1)
            setCurrentPage(prev => prev + 1)
            updateProgress()
        }
        else {
            console.log("Your selected object:",selectedOptions)

            // CRITICAL: Set loading state first, then let React render it
            setIsLoadingResults(true);

            // Use setTimeout to let the loading state render first
            setTimeout(() => {
                getCharacter();
            }, 50); // Small delay to ensure loader shows immediately
        }
    }

    function getLetter(index: number | null | undefined): string {
        return index !== undefined && index !== null
            ? String.fromCharCode(65 + index) // 0 => "A", 1 => "B", etc.
            : "";
    }

    function optionClicked(currentPage: number, optionIndex: number){
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log('Audio play failed:', e));
        setSelectedOptions((prev=>({
            ...prev,
            [currentPage]:optionIndex
        })))
        console.log("Selected options",selectedOptions)
        console.log("Option Index",optionIndex)
    }

    return(
        <>
            <DateOrDisasterWrapper>
                {loading || isLoadingResults?
                    <Loader showLoader={true}/>:
                    <div className=" overflow-scroll items-center justify-center flex flex-col ">
                        <div className="text-white font-[Satoshi-Bold] text-base md:text-xl">
                            {"0" + questionCount} of 08
                        </div>
                        <Progress value={progress} className="h-[21px] mb-[40px] mt-[26px] md:mt-[30px] md:mb-[46px]"/>
                        <div className="bg-[#EBEBEB4D] w-full md:w-full md:max-w-[508px] px-3 py-3 flex  items-center justify-center rounded-[26px] md:rounded-[40px] border-2 border-[#DEE4FF2E]   ">
                            <div className="bg-white px-5 py-[38px] md:pb-[50px] md:max-w-[476px]  rounded-[18px] md:rounded-[32px]">
                                {currentQuestion && (
                                    <div>
                                        <div className={"text-[#003A58] font-[Satoshi-Bold] text-base md:text-xl"}>
                                            {currentQuestion.question}
                                        </div>
                                        <div className={"text-[#646363] font-[Satoshi-Bold] cursor-pointer mt-9 flex flex-col gap-2 text-sm md:text-base "}>
                                            {currentQuestion.options.map((item, optionIndex)=>{
                                                const isSelected =  selectedOptions[currentPage] === optionIndex;
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
                                )}
                            </div>
                        </div>
                        <DefaultButton
                            shake={isNotSelected}
                            customClass={`w-full h-[56px] md:h-[68px] max-w-[232px] md:mt-4 md:max-w-[444px] bottom-[calc(20px+env(safe-area-inset-bottom))]`}
                            style={{marginTop:"36px", marginBottom:'8px'}}
                            onClick={()=>goToNextQuestion()}
                            text={questionCount===8?"Get Result":"Continue"}
                        />
                    </div>
                }
            </DateOrDisasterWrapper>
        </>
    )
}