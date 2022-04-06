/**
 * @jest-environment jsdom
 */
import React from 'react';
import {screen, render} from '@testing-library/react';
import LoginPage from '../client/components/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../client/store';

describe('Testing Login Page', () => {
    beforeEach( () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginPage />
                </BrowserRouter>
            </Provider>
        )
    });

    afterEach(() => {
        document.getElementsByTagName('html')[0].innerHTML = ''; 
    });

    it('Basic component check', () => {
        // has two buttons
        expect(screen.getAllByRole('button')).toHaveLength(2);
        // one is the Sign up button
        expect(screen.getByText('Log in', {exact:true}));
        // one is the Log in button
        expect(screen.getByText('Sign up', {exact:false}));
        // two input fields (MUI 'TextFields')
        expect(screen.getAllByRole('input_text_box')).toHaveLength(2);

      });

})
