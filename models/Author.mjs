import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    authorId: { type: Number, required: true, unique: true },
    authorName: { type: String, required: true },
    authorBirth: { type: Date, required: true }
});

const Author = mongoose.model('Author', authorSchema);
export default Author;
