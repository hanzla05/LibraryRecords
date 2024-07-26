import express from 'express';
import Author from '../models/Author.mjs';

const router = express.Router();

// Add a new author
router.post('/', async (req, res) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json({ message: "Author added successfully", author });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get author details
router.get('/:id', async (req, res) => {
    try {
        const authorId = parseInt(req.params.id);
        const author = await Author.findOne({ authorId });

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        res.status(200).json({ message: "Author data retrieved successfully", author });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
