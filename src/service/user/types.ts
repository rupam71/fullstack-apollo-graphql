export const UserTypes = `
  type User {
    id: ID
    name: String
    email: String
    password: String
    phone: String
  }

  input AddUserInput {
    name: String!
    email: String!
    password: String!
    phone: String!
  }

  input UpdateUserInput {
    id: ID!
    name: String
    password: String
    phone: String
  }

  type UserResponse {
    statusCode: Int!
    message: String!
    user: User
  }

  type AllUserResponse {
    statusCode: Int!
    message: String!
    user: [User]
  }

  type UserAuthResponse {
    statusCode: Int!
    message: String!
    token: String
    user: User
  }

  extend type Query {
    getAllUser: AllUserResponse
    getProfileUser(email:String, password:String) :UserAuthResponse 
    getUserById(id: ID!) :UserResponse
  }
  
  extend type Mutation {
    addUser (addUserInput: AddUserInput) :UserResponse
    updateUser (updateUserInput: UpdateUserInput) :UserResponse
    deleteUser (id: ID!) :UserResponse
  }
`