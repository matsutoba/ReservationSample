export type Facility = {
    id: number,
    name: string,
};

export type FacilitySearchResult = {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    items: Facility[];
};
