import { sendAuthorResponse } from './helper';
import mongoose from "mongoose";
import isValidObjectId from "../../utility/isValidObjectId";
import sendResponse from "../../utility/sendResponses";
import Author from "./model";

export const AuthorQuery = {
  getAllAuthors: async () => {
    const author = await Author.find()
    return sendAuthorResponse(200,"Success",author,author.length)
  },
  getAuthorById: async (parent: any, args: any) => {
    if(!mongoose.Types.ObjectId.isValid(args.id)) return sendAuthorResponse(403,"Invalid ID",[],0)

    const author = await Author.findById(args.id);
    if (!author) throw new Error(`This Author Not Exists.`);

    return sendAuthorResponse(200,"Success",[author],1);
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
