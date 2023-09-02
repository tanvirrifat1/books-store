import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const myProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const user = req.user as any;

  const result = await ProfileService.myProfile(token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'my profile retrieved successfully',
    data: result,
  });
});

export const ProfileController = { myProfile };
