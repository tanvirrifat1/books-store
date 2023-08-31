import { User } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const insertIntoDb = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const getAllFromDb = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();
  return result;
};

const getSingleDataFromDb = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: { id },
  });
  return result;
};

export const UserService = { insertIntoDb, getAllFromDb, getSingleDataFromDb };
