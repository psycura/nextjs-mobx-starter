// @flow
import { observer } from 'mobx-react';
import styled from 'styled-components'

const Button = styled.button`
    background-color: ${props => props.theme.secondaryColor};
`;

type ButtonProps = {
    clickHandler : Function
}

import React from 'react';

function StyledButton ( props : ButtonProps ) {
    return (
        <Button onClick={props.clickHandler}>
            Show / Hide
        </Button>
    );
}

export default observer ( StyledButton );
