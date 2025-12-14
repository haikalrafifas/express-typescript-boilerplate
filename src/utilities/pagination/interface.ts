export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface PaginationInput {
  page: number;
  limit: number;
}
