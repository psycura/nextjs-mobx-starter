import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import { GET_DOGS } from '../pages';
import './AddButton.scss'

const AddItem = gql`
    mutation AddItem($title:String!){
        createClient(input:{
            title:$title
        }){
            id
            title
        }
    }
`;

const AddButton = () => {
    const client = {
        title: 'hello worls',
        
    };
    return (
        <Mutation mutation={AddItem} variables={client}>
            {( createClient ) => <button type="submit"
                                         onClick={createClient}>
                Add Event
            </button>}
        </Mutation>
    )
};

export default AddButton;
