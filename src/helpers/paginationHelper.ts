type IOptions = {
  page?: number;
  sortBy?: string;
  sortOrder?: string;
  size?: number;
};

type IOptionsResult = {
  page: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
  size: number;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
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

export const paginationHelpers = {
  calculatePagination,
};
