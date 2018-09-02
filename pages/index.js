// @flow
import { Component } from 'react';

import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'

class Home extends Component {
    
    @observable test = 'test';
    
    render () {
        return (
            
            <h1>Test Page</h1>
        )
    }
}

export default inject ( 'rootStore' ) ( observer ( Home ) );
