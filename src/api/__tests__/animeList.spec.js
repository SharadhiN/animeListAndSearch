import fetchMock from 'jest-fetch-mock';
import * as AnimeAPI from '../animeList';
import { getAllAnimesMockedResponse } from "../sample_input";

fetchMock.enableMocks();

describe("GetAllAnimesAPI", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it("returns list of all Animes from Jikan API", async () => {
        fetch.mockResponseOnce(JSON.stringify(getAllAnimesMockedResponse));
        const apiResponse = await AnimeAPI.getAllAnimes();
        expect(await apiResponse).toEqual(getAllAnimesMockedResponse);
    })

    // it("returns an error if invalid data", async () => {
    //     let result = null;
    //     try {
    //         await 
    //     } catch(e) {

    //     }
    // })
});