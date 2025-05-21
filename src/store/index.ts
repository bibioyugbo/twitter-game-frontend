import {configureStore} from "@reduxjs/toolkit";
import questionsReducer from './modules/questionSlice.ts';

export const store= configureStore({
    reducer: {
        questions: questionsReducer,
        // add more slices here
    },
    }
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;