import { createContext, useContext } from 'react';

export const AnimeContext = createContext({});
export const ERROR_CONTEXT_OUTSIDE = "Anime Context cannot be out of Anime Provider";


// create my own custom hook to use the anime context
export const useAnime = () => {
    const contextValue = useContext(AnimeContext);
    if ( contextValue === undefined ) {
        throw new Error(ERROR_CONTEXT_OUTSIDE);
    }
    return contextValue;
}