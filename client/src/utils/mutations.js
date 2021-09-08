import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String, $username: String, $password: String!) {
        login (email: $email, username: $username, password: $password) {
            token
            user {
                _id
                savedBooks {
                    bookId
                }
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token 
            User {
                _id
                email
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($authors: [String], $description: String!, $title: String!, $bookId: String!, $image: String, $link: String) {
        saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
            _id
            username
            email
            savedBooks {
                bookId
            }
        }
    }
`;
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            savedBooks {
                bookId
            }
        }
    }
`;