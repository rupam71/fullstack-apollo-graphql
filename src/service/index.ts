import { BookTypes, BookQuery, BookMutation, BookResolvers } from './book';
import { UserTypes, UserQuery, UserMutation, UserResolvers } from './user';
import { gql } from 'apollo-server-express';
import { AuthorTypes, AuthorQuery, AuthorMutation, AuthorResolvers } from './author';

export const typeDefs = gql`
    type Query
    type Mutation
    ${BookTypes}
    ${AuthorTypes}
    ${UserTypes}
`

export const resolvers = {
    Query: {
        ...BookQuery,
        ...AuthorQuery,
        ...UserQuery,
    },
    Mutation: {
        ...BookMutation,
        ...AuthorMutation,
        ...UserMutation,
    },
    Book: {
        ...BookResolvers,
    },
    Author: {
        ...AuthorResolvers,
    }
}