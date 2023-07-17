import axios from "axios";


export const fetchData = async (url, options) => {
    try {
        var rawResponse = null;

        if ( !options ) {
            rawResponse = await axios.get(url);
        } else {
            rawResponse = await axios(url, options);
        }
        console.log('Axios successful!');

        if ( rawResponse.data?.status === 400  ) throw rawResponse.data;
        if ( rawResponse.status === 200 ) return rawResponse.data;
        else throw rawResponse.data;
    } catch(e) {
        console.log(e);
        if (e.status === 400) console.log('Invalid Params.');
        throw e;
    }

}