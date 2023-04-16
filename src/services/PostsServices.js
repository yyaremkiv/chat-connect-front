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

  static async updatePost(formData) {
    return API.patch("/posts", formData);
  }

  static async deletePost(postId, page, limit, sort) {
    return API.delete(
      `/posts/${postId}/delete?page=${page}&limit=${limit}&sort=${sort}`
    );
  }

  static async patchLike(postId, userId) {
    return API.patch(`/posts/${postId}/like`, { userId });
  }

  static async fetchComments({ postId, page, limit, sort, isLoadMore }) {
    return API.patch(
      `/posts/comments?page=${page}&limit=${limit}&sort=${sort}`,
      { postId, isLoadMore }
    );
  }

  static async addComment({ postId, commentText, page, limit, sort }) {
    return API.patch(
      `/posts/comment/add?page=${page}&limit=${limit}&sort=${sort}`,
      { postId, commentText }
    );
  }

  static async updateComment({ postId, commentId, commentText }) {
    return API.patch(`/posts/comment/update`, {
      postId,
      commentId,
      commentText,
    });
  }

  static async deleteComment({ postId, commentId, page, limit, sort }) {
    return API.patch(
      `/posts/comment/delete?page=${page}&limit=${limit}&sort=${sort}`,
      { postId, commentId }
    );
  }
}

export default PostsServices;
