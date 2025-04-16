import myRequest from "../index";

interface QueryParams {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  saleStatus?: string;
  page?: number;
  pageSize?: number;
}

export function getSearchEstatesData(query: QueryParams) {
  return myRequest.get("/api/estates/search", {
    ...query,
  });
}
