import mongoose from 'mongoose';

const borrowerSchema = new mongoose.Schema({
    borrowerId: { type: Number, required: true, unique: true },
    borrowerName: { type: String, required: true }
});

const Borrower = mongoose.model('Borrower', borrowerSchema);
export default Borrower;
