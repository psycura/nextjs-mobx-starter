import fetch from 'isomorphic-unfetch'
import AWSAppSyncClient from 'aws-appsync';
import awsConfiguration from '../aws-exports';
import appSyncConfig from "./AppSync";
import Amplify from 'aws-amplify';



Amplify.configure ( { ...awsConfiguration, ...appSyncConfig } );

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if ( !process.browser ) {
    global.fetch = fetch
}

function create ( initialState ) {
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new AWSAppSyncClient ( {
        url:    appSyncConfig.graphqlEndpoint,
        region: appSyncConfig.region,
        auth:   {
            type:   appSyncConfig.authenticationType,
            apiKey: appSyncConfig.apiKey,
        },
        disableOffline: true
    
    } );
}

export default function initApollo ( initialState ) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if ( !process.browser ) {
        return create ( initialState )
    }
    
    // Reuse client on the client-side
    if ( !apolloClient ) {
        apolloClient = create ( initialState )
    }
    
    return apolloClient
}
