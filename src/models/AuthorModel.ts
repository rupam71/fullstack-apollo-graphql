import mongoose from 'mongoose'
import Book from './BookModel'

interface AuthorType {
    name: string,
    books: mongoose.Types.ObjectId
}

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    books: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book'
    }
})

AuthorSchema.pre('remove',async function(next){
    const author = this
    await Book.deleteMany({author:author.id})
    next()
})

const Author = mongoose.model<AuthorType>('Author',AuthorSchema);
export default Author;