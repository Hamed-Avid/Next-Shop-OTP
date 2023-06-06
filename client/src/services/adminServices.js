import http from "./httpService";

export function addNewCategory(data) {
  return http.post("/admin/category/add", data).then(({ data }) => data.data);
}

export function updateCategory({ id, data }) {
  return http
    .patch(`/admin/category/update/${id}`, data)
    .then(({ data }) => data.data);
}

export function removeCategory(id) {
  return http
    .delete(`/admin/category/remove/${id}`)
    .then(({ data }) => data.data);
}

export function addNewProduct(data) {
  return http.post("/admin/product/add", data).then(({ data }) => data.data);
}

export function updateProduct({ id, data }) {
  return http
    .patch(`/admin/product/update/${id}`, data)
    .then(({ data }) => data.data);
}

export function removeProduct(id) {
  return http
    .delete(`/admin/product/remove/${id}`)
    .then(({ data }) => data.data);
}

export function getAllUsers() {
  return http.get("/admin/user/list").then(({ data }) => data.data);
}

export function getUserById(userId) {
  return http
    .get(`/admin/user/profile/${userId}`)
    .then(({ data }) => data.data);
}

export function getAllPayments() {
  return http.get("/admin/payment/list").then(({ data }) => data.data);
}

export function getPaymentById(id) {
  return http.get(`/admin/payment/${id}`).then(({ data }) => data.data);
}

export function getAllCoupons() {
  return http.get("/admin/coupon/list").then(({ data }) => data.data);
}

export function addNewCoupon(data) {
  return http.post("/admin/coupon/add", data).then(({ data }) => data.data);
}

export function getCouponById(id) {
  return http.get(`/admin/coupon/${id}`).then(({ data }) => data.data);
}

export function updateCoupon({ id, data }) {
  return http
    .patch(`/admin/coupon/update/${id}`, data)
    .then(({data}) => data.data);
}

export function removeCoupon(id) {
  return http
    .delete(`/admin/coupon/remove/${id}`)
    .then(({ data }) => data.data);
}
