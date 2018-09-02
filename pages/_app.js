import App, { Container } from 'next/app'
import React from 'react'
import { initStore } from '../store/rootStore';
import { Provider } from 'mobx-react'
import { ThemeProvider } from 'styled-components';

const theme = {
    secondaryColor: 'red',
    primaryColor:   'green',
    borderColor:    '#ccc',
};

import './Main.scss'

class MyApp extends App {
    constructor ( props ) {
        super ( props );
        this.stores = {
            rootStore: initStore (),
        };
    }
    
    render () {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <Provider {...this.stores}>
                    <ThemeProvider theme={theme}>
                        <Component test='true' {...pageProps} />
                    </ThemeProvider>
                </Provider>
            </Container>
        )
    }
}

export default MyApp
