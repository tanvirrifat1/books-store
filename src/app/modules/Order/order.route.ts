import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getAllOrders
);
router.post(
  '/create',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.insertIntoDb
);

export const OrderRoutes = router;
