import { observer } from 'mobx-react';
import styled from 'styled-components'
import { observable } from 'mobx'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'
import { Component } from 'react';

const DeleteClient = gql`
    mutation deleteEvent($id:ID!){
        deleteClient(input:{
            id:$id
        }){
            id
        }
    },
`

const StyledClient = styled.div`
  display: flex;
  width: 150px;
  padding: 10px;
  justify-content: space-between;
  border: 1px solid lightblue;
  border-radius: 3px;
  margin-bottom: 5px;
`

const Remove = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid aqua;
  border-radius: 50%;
  cursor: pointer;
  width: 20px;
  height: 20px;
  
  &:hover{
    background-color: aqua;
    color: white;
  }
  
  &:active{
    background-color: aquamarine;
  }
`

class Client extends Component {
    
    @observable isShown = false;
    
    render () {
        const { client } = this.props;
        return (
            <StyledClient onPointerOver={() => this.isShown = true}
                          onPointerLeave={() => this.isShown = false}
                          className="Client">
                {client.title}
                {
                    this.isShown
                    &&
                    <Mutation mutation={DeleteClient} variables={{ id: client.id }}>
                        {
                            ( deleteClient ) => (
                                < Remove onClick={deleteClient}>
                                    X
                                </Remove>
                            )
                        }
                    </Mutation>
                }
            
            </StyledClient>
        );
    }
}

export default observer ( Client );
