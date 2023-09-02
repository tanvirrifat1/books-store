export const BookFilterAbleFields = [
  'search',
  'title',
  'author',
  'genre',
  'publicationDate',
  'categoryId',
  'mixPrice',
  'maxPrice',
];

export const BookSearchAbleFields = ['title', 'author', 'genre'];

export const BookRelationalFields: string[] = ['category'];

export const BookRelationalFieldsMapper: { [key: string]: string } = {
  category: 'category',
};
