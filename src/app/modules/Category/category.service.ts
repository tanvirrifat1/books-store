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

const getSingleData = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: { id },
  });
  return result;
};

const updateData = async (
  id: string,
  payload: Partial<Category>
): Promise<Category | null> => {
  const result = await prisma.category.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteData = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: { id },
  });
  return result;
};

export const CategoryService = {
  insertIntoDb,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
};
