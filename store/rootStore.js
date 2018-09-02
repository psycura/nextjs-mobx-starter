import { action, observable } from 'mobx'

let store = null;

class RootStore {
    @observable lastUpdate = 0
    
    constructor ( isServer ) {
    }
}

export function initStore ( isServer ) {
    if ( isServer ) {
        // console.log ( '1111' );
        return new RootStore ( isServer );
    } else {
        // console.log ( '2222' );
        if ( store === null ) {
            // console.log ( '3333' );
            store = new RootStore ( isServer );
        }
        return store;
    }
}
