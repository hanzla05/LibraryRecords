import express from 'express';
import mongoose from 'mongoose';
import BookRouter from './routes/Books.mjs';
import AuthorRouter from './routes/Authors.mjs';
import BorrowerRouter from './routes/Borrowers.mjs';
import BorrowedBookRouter from './routes/BorrowedBooks.mjs';

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/LibraryManagement", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('connected', () => console.log('Database Connected'));
connection.on('error', (error) => console.log('Database connection error', error));

app.use('/books', BookRouter);
app.use('/authors', AuthorRouter);
app.use('/borrowers', BorrowerRouter);
app.use('/borrowedbooks', BorrowedBookRouter);

app.listen(3000, () => {
    console.log('App is running on port 3000');
});
