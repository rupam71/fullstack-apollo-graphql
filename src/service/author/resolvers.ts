import Book from "../book/model";

export const AuthorResolvers = {
  books: async (parent: any) => await Book.find({ author: parent.id }),
};
