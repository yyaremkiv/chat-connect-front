import API from "http";

class PostsServices {
  static async fetchPosts({ userId, page, limit, sort }) {
    const url = userId ? `/posts/${userId}/posts` : "/posts";
    return API.get(url, {
      params: { page, limit, sort },
    });
  }

  static async createPost({ page, limit, sort, formData }) {
    return API.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      params: { page, limit, sort },
    });
  }

  static async updatePost(formData) {
    return API.patch("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async deletePost({ postId, page, limit, sort }) {
    return API.delete(`/posts/${postId}/delete`, {
      params: { page, limit, sort },
    });
  }

  static async patchLike(postId, userId) {
    return API.patch(`/posts/${postId}/like`, { userId });
  }

  static async fetchComments({ postId, page, limit, sort, isLoadMore }) {
    return API.patch(
      "/posts/comments",
      { postId, isLoadMore },
      { params: { page, limit, sort } }
    );
  }

  static async addComment({ postId, commentText, page, limit, sort }) {
    return API.patch(
      "/posts/comment/add",
      { postId, commentText },
      { params: { page, limit, sort } }
    );
  }

  static async updateComment({ postId, commentId, commentText }) {
    return API.patch("/posts/comment/update", {
      postId,
      commentId,
      commentText,
    });
  }

  static async deleteComment({ postId, commentId, page, limit, sort }) {
    return API.patch(
      "/posts/comment/delete",
      { postId, commentId },
      { params: { page, limit, sort } }
    );
  }
}

export default PostsServices;
