export type Customer = {
    customerId: number,
    name: string,
};

export type CustomerSearchResult = {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    items: Customer[];
};
