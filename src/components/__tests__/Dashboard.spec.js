import React from 'react';
import { Provider } from 'react-redux';
import { AnimeProvider } from '../../providers/animeProvider';
import Dashboard from '../Dashboard';

import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import * as MockedResponse from '../../api/sample_input';
import * as AnimeAPI from '../../api/animeList';
import * as Utils from '../../utils/index';
import { store } from '../../store/store';


describe('Dashboard', () => {
    const wrapper = ({ children }) => {
        return(
            <Provider store={store}>
                <AnimeProvider>
                    {children}
                </AnimeProvider>
            </Provider>
        );
    }

    it("hides  welcome modal after 'continue' button is clicked ", async() => {
        localStorage.clear();
        render(<Dashboard/>, { wrapper });

        const modalCont = screen.getByTestId("modal-container");
        expect(modalCont).toBeVisible();

        const btnHideModal = screen.getByTestId("hide-modal-btn");
        expect(btnHideModal).toBeVisible();

        await act(async () => {
            await fireEvent.click(btnHideModal);
        })

        expect(modalCont).not.toBeVisible();
    });
});