/**
 * @jest-environment jsdom
 */
import React from 'react';
import {screen, render} from '@testing-library/react';
import Dashboard from '../client/components/Dashboard';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../client/store';

describe('Testing Dashboard - Components', () => {
    beforeEach( () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Dashboard />
                </BrowserRouter>
            </Provider>
        )
    });

    it('Dashboard component check (Container)', () => {
        // Check basic components in header
        expect(screen.getByText('Hello', {exact:false}));
        expect(screen.getByText('Sign Out'));
    });

    it('Dashboard component check (internal - MovieContainer)', () => {
        //make sure MovieContainer renders properly initially
        expect(screen.getByRole('movie-container'));
        expect(screen.getByText('My Movies', {exact:false}));
        expect(screen.getByText('GET MORE', {exact:false}));
        expect(screen.getByText('WATCHED', {exact:false}));
        expect(screen.getByText('TO WATCH', {exact:false}));
    });

    it('Dashboard component check (internal - SearchWindow)', () => {
        //make sure SearchWindow element renders properly initially
        expect(screen.getByRole('search-window'));
        expect(screen.getByPlaceholderText('Search Movie'));
    });

    it('Dashboard component check (internal - ReviewModal)', () => {
        //make sure ReviewModal element renders
        expect(screen.getByRole('review-modal'));
        expect(screen.getByText('Recommended Movies', {exact:false}));
        // set up test for having 5 recommended movies
    });
});

xdescribe('Testing Dashboard - Actions', () => {
    beforeEach( () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Dashboard />
                </BrowserRouter>
            </Provider>
        )
    });


    it('Toggle between watched and wantToWatch', () => {
        // Check that watched button is selected on screen render
        
        //user action for making sure watched button click works

        // user action for making sure wishlist button click works

    });

    it('Search function works', () => {
        // no results initially
        // Mock function to return 20 results (with common word)
        // check to see 20 of them there
    });

});