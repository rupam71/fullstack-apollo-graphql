import mongoose from "mongoose";
import isValidObjectId from "../../utility/isValidObjectId";
import sendResponse from "../../utility/sendResponses";
import Book from "./model";

export const BookQuery = {
  getAllbooks: async () => await Book.find(),
  getBookById: async (parent: any, args: any) => {
    isValidObjectId(args.id, "Book");

    const book = await Book.findById(args.id);
    if (!book) throw new Error(`This Book Not Exists.`);

    return book;
  },
  getBooks: async (parent: any, args: any) => {
    if (args.id) {
      if (!mongoose.Types.ObjectId.isValid(args.id)) {
        return sendResponse({ book: [], count: 0 }, "Invalid Id", 401);
      }
    }

    const book = await Book.find({ _id: args.id });
    if (!book) throw new Error(`This Book Not Exists.`);

    return sendResponse({ book, count: book.length });
  },
};
