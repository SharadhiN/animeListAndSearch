import { fetchData } from "../common/fetchData";
import { BASE_URL } from "../utils/constants";

export const getAnimeByTitle = async (title) => {
    console.log(title);
    let url = BASE_URL + '/anime?q=' + title;
    url = encodeURI(url);
    return await fetchData(url, null);
}

export const getAnimeByStartDate = async (startDate) => {
    let url = BASE_URL + '/anime?start_date=' + startDate;
    url = encodeURI(url);
    return await fetchData(url, null);
}

export const getAnimeByEndDate = async (endDate) => {
    let url = BASE_URL + '/anime?end_date=' + endDate;
    url = encodeURI(url);
    return await fetchData(url, null);
}

export const getAllAnimes = async () => {
    const url = BASE_URL + '/anime';

    console.log('Dispatching network request');
    return await fetchData(url, null);

}

export const getNextPage = async (url) => {
    return await fetchData(url, null);
}