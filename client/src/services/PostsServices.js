import API from "http";

class PostsServices {
  static async fetchPosts(userId, page, limit, sort) {
    const url = userId
      ? `/posts/${userId}/posts?page=${page}&limit=${limit}&sort=${sort}`
      : `/posts?page=${page}&limit=${limit}&sort=${sort}`;
    return API.get(url);
  }

  static async createPost(page, limit, sort, formData) {
    return API.post(
      `/posts?page=${page}&limit=${limit}&sort=${sort}`,
      formData
    );
  }

  static async updatePost(page, limit, sort, formData) {
    return API.patch(
      `/posts?page=${page}&limit=${limit}&sort=${sort}`,
      formData
    );
  }

  static async deletePost(postId, page, limit, sort) {
    return API.delete(
      `/posts/${postId}/delete?page=${page}&limit=${limit}&sort=${sort}`
    );
  }

  static async addComment(postId, text) {
    return API.patch(`/posts/${postId}/comment`, {
      text,
    });
  }

  static async deleteComment(postId, commentId) {
    return API.patch(`/posts/${postId}/comment/delete`, {
      commentId,
    });
  }

  static async patchLike(postId, userId) {
    return API.patch(`/posts/${postId}/like`, { userId });
  }
}

export default PostsServices;
