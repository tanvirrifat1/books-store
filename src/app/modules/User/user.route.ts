import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/', UserController.getAllFromDb);
router.get('/:id', UserController.getSingleDataFromDb);
router.delete('/:id', UserController.deletedData);
router.patch(
  '/:id',
  validateRequest(UserValidation.update),
  UserController.update
);
router.post(
  '/signup',
  validateRequest(UserValidation.create),
  UserController.insertIntoDb
);

export const UserRoutes = router;
