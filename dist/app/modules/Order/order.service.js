"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const order_constants_1 = require("./order.constants");
const insertIntoDb = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user not found');
    }
    if (!data.userId) {
        data.userId = user.userId;
    }
    const result = yield prisma_1.prisma.order.create({
        data,
    });
    return result;
});
const getOrders = (filters, options, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user not found');
    }
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search } = filters, filterData = __rest(filters, ["search"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: order_constants_1.orderSearchAbleFields.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (order_constants_1.orderRelationalFields.includes(key)) {
                    return {
                        [order_constants_1.orderRelationalFieldsMapper[key]]: {
                            id: filterData[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    if (user.role === 'admin') {
        const result = yield prisma_1.prisma.order.findMany({
            where: whereConditions,
            skip,
            take: size,
            orderBy: options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                    createdAt: 'desc',
                },
            include: {
                user: true,
            },
        });
        const total = yield prisma_1.prisma.order.count({
            where: whereConditions,
        });
        const subtotal = yield prisma_1.prisma.order.count();
        const totalPage = Math.ceil(subtotal / size);
        return {
            meta: {
                total,
                page,
                size,
                totalPage,
            },
            data: result,
        };
    }
    else if (user.role === 'customer') {
        const result = yield prisma_1.prisma.order.findMany({
            where: { userId: user.userId },
        });
        const total = yield prisma_1.prisma.order.count({
            where: { userId: user.userId },
        });
        const subtotal = yield prisma_1.prisma.order.count();
        const totalPage = Math.ceil(subtotal / size);
        return {
            meta: {
                total,
                page,
                size,
                totalPage,
            },
            data: result,
        };
    }
    const total = yield prisma_1.prisma.order.count({});
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            total,
            page,
            size,
            totalPage,
        },
        data: null,
    };
});
const getOrderById = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user not found');
    }
    if (id && user.role === 'admin') {
        const result = yield prisma_1.prisma.order.findUnique({
            where: { id },
        });
        return result;
    }
    else if (id && user.role === 'customer') {
        const result = yield prisma_1.prisma.order.findUnique({
            where: { id, userId: user.userId },
        });
        return result;
    }
    return null;
});
exports.OrderService = { insertIntoDb, getOrders, getOrderById };
