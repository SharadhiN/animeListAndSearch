// * GraphQL Query to get an anime by its id
// Here I define my query as a multi-line string

import axios from "axios";


export const fetchData = async (url, options) => {
    try {

        // Make the HTTP Api request
        // fetch(url, options).then(handleResponse)
        //                 .then(handleData)
        //                 .catch(handleError);

        const rawResponse = await axios(url, options);
        // const response = JSON.parse(rawResponse.data);
        console.log(rawResponse);
        console.log('Axios successful!');

        if ( rawResponse.status === 200 ) return rawResponse.data;
        else throw rawResponse;
    } catch(e) {
        alert("Error, check console.");
        console.log(e);
        throw e;
    }

}




// function handleResponse(response) {
//     return response.json().then(function (json) {
//         return response.ok ? json : Promise.reject(json);
//     });
// }

// function handleData(data) {
//     console.log(data);
// }

// function handleError(error) {
//     alert('Error, check console');
//     console.error(error);
// }