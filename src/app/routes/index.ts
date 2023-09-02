import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { BooksRoutes } from '../modules/Books/book.route';
import { CategoryRoutes } from '../modules/Category/category.route';
import { ProfileRoutes } from '../modules/Profile/profile.route';
import { UserRoutes } from '../modules/User/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
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
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
