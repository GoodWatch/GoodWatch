/**
 * @jest-environment jsdom
 */
 import React from 'react';
 import {screen, render, fireEvent} from '@testing-library/react';
 import SearchWindow from '../client/components/SearchWindow';
 import { BrowserRouter } from 'react-router-dom';
 import { Provider } from 'react-redux';
 import { store } from '../client/store';


 xdescribe('Testing Search Functionality', () => {
    beforeEach( () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SearchWindow />
                </BrowserRouter>
            </Provider>
        )
    });

    // IN PROGRESS:
    it('Searching "the" yields 20 results', () => {
        // get the button to click on
        let searchForm = screen.getByRole('search-form');
        let searchButton = screen.getByRole('search-button');
        let fieldInput = screen.getByRole("text-field");
        fieldInput.value = "the"
        // fireEvent.change(searchForm, {target: {value: "the"}});
        fireEvent.click(searchButton);
        // expect(fieldInput).toHaveValue("the") // IMPORT 
        expect(screen.getAllByRole("one-movie-result")).toHaveLength(20);
        // fireEvent.click(searchButton)
        // fire event (click)
        // getAllByID for the Search Items that are made
    });

});