import mongoose from "mongoose";
import isValidObjectId from "../../utility/isValidObjectId";
import sendResponse from "../../utility/sendResponses";
import Author from "./model";

export const AuthorQuery = {
  getAllAuthors: async () => await Author.find(),
  getAuthorById: async (parent: any, args: any) => {
    isValidObjectId(args.id, "Author");

    const author = await Author.findById(args.id);
    if (!author) throw new Error(`This Author Not Exists.`);

    return author;
  },
  getAuthors: async (parent: any, args: any) => {
    if (args.id) {
      if (!mongoose.Types.ObjectId.isValid(args.id)) {
        return sendResponse({ author: [], count: 0 }, "Invalid Id", 401);
      }
    }

    const author = await Author.find({_id:args.id});
    if (!author) throw new Error(`This Author Not Exists.`);

    return sendResponse({ author, count: author.length });
  },
};
