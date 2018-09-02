// @flow
import { observer } from 'mobx-react';
import React, { Component } from 'react';

type InputProps = {
    label : string,
    name : string,
    placeholder : string,
    type? : 'password' | 'text',
    value : string,
    onChange : Function,
    onBlur : Function,
    touched : boolean,
    error? : any
}

class Input extends Component<InputProps> {
    render () {
        const { label, error, touched, ...rest } = this.props
        return (
            <div className="Input">
                <label>
                    {label}:
                    <input {...rest}/>
                </label>
                {
                    touched && error
                    &&
                    <p>{error}</p>
                    
                }
            </div>
        );
    }
}

export default observer ( Input );
