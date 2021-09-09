import {gql} from '@apollo/client';

export const GET_ME = gql`
query me($username: String, $id: String) {
    me( username: $username, _id: $id) {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;

