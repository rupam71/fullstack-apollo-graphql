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

  input updateBookInput {
    id: ID!
    title: String
    author: ID
  }
  input updateAuthorInput {
    id: ID!
    name: String
  }

  type BooksResult {
    book: [Book]
    count: Int
  }
  type AuthorsResult {
    author: [Author]
    count: Int
  }

  type BooksResponse {
    statusCode: Int!
    message: String!
    result: BooksResult
  }
  type AuthorsResponse {
    statusCode: Int!
    message: String!
    result: AuthorsResult
  }

  type Query {
    getBooks(id: ID): BooksResponse
    getAllbooks: [Book] # /api/books
    getBookById(id: ID!): Book # /api/books/:id
    getAuthors(id: ID): AuthorsResponse
    getAllAuthors: [Author] # /api/authors
    getAuthorById(id: ID!): Author # /api/authors/:id
  }
  
  type Mutation {
    addBook(addBookInput: addBookInput!): Book
    addAuthor(addAuthorInput: addAuthorInput!): Author
    updateBook(updateBookInput: updateBookInput!): Book
    updateAuthor(updateAuthorInput: updateAuthorInput!): Author
    deleteBook(bookId: ID!): Book
    deleteAuthor(authorId: ID!): Author
  }
`;

export default typeDefs;