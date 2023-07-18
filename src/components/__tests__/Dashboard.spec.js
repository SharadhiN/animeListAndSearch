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

    describe("Search", () => {
        it("filters results by title", async () => {

            jest.spyOn(AnimeAPI, "getAnimeByTitle").mockImplementation(() => {
                return Promise.resolve({ ...MockedResponse.titleSearchMockedResponse });
            });

            render(<Dashboard />, { wrapper });

            const titleInput = screen.getByTestId("input-search-by-title");

            const titleSearchBtn = screen.getByTestId("btn-search-title");

            fireEvent.change(titleInput, { target: { value: 'bleach' } });


            await act(async () => {
                await fireEvent.click(titleSearchBtn);
            });

            expect(AnimeAPI.getAnimeByTitle).toHaveBeenCalled();
        });


        it("filters results start date", async () => {

            jest.spyOn(AnimeAPI, "getAnimeByStartDate").mockImplementation(() => {
                return Promise.resolve({ ...MockedResponse.startDateSearchMockedResponse });
            });

            render(<Dashboard />, { wrapper });

            const startDateInput = screen.getByTestId("input-search-by-start-date");
            const startDateSearchBtn = screen.getByTestId("btn-search-start-date");


            fireEvent.change(startDateInput, { target: { value: '2018-01-01' } });

            await act(async () => {
                await fireEvent.click(startDateSearchBtn);
            });

            expect(AnimeAPI.getAnimeByStartDate).toHaveBeenCalled();
        });

        it("filters results end date", async () => {

            jest.spyOn(AnimeAPI, "getAnimeByEndDate").mockImplementation(() => {
                return Promise.resolve({ ...MockedResponse.endDateSearchMockedResponse });
            });

            render(<Dashboard />, { wrapper });

            const endDateInput = screen.getByTestId("input-search-by-end-date");
            const endDateSearchBtn = screen.getByTestId("btn-search-end-date");


            fireEvent.change(endDateInput, { target: { value: '2018-01-01' } });

            await act(async () => {
                await fireEvent.click(endDateSearchBtn);
            });

            expect(AnimeAPI.getAnimeByEndDate).toHaveBeenCalled();
        });
    });
});