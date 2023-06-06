import http from "./httpService";

export function getOTP(phoneNumber) {
  return http
    .post("/user/get-otp", { phoneNumber })
    .then(({ data }) => data.data);
}

export function checkOtp({ phoneNumber, otp }) {
  return http
    .post("/user/check-otp", { phoneNumber, otp })
    .then(({ data }) => data.data);
}

export function completeProfile({ name, email }) {
  return http
    .post("/user/complete-profile", { name, email })
    .then(({ data }) => data.data);
}

export function getUserProfile() {
  return http.get("/user/profile").then(({ data }) => data.data);
}

export function updateUserProfile(data) {
  return http.patch("/user/update", data).then(({ data }) => data.data);
}

export function logoutUser() {
  return http.post("/user/logout");
}
