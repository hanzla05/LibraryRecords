import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    bookId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    genre: { type: String, required: true },
    isbn: { type: String, required: true },
    publisher: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.Number, ref: 'Author', required: true }
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
