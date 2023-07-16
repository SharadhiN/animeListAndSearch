import { createAction, createSlice } from "@reduxjs/toolkit";
import { getAllAnimes, getNextPage, getAnimeByTitle, getAnimeByStartDate, getAnimeByEndDate } from "../thunks/animeList";

// define the initial state with loading, error and data
const initialState = {
    loading: false,
    error: undefined,
    data: {}
}

const getAll = createAction('getAllAnimes');
function isRejectedAction(action) {
    return action.type.endsWith('rejected')
}


// use create slice w/
// ! reducers: actions are created for each case reducer
// ! extra reducers: reducers for external actions 
export const animeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {
        setError: (state, action) => {
            const { payload } = action;
            state.error = payload;
        }
    },
    extraReducers: {
        [getAllAnimes.pending]: (state) => {
            state.error = undefined;
            state.loading = true;
        },
        [getAllAnimes.fulfilled]: (state, { payload }) => {
            console.log('All ANimes fulfilled');
            console.log(payload);
            state.loading = false;
            state.data = payload;
            return state;
        },
        [getAllAnimes.rejected]: (state, { payload }) => {
            if ( !payload ) {
                state.error = 'Request rejected';
            }
            else {
                const { message } = payload;
                state.error = message;
            }
            state.loading = false;
        },
        [getNextPage.pending]: (state) => {
            state.error = undefined;
            state.loading = true;
        },
        [getNextPage.fulfilled]: (state, { payload }) => {
            console.log('Got Next Page!');
            state.loading = false;
            state.data = payload;
            return state;
        },
        [getNextPage.rejected]: (state, { payload }) => {
            if ( !payload ) {
                state.error = 'Request rejected';
            }
            else {
                const { message } = payload;
                state.error = message;
            }
            state.loading = false;
        },
        [getAnimeByTitle.pending]: (state) => {
            state.error = undefined;
            state.loading = true;
            return state;
        },
        [getAnimeByTitle.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state = payload;
            return state;
        },
        [getAnimeByTitle.rejected]: (state, { payload }) => {
            if ( !payload ) {
                state.error = 'Request rejected';
            }
            else {
                const { message } = payload;
                state.error = message;
            }
            state.loading = false;
            return state;
        },
        [getAnimeByStartDate.pending]: (state) => {
            state.error = undefined;
            state.loading = true;
            return state;
        },
        [getAnimeByStartDate.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            return state;
        },
        [getAnimeByStartDate.rejected]: (state, { payload }) => {
            if ( !payload ) {
                state.error = 'Request rejected';
            }
            else {
                const { message } = payload;
                state.error = message;
            }
            state.loading = false;
            return state;
        },
        [getAnimeByEndDate.pending]: (state) => {
            state.error = undefined;
            state.loading = true;
            return state;
        },
        [getAnimeByEndDate.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            return state;
        },
        [getAnimeByEndDate.rejected]: (state, { payload }) => {
            if ( !payload ) {
                state.error = 'Request rejected';
            }
            else {
                const { message } = payload;
                state.error = message;
            }
            state.loading = false;
            return state;
        },

    }
});

export const { setError } = animeSlice.actions;
export default animeSlice.reducer;