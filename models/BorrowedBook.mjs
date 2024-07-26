import mongoose from 'mongoose';

const borrowedBookSchema = new mongoose.Schema({
    borrowedBookId: { type: Number, required: true, unique: true },
    bookId: { type: mongoose.Schema.Types.Number, ref: 'Book', required: true },
    borrowerId: { type: mongoose.Schema.Types.Number, ref: 'Borrower', required: true },
    borrowDate: { type: Date, required: true },
    returnDate: { type: Date, required: true }
});

const BorrowedBook = mongoose.model('BorrowedBook', borrowedBookSchema);
export default BorrowedBook;
