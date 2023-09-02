export const orderFilterAbleFields = ['search', 'id', 'status'];

export const orderSearchAbleFields = ['id', 'status'];

export const orderRelationalFields: string[] = ['userId'];

export const orderRelationalFieldsMapper: { [key: string]: string } = {
  userId: 'user',
};
