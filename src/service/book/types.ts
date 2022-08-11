export const BookTypes = `
type Book {
    id: ID!
    title: String!
    author: Author!
  }

  input addBookInput {
    title: String!
    author: ID!
  }

  input updateBookInput {
    id: ID!
    title: String
    author: ID
  }

  type BooksResult {
    book: [Book]
    count: Int
  }

  type BooksResponse {
    statusCode: Int!
    message: String!
    result: BooksResult
  }

  extend type Query {
    getBooks(id: ID): BooksResponse
    getAllbooks: [Book] # /api/books
    getBookById(id: ID!): Book # /api/books/:id
  }
  
  extend type Mutation {
    addBook(addBookInput: addBookInput!): Book
    addAuthor(addAuthorInput: addAuthorInput!): Author
    updateBook(updateBookInput: updateBookInput!): Book
  }
`