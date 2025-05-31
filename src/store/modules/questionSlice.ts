import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store";

export interface Question{
    question: string,
    options:[],
    category:string
}
export interface DaterType {
    name: string,
    description: string,
    criteria: object
}

    export interface DaterTypeRequest{
    q1: string,
    q2: string,
    q3: string,
    q4: string,
    q5: string,
    q6: string,
    q7: string,
    q8: string,
}

interface QuestionsState {
    data: Question[];
    loading: boolean;
    error: string | null;
    // daterType: DaterType,
}
const initialState: QuestionsState = {
    data: [],
    loading: false,
    error: null,
    // daterType: {} as DaterType,

}
// daterTypeSlice.ts
interface DaterTypeState {
    loading: boolean,
    error: string | null,
    daterType: DaterType,
}

const daterTypeInitialState: DaterTypeState = {
    loading: false,
    error: null,
    daterType: {} as DaterType,
};


export const fetchQuestions = createAsyncThunk(
    'questions/fetchQuestions',
    async ()=>{
        // const response = await fetch('https://twitter-game-backend.onrender.com/questions');
        const response = await fetch('http://localhost:8000/questions');
        if(!response.ok){
            throw new Error('Failed to fetch questions');
        }
        return (await response.json()) as Question[];
    }
)
export const getDaterType = createAsyncThunk(
    'daterType/getDaterType',
    async (formData: DaterTypeRequest, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:8000/questions/dater-type', {
                // const response = await fetch('https://twitter-game-backend.onrender.com/questions/dater-type', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to get dater type');
            }
            return await response.json();
        } catch (error: unknown) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown error');        }
    }
);
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


const daterTypeSlice = createSlice({
    name: 'daterType',
    initialState: daterTypeInitialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getDaterType.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDaterType.fulfilled, (state, action) => {
                state.loading = false;
                state.daterType = action.payload;
            })
            .addCase(getDaterType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export const selectQuestions = (state: RootState) => state.questions.data;
export const dataType = (state: RootState) => state.daterType.daterType;
export const selectQuestionsLoading = (state: RootState) => state.questions.loading;
export const selectQuestionsError = (state: RootState) => state.questions.error;
// export const daterTypeReducer = daterTypeSlice.reducer;

export const questionsReducer = questionsSlice.reducer;
export const daterTypeReducer = daterTypeSlice.reducer;