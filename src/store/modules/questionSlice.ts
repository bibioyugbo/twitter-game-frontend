import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store";

export interface Question{
    question: string,
    options:[],
    category:string
}

interface QuestionsState {
    data: Question[];
    loading: boolean;
    error: string | null;
}
const initialState: QuestionsState = {
    data: [],
    loading: false,
    error: null,
}

export const fetchQuestions = createAsyncThunk(
    'questions/fetchQuestions',
    async ()=>{
        const response = await fetch('http://localhost:8000/questions');
        if(!response.ok){
            throw new Error('Failed to fetch questions');
        }
        return (await response.json()) as Question[];

    }
)
const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchQuestions.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export const selectQuestions = (state: RootState) => state.questions.data;
export const selectQuestionsLoading = (state: RootState) => state.questions.loading;
export const selectQuestionsError = (state: RootState) => state.questions.error;

export default questionsSlice.reducer;