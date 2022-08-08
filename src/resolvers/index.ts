import Author from "../models/AuthorModel";
import Book from "../models/BookModel";

const resolvers = {
  Query: {
    getAllbooks: async () => await Book.find(),
    getBookById: async (parent: any, args: any) => await Book.findById(args.id),
    getAuthors: async () => await Author.find(),
    getAuthorById: async (parent: any, args: any) =>
      await Author.findById(args.id),
  },
  Book: {
    author: async (parent: any) => await Author.findById(parent.author),
  },
  Author: {
    books: async (parent: any) => await Book.find({ author: parent.id }),
  },
  Mutation: {
    addBook: async (parent: any, args: any, context: any, info: any) => {
      const book = new Book({
        title: args.addBookInput.title,
        author: args.addBookInput.author,
      });

      return await book.save();
    },
    addAuthor: async (parent: any, args: any, context: any, info: any) => {
      const author = new Author({
        name: args.addAuthorInput.name,
      });

      return await author.save();
    },
  },
};

export default resolvers;
