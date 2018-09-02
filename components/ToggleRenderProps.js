// @flow
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import React, { Component, type Node } from 'react';

type ToggleProps = {
    render : Function
}

class ToggleRenderProps extends Component<ToggleProps> {
    
    @observable on : boolean = false
    
    @action toggle () {
        this.on = !this.on
    }
    
    render () {
        const { render } = this.props;
        return (
            <div className="ToggleRenderProps">
                {render ( {
                    on:     this.on,
                    toggle: () => this.toggle ()
                } )}
            </div>
        );
    }
}

export default observer ( ToggleRenderProps );
