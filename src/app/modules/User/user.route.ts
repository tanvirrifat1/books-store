import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllFromDb);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getSingleDataFromDb
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deletedData);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.update),
  UserController.update
);
router.post(
  '/signup',
  validateRequest(UserValidation.create),
  UserController.insertIntoDb
);

export const UserRoutes = router;
