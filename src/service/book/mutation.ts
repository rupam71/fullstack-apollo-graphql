import isValidObjectId from "../../utility/isValidObjectId";
import Author from "../author/model";
import Book from "./model";

export const BookMutation = {
  addBook: async (parent: any, args: any, context: any, info: any) => {
    isValidObjectId(args.addBookInput.author, "Author");

    const author = await Author.findById(args.addBookInput.author);
    if (!author) throw new Error(`This Author Not Exists.`);

    const book = new Book({
      title: args.addBookInput.title,
      author: args.addBookInput.author,
    });

    return await book.save();
  },
  updateBook: async (parent: any, args: any, context: any, info: any) => {
    isValidObjectId(args.updateBookInput.id, "Book");

    if (args.updateBookInput.author) {
      isValidObjectId(args.updateBookInput.author, "Author");

      const author = await Author.findById(args.updateBookInput.author);
      if (!author) throw new Error(`This Author Not Exists.`);
    }

    const book = await Book.findByIdAndUpdate(
      args.updateBookInput.id,
      {
        title: args.updateBookInput.title,
        author: args.updateBookInput.author,
      },
      { new: true }
    );

    if (!book) throw new Error(`This Book Not Exists.`);

    return book;
  },
  deleteBook: async (parent: any, args: any, context: any, info: any) => {
    isValidObjectId(args.bookId, "Book");

    const book = await Book.findByIdAndRemove(args.bookId);
    if (!book) throw new Error(`This Book Not Exists.`);

    return book;
  },
};
