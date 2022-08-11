import isValidObjectId from "../../utility/isValidObjectId";
import Author from "./model";

export const AuthorMutation = {
  addAuthor: async (parent: any, args: any, context: any, info: any) => {
    const author = new Author({
      name: args.addAuthorInput.name,
    });

    return await author.save();
  },
  updateAuthor: async (parent: any, args: any, context: any, info: any) => {
    isValidObjectId(args.updateAuthorInput.id, "Author");

    const author = await Author.findByIdAndUpdate(
      args.updateAuthorInput.id,
      {
        name: args.updateAuthorInput.name,
      },
      { new: true }
    );

    if (!author) throw new Error(`This Author Not Exists.`);

    return author;
  },
  deleteAuthor: async (parent: any, args: any, context: any, info: any) => {
    isValidObjectId(args.authorId, "Author");

    const author = await Author.findById(args.authorId);
    if (!author) throw new Error(`This Author Not Exists.`);

    await author.remove();
    return author;
  },
};
