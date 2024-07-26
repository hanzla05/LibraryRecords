import express from 'express';
import BorrowedBook from '../models/BorrowedBook.mjs';

const router = express.Router();

// Add a new borrowed book record
router.post('/', async (req, res) => {
    try {
        const borrowedBook = await BorrowedBook.create(req.body);
        res.status(201).json({ message: "Borrowed book record added successfully", borrowedBook });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get borrowed book details
router.get('/:id', async (req, res) => {
    try {
        const borrowedBookId = parseInt(req.params.id);

        const borrowedBookData = await BorrowedBook.aggregate([
            { $match: { borrowedBookId: borrowedBookId } },
            {
                $lookup: {
                    from: 'books',
                    localField: 'bookId',
                    foreignField: 'bookId',
                    as: 'book'
                }
            },
            { $unwind: '$book' },
            {
                $lookup: {
                    from: 'borrowers',
                    localField: 'borrowerId',
                    foreignField: 'borrowerId',
                    as: 'borrower'
                }
            },
            { $unwind: '$borrower' },
            {
                $project: {
                    _id: 0,
                    borrowedBookId: 1,
                    borrowDate: 1,
                    returnDate: 1,
                    book: {
                        bookId: 1,
                        title: 1,
                        genre: 1,
                        isbn: 1,
                        publisher: 1
                    },
                    borrower: {
                        borrowerId: 1,
                        borrowerName: 1
                    }
                }
            }
        ]);

        res.status(200).json({ message: "Borrowed book data retrieved successfully", borrowedBookData });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
