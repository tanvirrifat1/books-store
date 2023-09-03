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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = require("../../../shared/prisma");
const insertIntoDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.create({
        data,
    });
    return result;
});
const getAllFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.findMany();
    return result;
});
const getSingleDataFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.findUnique({
        where: { id },
    });
    return result;
});
const deletedData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.delete({
        where: { id },
    });
    return result;
});
const updateData = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.update({
        where: { id },
        data: payload,
    });
    return result;
});
exports.UserService = {
    insertIntoDb,
    getAllFromDb,
    getSingleDataFromDb,
    updateData,
    deletedData,
};
