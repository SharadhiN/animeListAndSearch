import { configureStore } from '@reduxjs/toolkit';
import animeReducer from "../reducers/anime";

export const store = configureStore({
    reducer: {
        anime: animeReducer
    }
});