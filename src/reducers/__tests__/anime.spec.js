import { configureStore } from '@reduxjs/toolkit';
import { animeSlice } from '../anime';
import * as AnimeAPI from '../../api/animeList';
import * as AnimeThunks from '../../thunks/animeList';

describe("AnimeReducer", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    // * getAllAnimes
    it('should post data fulfilled', async () => {
        jest.spyOn(AnimeAPI, "getAllAnimes").mockResolvedValueOnce({ sample: "info" });

        const store = configureStore({ reducer: animeSlice.reducer });
        await store.dispatch(AnimeThunks.getAllAnimes({ argUrl: null }));
        expect(store.getState()).toEqual({
            loading: false,
            error: undefined,
            data: { sample: "info" }
        });
    });

    it('should catch error when rejected', async () => {
        jest.spyOn(AnimeAPI, "getAllAnimes").mockRejectedValueOnce({ message: "No Animes fetched." });

        const store = configureStore({ reducer: animeSlice.reducer });
        setTimeout(async () => {
            await store.dispatch(AnimeThunks.getAllAnimes({ argUrl: "https://api.jikan.moe/v4/anime?page=3" }));
            expect(AnimeAPI.getAllAnimes).toHaveBeenCalledWith("https://api.jikan.moe/v4/anime?page=3");
            expect(store.getState()).toEqual({
                loading: false,
                error: "No Animes fetched.",
                data: {}
            });
        }, 1000);
    });

    // * getAnimesByTitle
    it('should post data fulfilled', async () => {
        jest.spyOn(AnimeAPI, "getAnimeByTitle").mockResolvedValueOnce({ sample: "info" });

        const store = configureStore({ reducer: animeSlice.reducer });
        await store.dispatch(AnimeThunks.getAnimeByTitle({ argUrl: null }));
        expect(store.getState()).toEqual({
            loading: false,
            error: undefined,
            data: { sample: "info" }
        });
    });

    it('should catch error when rejected', async () => {
        jest.spyOn(AnimeAPI, "getAnimeByTitle").mockRejectedValueOnce({ message: "No Animes fetched." });

        const store = configureStore({ reducer: animeSlice.reducer });
        setTimeout(async () => {
            await store.dispatch(AnimeThunks.getAnimeByTitle({ title: "bleach" }));
            expect(AnimeAPI.getAnimeByTitle).toHaveBeenCalledWith("bleach");
            expect(store.getState()).toEqual({
                loading: false,
                error: "No Animes fetched.",
                data: {}
            });
        }, 1000);
    });

    // * getAnimeByStartDate
    it('should post data fulfilled', async () => {
        jest.spyOn(AnimeAPI, "getAnimeByStartDate").mockResolvedValueOnce({ sample: "info" });

        const store = configureStore({ reducer: animeSlice.reducer });
        await store.dispatch(AnimeThunks.getAnimeByStartDate({ argUrl: null }));
        expect(store.getState()).toEqual({
            loading: false,
            error: undefined,
            data: { sample: "info" }
        });
    });

    it('should catch error when rejected', async () => {
        jest.spyOn(AnimeAPI, "getAnimeByStartDate").mockRejectedValueOnce({ message: "No Animes fetched." });

        const store = configureStore({ reducer: animeSlice.reducer });
        setTimeout(async () => {
            await store.dispatch(AnimeThunks.getAnimeByStartDate({ title: "2018-01-01" }));
            expect(AnimeAPI.getAnimeByStartDate).toHaveBeenCalledWith("2018-01-01");
            expect(store.getState()).toEqual({
                loading: false,
                error: "No Animes fetched.",
                data: {}
            });
        }, 1000);
    });


    // * getAnimeByEndDate
    it('should post data fulfilled', async () => {
        jest.spyOn(AnimeAPI, "getAnimeByEndDate").mockResolvedValueOnce({ sample: "info" });

        const store = configureStore({ reducer: animeSlice.reducer });
        await store.dispatch(AnimeThunks.getAnimeByEndDate({ argUrl: null }));
        expect(store.getState()).toEqual({
            loading: false,
            error: undefined,
            data: { sample: "info" }
        });
    });

    it('should catch error when rejected', async () => {
        jest.spyOn(AnimeAPI, "getAnimeByEndDate").mockRejectedValueOnce({ message: "No Animes fetched." });

        const store = configureStore({ reducer: animeSlice.reducer });
        setTimeout(async () => {
            await store.dispatch(AnimeThunks.getAnimeByEndDate({ title: "2018-01-01" }));
            expect(AnimeAPI.getAnimeByEndDate).toHaveBeenCalledWith("2018-01-01");
            expect(store.getState()).toEqual({
                loading: false,
                error: "No Animes fetched.",
                data: {}
            });
        }, 1000);
    });
});
