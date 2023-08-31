import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.insertIntoDb(req.body);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully',
    data: result,
  });
});

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllFromDb();

  sendResponse<User[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user fetched successfully',
    data: result,
  });
});

const getSingleDataFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getSingleDataFromDb(req.params.id);

  sendResponse<User | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single user successfully',
    data: result,
  });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateData(req.params.id, req.body);

  sendResponse<User | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user updated successfully',
    data: result,
  });
});

const deletedData = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deletedData(req.params.id);

  sendResponse<User | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user deleted successfully',
    data: result,
  });
});

export const UserController = {
  insertIntoDb,
  getAllFromDb,
  getSingleDataFromDb,
  update,
  deletedData,
};
