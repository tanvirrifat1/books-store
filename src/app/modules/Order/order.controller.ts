import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { orderFilterAbleFields } from './order.constants';
import { IOrderData } from './order.interface';
import { OrderService } from './order.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (token) {
    const data: IOrderData = req.body;
    const result = await OrderService.insertIntoDb(token, data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  }
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, orderFilterAbleFields);
  const options = pick(req.query, paginationFields);
  const token = req.headers.authorization as string;
  const result = await OrderService.getOrders(filters, options, token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;

  const { orderId } = req.params;

  const result = await OrderService.getOrderById(orderId, token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single Order successfully',
    data: result,
  });
});

export const OrderController = {
  insertIntoDb,
  getAllOrders,
  getSingleOrder,
};
