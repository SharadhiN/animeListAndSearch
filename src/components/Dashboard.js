import React from "react";
import '../styles/Dashboard.css';
import { getLocalStorageItem } from "../utils";
import { LOCAL_STORAGE_KEY_WELCOME_MODAL } from "../utils/constants";
import { useAnime } from "../providers/animeContext"; 
import AnimeWidget from "./widgets/AnimeWidget";
import Search from "./Search";
import Loader from "./Loader";
import Notification from "./Notification";
import Modal from "./Modal";

const Dashboard = () => {
    const {
        modal,
        hideModal,
        animeData,
        error,
        hideError,
        info,
        setInfo
    } = useAnime();


    const renderErrorIfExists = () => {
        // console.log('Rendering Error');
        if ( (animeData && animeData.error) || error ) {
            let withError = error;
            if (animeData && animeData.error) {
                withError = animeData.error;
            }
            return <Notification message={withError} hideNotification={hideError} type="error" />
        }
    }


    const renderInfoIfExists = () => {
        // console.log('Rendering Info');
        if ( info ) {
            return <Notification message={info} hideNotification={() => setInfo(undefined)} type="info" />
        }
    }

    const renderModal = () => {
        // console.log('Rendering Modal');
        if ( !modal ) return;

        const welcomeModal = getLocalStorageItem(LOCAL_STORAGE_KEY_WELCOME_MODAL);
        if ( !welcomeModal ) {
            return <Modal hideModal={hideModal} />
        }
    }

    return (
        <div className="main-container" data-testid="main-container">
                <div className="title">
                    <h1>Anilist Unofficial</h1>
                </div>
                <Search />
                <div>
                    <AnimeWidget />
                </div>

        { renderErrorIfExists() }
        { renderModal() }
        { renderInfoIfExists() }

        </div>
    );
}

export default Dashboard;