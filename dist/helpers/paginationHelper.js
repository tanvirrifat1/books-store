"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelpers = void 0;
const calculatePagination = (options) => {
    const page = Number(options.page || 1);
    const size = Number(options.size || 10);
    const skip = (page - 1) * size;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    // const size = options.size;
    return {
        page,
        skip,
        sortBy,
        sortOrder,
        size,
    };
};
exports.paginationHelpers = {
    calculatePagination,
};
