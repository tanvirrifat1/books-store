"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRelationalFieldsMapper = exports.BookRelationalFields = exports.BookSearchAbleFields = exports.BookFilterAbleFields = void 0;
exports.BookFilterAbleFields = [
    'search',
    'title',
    'author',
    'genre',
    'publicationDate',
    'categoryId',
    'mixPrice',
    'maxPrice',
];
exports.BookSearchAbleFields = ['title', 'author', 'genre'];
exports.BookRelationalFields = ['category'];
exports.BookRelationalFieldsMapper = {
    category: 'category',
};
