const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        authors: [String]
        description: String!
        bookId: String!  
        title: String!
        image: String
        link: String
    }

    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
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
        me(username: String, _id: String): User
    }

    type Mutation {
        login(email: String!, password: String!, username: String!): Auth
        addUser(username: String, email: String, password: String): Auth
        saveBook(author: [String], description: String!, title: String!, bookId: String!, image: String, link: String):User
        removeBook(bookId: String!): User
    }

`;

module.exports = typeDefs;