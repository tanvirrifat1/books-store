import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';

const insertIntoDb = async (data: Order) => {
  const result = await prisma.order.create({ data });
  return result;
};

const getAllOrders = async (user: any) => {
  const { role, id } = user;

  const isExist = await prisma.user.findUnique({
    where: id,
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }

  if (role === 'admin') {
    const result = await prisma.order.findMany();
    return result;
  }

  if (role === 'customer') {
    const result = await prisma.order.findMany({
      where: { userId: id },
    });
    return result;
  }
};

export const OrderService = { insertIntoDb, getAllOrders };
