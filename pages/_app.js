import App, { Container } from 'next/app'
import React from 'react'
import { initStore } from '../store/rootStore';
import { Provider } from 'mobx-react'

import { ThemeProvider } from 'styled-components';
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'

const theme = {
    secondaryColor: 'red',
    primaryColor:   'green',
    borderColor:    '#ccc',
};

class MyApp extends App {
    constructor ( props ) {
        super ( props );
        this.stores = {
            rootStore: initStore (),
        };
    }
    
    render () {
        const { Component, pageProps, apolloClient } = this.props;
        
        return (
            <Container>
                <ApolloProvider client={apolloClient}>
                    <Provider {...this.stores}>
                        <ThemeProvider theme={theme}>
                            <Component test='true' {...pageProps} />
                        </ThemeProvider>
                    </Provider>
                </ApolloProvider>
            </Container>
        )
    }
}

export default withApolloClient ( MyApp )
