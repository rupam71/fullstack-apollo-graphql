export const AuthorTypes = `
  type Author {
    id: ID!
    name: String!
    books(id: ID): [Book]
  }

  input addAuthorInput {
    name: String!
  }

  input updateAuthorInput {
    id: ID!
    name: String
  }

  type AuthorsResult {
    author: [Author]
    count: Int
  }

  type AuthorsResponse {
    statusCode: Int!
    message: String!
    result: AuthorsResult
  }
  extend type Query {
    getAuthors(id: ID): AuthorsResponse
    getAllAuthors: AuthorsResponse            # /api/authors
    getAuthorById(id: ID!): AuthorsResponse   # /api/authors/:id
  }

  extend type Mutation {
    updateAuthor(updateAuthorInput: updateAuthorInput!): Author
    deleteBook(bookId: ID!): Book
    deleteAuthor(authorId: ID!): Author
  }
`;
