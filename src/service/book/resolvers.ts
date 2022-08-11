import Author from "../author/model";

export const BookResolvers = {
  author: async (parent: any) => await Author.findById(parent.author),
};
