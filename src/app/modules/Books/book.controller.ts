import { Book } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BookFilterAbleFields } from './book.constants';
import { BookService } from './book.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDb(req.body);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books created successfully',
    data: result,
  });
});

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterAbleFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await BookService.getAllData(filters, options);

  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getByBooksCategoryId = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterAbleFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await BookService.getByBooksCategoryId(req.params.id, options);
  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfully',
    meta: result.meta,

    data: result.data,
  });
});

const getByBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getByBooks(req.params.id);

  sendResponse<Book | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single Books successfully',
    data: result,
  });
});

const updateData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.updateData(id, req.body);

  sendResponse<Book | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books updated successfully',
    data: result,
  });
});

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.deleteData(id);

  sendResponse<Book | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books deleted successfully',
    data: result,
  });
});

export const BookController = {
  insertIntoDb,
  getAllData,
  getByBooks,
  updateData,
  deleteData,
  getByBooksCategoryId,
};
