import API from "http";

class UserServices {
  static async getUser(userId) {
    return API.get(`/user/${userId}`);
  }

  static async getAllUsers({ page, limit, sort }) {
    return API.get("/user/list", {
      params: { page, limit, sort },
    });
  }

  static async updateUser(values) {
    return API.patch("/user/update", values);
  }

  static async getUserFriends(userId) {
    return API.get(`/user/${userId}/friends`);
  }

  static async addRemoveUserFriend({ userId, friendId }) {
    return API.patch(`/user/${userId}/${friendId}`);
  }

  static async changeAvatarUser(formData) {
    return API.patch("/user/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}

export default UserServices;
