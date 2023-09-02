import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import {
  BookRelationalFields,
  BookRelationalFieldsMapper,
  BookSearchAbleFields,
} from './book.constants';
import { IBooksFilterRequest } from './book.interface';

const insertIntoDb = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllData = async (
  filters: IBooksFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, limit, skip, size } =
    paginationHelpers.calculatePagination(options);
  const { search, maxPrice, mixPrice, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: BookSearchAbleFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        gte: Number(mixPrice),
      },
    });
  }

  if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: Number(mixPrice),
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (BookRelationalFields.includes(key)) {
          return {
            [BookRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    skip,
    take: size,
    where: whereConditions,
    include: {
      category: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: 'desc' },
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByBooks = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
  return result;
};

const deleteData = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: { id },
  });
  return result;
};

const updateData = async (
  id: string,
  payload: Partial<Book>
): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: { id },
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

export const BookService = {
  insertIntoDb,
  getAllData,
  getByBooks,
  updateData,
  deleteData,
};
