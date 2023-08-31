import express from 'express';
import { BooksRoutes } from '../modules/Books/book.route';
import { CategoryRoutes } from '../modules/Category/category.route';
import { UserRoutes } from '../modules/User/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/books',
    route: BooksRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
