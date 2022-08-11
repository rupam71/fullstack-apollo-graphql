import mongoose from "mongoose";

interface BookType {
  title: string;
  author: mongoose.Types.ObjectId;
}

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model<BookType>("Book", BookSchema);
export default Book;
