import myRequest from "../index";

export function getEstatesData(page: number = 1, pageSize: number = 10) {
  return myRequest.get("/api/estates", {
    page: page,
    pageSize: pageSize,
  });
}
