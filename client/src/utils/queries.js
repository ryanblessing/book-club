import {gql} from '@apollo/client';

GET_ME = gql`
query me($username: string, $id: String) {
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
`