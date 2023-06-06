import http from "./httpService";

export function getCategories() {
  return http.get("/category/list").then(({ data }) => data.data);
}

export function getCategoryById(id) {
  return http.get(`/category/${id}`).then(({ data }) => data.data);
}


