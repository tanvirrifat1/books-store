"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRelationalFieldsMapper = exports.orderRelationalFields = exports.orderSearchAbleFields = exports.orderFilterAbleFields = void 0;
exports.orderFilterAbleFields = ['search', 'id', 'status'];
exports.orderSearchAbleFields = ['id', 'status'];
exports.orderRelationalFields = ['userId'];
exports.orderRelationalFieldsMapper = {
    userId: 'user',
};
