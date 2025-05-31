import {configureStore} from "@reduxjs/toolkit";
import {questionsReducer, daterTypeReducer} from './modules/questionSlice.ts';

export const store= configureStore({
    reducer: {
        questions: questionsReducer,
        daterType: daterTypeReducer
        // add more slices here
    },
    }
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;