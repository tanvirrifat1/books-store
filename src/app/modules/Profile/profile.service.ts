import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { prisma } from '../../../shared/prisma';

const myProfile = async (token: string): Promise<User | null> => {
  const user = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  console.log(user);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found!');
  }

  const result = await prisma.user.findUnique({
    where: { id: user.userId },
  });
  return result;
};

export const ProfileService = { myProfile };
