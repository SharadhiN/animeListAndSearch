import fetchMock from 'jest-fetch-mock';
import * as AnimeAPI from '../animeList';
import {
    getAllAnimesMockedResponse,
    invalidLimitMockedResponse,
    titleSearchMockedResponse,
    startDateSearchMockedResponse,
    endDateSearchMockedResponse,
    incorrectEndDateMockedResponse,
    incorrectStartDateMockedResponse
} from "../sample_input";

fetchMock.enableMocks();

describe("AnimesAPI", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    // ! RUN ONLY 2 TEST CASES AT A TIME SO AS TO NOT OVERLOAD THE API AND BLOCK ACCESS.
    // ! OR INTRODUCE A TIME DELAY FOR EACH REQUEST

    it("returns list of all Animes from Jikan API", async () => {
        fetch.mockResponseOnce(JSON.stringify(getAllAnimesMockedResponse));
        setTimeout(async () => {
            const apiResponse = await AnimeAPI.getAllAnimes();
            //! update sample input if this test fails.
            expect(await apiResponse).toEqual(getAllAnimesMockedResponse);
        }, 1000);
    })

    it("returns an error if invalid params are given", async () => {
        let result = null;
        try {
            // limit value 50 is higher than the configured max
            const apiResponse = await AnimeAPI.getAllAnimes('https://api.jikan.moe/v4/anime?limit=50');
            result = apiResponse;
        } catch(e) {
            result = e;
        }
        expect(await result).toEqual(invalidLimitMockedResponse);
    })

    it("returns search results for the title 'bleach'", async () => {
        fetch.mockResponseOnce(JSON.stringify(titleSearchMockedResponse));
        setTimeout(async () => {
            const apiResponse = await AnimeAPI.getAnimeByTitle('bleach');
            //! update sample input if this test fails.
            expect(await apiResponse.data.length).toEqual(titleSearchMockedResponse.data.length);
        }, 1000);
    });


    it("returns search results filtered for the start date '2018-01-01'", async () => {
        fetch.mockResponseOnce(JSON.stringify(startDateSearchMockedResponse));
        setTimeout(async () => {
            const apiResponse = await AnimeAPI.getAnimeByStartDate('2018-01-01');
            //! update sample input if this test fails.
            expect(await apiResponse).toEqual(startDateSearchMockedResponse);
        }, 1000);
    });


    it("returns search results filtered for the end date '2018-01-01'", async () => {
        fetch.mockResponseOnce(JSON.stringify(endDateSearchMockedResponse));
        setTimeout(async () => {
            const apiResponse = await AnimeAPI.getAnimeByEndDate('2018-01-01');
            //! update sample input if this test fails.
            expect(await apiResponse).toEqual(endDateSearchMockedResponse);
        }, 1000);
    });

    it("returns an error if invalid ( end ) date is provided", async () => {
        let result = null;
        try {
            // date format should be yyyy-mm-dd
            const apiResponse = await AnimeAPI.getAnimeByEndDate('2018-21-01');
            result = apiResponse;
        } catch(e) {
            result = e;
        }
        expect(await result).toEqual(incorrectEndDateMockedResponse);
    })


    it("returns an error if invalid ( start ) date is provided", async () => {
        let result = null;
        try {
            // date format should be yyyy-mm-dd
            const apiResponse = await AnimeAPI.getAnimeByStartDate('2018-21-01');
            result = apiResponse;
        } catch(e) {
            result = e;
        }
        expect(await result).toEqual(incorrectStartDateMockedResponse);
    })
});
