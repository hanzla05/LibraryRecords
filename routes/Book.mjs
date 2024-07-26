import express from 'express';
import Book from '../models/Book.mjs';
import Author from '../models/Author.mjs';

const router = express.Router();

// Add a new book
router.post('/', async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({ message: "Book added successfully", book });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get book details with author
router.get('/:id', async (req, res) => {
    try {
        const bookId = parseInt(req.params.id);

        const bookData = await Book.aggregate([
            { $match: { bookId: bookId } },
            {
                $lookup: {
                    from: 'authors',
                    localField: 'authorId',
                    foreignField: 'authorId',
                    as: 'author'
                }
            },
            { $unwind: '$author' },
            {
                $project: {
                    _id: 0,
                    bookId: 1,
                    title: 1,
                    genre: 1,
                    isbn: 1,
                    publisher: 1,
                    author: {
                        authorName: 1,
                        authorBirth: 1
                    }
                }
            }
        ]);

        res.status(200).json({ message: "Book data retrieved successfully", bookData });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
