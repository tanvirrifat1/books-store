import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookController } from './book.controller';

const router = express.Router();

router.get('/', BookController.getAllData);
router.get('/:id', BookController.getByBooks);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.updateData);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteData);
router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.insertIntoDb
);

export const BooksRoutes = router;
