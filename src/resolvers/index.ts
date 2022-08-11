import mongoose from "mongoose";
import Author from "../models/AuthorModel";
import Book from "../models/BookModel";
import isValidObjectId from "../utility/isValidObjectId";
import sendResponse from "../utility/sendResponses";

const resolvers = {
  Query: {
    getAllbooks: async () => await Book.find(),
    getBookById: async (parent: any, args: any) => {
      isValidObjectId(args.id,"Book")
      
      const book = await Book.findById(args.id)
      if(!book) throw new Error(`This Book Not Exists.`)

      return book
    },
    getBooks: async (parent: any, args: any) => {
      if(args.id){
        if(!mongoose.Types.ObjectId.isValid(args.id)){
          return sendResponse({book:[],count:0},"Invalid Id",401)
        }
      }

      const book = await Book.find({id:args.id})
      if(!book) throw new Error(`This Book Not Exists.`)

      return sendResponse({book,count:book.length})
    },
    getAllAuthors: async () => await Author.find(),
    getAuthorById: async (parent: any, args: any) =>{
      isValidObjectId(args.id,"Author")
      
      const author = await Author.findById(args.id)
      if(!author) throw new Error(`This Author Not Exists.`)

      return author
    },
    getAuthors: async (parent: any, args: any) => {
      if(args.id){
        if(!mongoose.Types.ObjectId.isValid(args.id)) {
          return sendResponse({author:[],count:0},"Invalid Id",401)
        }
      }

      const author = await Author.find({})
      if(!author) throw new Error(`This Author Not Exists.`)

      return sendResponse({author,count:author.length})
    },
  },
  Book: {
    author: async (parent: any) => await Author.findById(parent.author),
  },
  Author: {
    books: async (parent: any) => await Book.find({ author: parent.id }),
  },
  Mutation: {
    addBook: async (parent: any, args: any, context: any, info: any) => {
      isValidObjectId(args.addBookInput.author,"Author")

      const author = await Author.findById(args.addBookInput.author)
      if(!author) throw new Error(`This Author Not Exists.`)

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
    updateBook: async (parent: any, args: any, context: any, info: any) => {
      isValidObjectId(args.updateBookInput.id,"Book")
      
      if(args.updateBookInput.author){
        isValidObjectId(args.updateBookInput.author,"Author")

        const author = await Author.findById(args.updateBookInput.author)
        if(!author) throw new Error(`This Author Not Exists.`)
      }
      
      const book = await Book.findByIdAndUpdate(
        args.updateBookInput.id,
        {
          title: args.updateBookInput.title,
          author: args.updateBookInput.author,
        },
        {new:true}
      )

      if(!book) throw new Error(`This Book Not Exists.`)

      return book;
    },
    updateAuthor: async (parent: any, args: any, context: any, info: any) => {
      isValidObjectId(args.updateAuthorInput.id,"Author")
      
      const author = await Author.findByIdAndUpdate(
        args.updateAuthorInput.id,
        {
          name: args.updateAuthorInput.name,
        },
        {new:true},

      )

      if(!author) throw new Error(`This Author Not Exists.`)

      return author;
    },
    deleteBook: async (parent: any, args: any, context: any, info: any) => {
      isValidObjectId(args.bookId,"Book")

      const book = await Book.findByIdAndRemove(args.bookId)
      if(!book) throw new Error(`This Book Not Exists.`)

      return book
    },
    deleteAuthor: async (parent: any, args: any, context: any, info: any) => {
      isValidObjectId(args.authorId,"Author")

      const author = await Author.findById(args.authorId)
      if(!author) throw new Error(`This Author Not Exists.`)

      await author.remove()
      return author
    }
  },
};

export default resolvers;
