import { createAsyncThunk } from "@reduxjs/toolkit";
import * as animeAPI from "../api/animeList";

export const getAllAnimes = createAsyncThunk(
    'anime/getAllAnimes',
    async () => {
        console.log('Dispatched THunk.');
        try {
            return await animeAPI.getAllAnimes();
        } catch (e) {
            // alert("Check console.");
            console.log("Error with getAllAnimes Thunk!");
            console.log(e);
            return e;
        }
    }
);

export const getNextPage = createAsyncThunk(
    'anime/getNextPage',
    async ({ nextPageUrl }) => {
        console.log('Dispatched next page thunk');
        try {
            return await animeAPI.getNextPage(nextPageUrl);
        } catch (e) {
            // alert("Check console.");
            console.log("Error with getNextPage Thunk!");
            console.log(e);
            return e;
        }
    }
);

export const getAnimeByTitle = createAsyncThunk(
    'anime/getAnimeByTitle',
    async ({ title }) => {
        try {
            console.log(`Title Search: ${title}`);
            return await animeAPI.getAnimeByTitle(title);
        } catch (e) {
            // alert("Check console.");
            console.log("Error with getAnimeByTitle Thunk!");
            console.log(e);
            return e;
        }
    }
);


export const getAnimeByStartDate = createAsyncThunk(
    'anime/getAnimeByStartDate',
    async ({ startDate }) => {
        try {
            console.log('Start Date Filter: ', startDate);
            return await animeAPI.getAnimeByStartDate(startDate);
        } catch (e) {
            // alert("Check console.");
            console.log("Error with getAnimeByStartDate Thunk!");
            console.log(e);
            return e;
        }
    }
);

export const getAnimeByEndDate = createAsyncThunk(
    'anime/getAnimeByEndDate',
    async ({ endDate }) => {
        try {
            console.log('End Date Filter: ', endDate);
            return await animeAPI.getAnimeByEndDate(endDate);
        } catch (e) {
            // alert("Check console.");
            console.log("Error with getAnimeByEndDate Thunk!");
            console.log(e);
            return e;
        }
    }
);
