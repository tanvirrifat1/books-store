import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.post('/create-book', BookController.insertIntoDb);

export const BooksRoutes = router;
