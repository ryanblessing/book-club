const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        bookId: ID
        authors: String
        description: String
        title: String
        image: String
        link: String
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Users {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        books(title: String!): [Book]
        book(bookId: ID!): Book
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(author: String!, description: String!, title: String!, bookId: ID, image: String!, link: String!):User
        removeBook(bookId: ID): User
    }

`;

module.exports = typeDefs;