import http from "./httpService";

export function getProducts(query, cookies) {
  return http
    .get(`/product/list?${query}`, {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
}

export function getProductBySlug(slug) {
  return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
}

export function likeProduct(productId) {
  return http.post(`/product/like/${productId}`).then(({ data }) => data.data);
}

export function getProductById(productId) {
  return http.get(`/product/${productId}`).then(({ data }) => data.data);
}
