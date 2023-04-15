import API from "http";

class AuthService {
  static async login(email, password) {
    return API.post("/login", { email, password });
  }

  static async register(values) {
    return API.post("/register", values);
  }

  static async logout() {
    return API.post("/logout");
  }

  static async refresh() {
    return API.get("/refresh", { withCredentials: true });
  }
}

export default AuthService;
