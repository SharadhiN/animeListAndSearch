import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimeContext } from './animeContext';
import * as AnimeThunkActions from "../thunks/animeList";
import * as AnimeActions from "../reducers/anime";
import { useDispatch, useSelector } from 'react-redux';
import * as Constants from "../utils/constants";
import * as Utils from "../utils";

export const AnimeProvider = ({ children }) => {
    // Redux state
    const dispatch = useDispatch();
    const animeData = useSelector(state => state.anime.data);

    // Component states
    const [error, setError] = useState(undefined);
    const [info, setInfo] = useState(undefined);
    const [modal, setModal] = useState(true);
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    
    const hideModal = () => {
        setModal(oldState => !oldState);
        Utils.setLocalStorageItem(Constants.LOCAL_STORAGE_KEY_WELCOME_MODAL, true);
    }
    
    const hideError = () => {
        setError(undefined);
        dispatch(AnimeActions.setError(false));
    }

    const searchByTitle = () => {
        if (title && title !== '') {
            console.log('Searching by title: ' + title);
            dispatch(AnimeThunkActions.getAnimeByTitle({title}));
        }
    }
    const searchByStartDate = () => {
        if (startDate && startDate !== '') {
            console.log('Searching by startDate: ' + startDate);
            dispatch(AnimeThunkActions.getAnimeByStartDate({startDate}));
        }
    }

    const searchByEndDate = () => {
        if (endDate && endDate !== '') {
            console.log('Searching by endDate: ' + endDate);
            dispatch(AnimeThunkActions.getAnimeByEndDate({endDate}));
        }
    }

    useEffect(() => {
        dispatch(AnimeThunkActions.getAllAnimes());
    }, [dispatch]);


    const contextValue = {
        dispatch,
        error,
        hideError,
        info,
        setInfo,
        title,
        setTitle,
        modal,
        hideModal,
        animeData,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        searchByTitle,
        searchByStartDate,
        searchByEndDate
    }

    // wrap children with the provider to make the context available across children.
    return (
        <AnimeContext.Provider value = { contextValue }>
            {children}
        </AnimeContext.Provider>
    );
}

AnimeProvider.propTypes = {
    children: PropTypes.node.isRequired
};