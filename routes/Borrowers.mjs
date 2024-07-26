import express from 'express';
import Borrower from '../models/Borrower.mjs';
import BorrowedBook from '../models/BorrowedBook.mjs';

const router = express.Router();

// Add a new borrower
router.post('/', async (req, res) => {
    try {
        const borrower = await Borrower.create(req.body);
        res.status(201).json({ message: "Borrower added successfully", borrower });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get borrower details with borrowed books
router.get('/:id', async (req, res) => {
    try {
        const borrowerId = parseInt(req.params.id);

        const borrowerData = await Borrower.aggregate([
            { $match: { borrowerId: borrowerId } },
            {
                $lookup: {
                    from: 'borrowedbooks',
                    localField: 'borrowerId',
                    foreignField: 'borrowerId',
                    as: 'borrowedBooks'
                }
            },
            { $unwind: '$borrowedBooks' },
            {
                $lookup: {
                    from: 'books',
                    localField: 'borrowedBooks.bookId',
                    foreignField: 'bookId',
                    as: 'borrowedBooks.book'
                }
            },
            { $unwind: '$borrowedBooks.book' },
            {
                $group: {
                    _id: '$borrowerId',
                    borrowerId: { $first: '$borrowerId' },
                    borrowerName: { $first: '$borrowerName' },
                    borrowedBooks: { $push: '$borrowedBooks' }
                }
            },
            {
                $project: {
                    _id: 0,
                    borrowerId: 1,
                    borrowerName: 1,
                    borrowedBooks: {
                        borrowedBookId: 1,
                        borrowDate: 1,
                        returnDate: 1,
                        book: {
                            bookId: 1,
                            title: 1,
                            genre: 1,
                            isbn: 1,
                            publisher: 1
                        }
                    }
                }
            }
        ]);

        res.status(200).json({ message: "Borrower data retrieved successfully", borrowerData });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
