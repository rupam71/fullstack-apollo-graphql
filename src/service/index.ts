import { BookTypes, BookQuery, BookMutation, BookResolvers } from './book';
import { gql } from 'apollo-server-express';
import { AuthorTypes, AuthorQuery, AuthorMutation, AuthorResolvers } from './author';

export const typeDefs = gql`
    type Query
    type Mutation
    ${BookTypes}
    ${AuthorTypes}
`

export const resolvers = {
    Query: {
        ...BookQuery,
        ...AuthorQuery,
    },
    Mutation: {
        ...BookMutation,
        ...AuthorMutation,
    },
    Book: {
        ...BookResolvers,
    },
    Author: {
        ...AuthorResolvers,
    }
}