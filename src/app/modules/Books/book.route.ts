import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();

router.get('/', BookController.getAllData);
router.get('/:id', BookController.getByBooks);

router.get('/:categoryId/category', BookController.getByBooksCategoryId);

router.patch(
  '/:id',
  validateRequest(BookValidation.update),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.updateData
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteData);
router.post(
  '/create-book',
  validateRequest(BookValidation.create),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.insertIntoDb
);

export const BooksRoutes = router;
