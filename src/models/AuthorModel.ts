import mongoose from 'mongoose'

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

const Author = mongoose.model<AuthorType>('Author',AuthorSchema);
export default Author;