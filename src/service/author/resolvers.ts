import Book from "../book/model";

export const AuthorResolvers = {
  books: async (parent: any, args:any) => {
    console.log({parent,args})
    return await Book.find({ 
      author: parent.id, 
      ...(args.id && { _id:args.id }),
    })
  },
};
