import { Category } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const insertIntoDb = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getAllData = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();
  return result;
};

export const CategoryService = { insertIntoDb, getAllData };
