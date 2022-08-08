import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: Author!
  }
  type Author {
    id: ID!
    name: String!
    books: [Book]
  }
  input addBookInput {
    title: String!
    author: ID!
  }
  input addAuthorInput {
    name: String!
  }

  type Query {
    getAllbooks: [Book] # /api/books
    getBookById(id: ID!): Book # /api/books/:id
    getAuthors: [Author] # /api/authors
    getAuthorById(id: ID!): Author # /api/authors/:id
  }
  
  type Mutation {
    addBook(addBookInput: addBookInput!): Book
    addAuthor(addAuthorInput: addAuthorInput!): Author
  }
`;

export default typeDefs;