import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CategoryController } from './category.controller';

const router = express.Router();

router.get('/', CategoryController.getAllData);
router.get('/:id', CategoryController.getSingleData);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), CategoryController.updateData);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteData
);

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.insertIntoDb
);

export const CategoryRoutes = router;
