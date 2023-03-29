import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUserPosts } from "redux/posts/postsOperations";
import { WidgetPost } from "components/WidgetPost/WidgetPost";

export const WidgetPosts = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    if (isProfile) {
      dispatch(getUserPosts(userId));
    } else {
      dispatch(getPosts());
    }
  }, [dispatch, isProfile, userId]);

  return (
    <>
      {posts?.length > 0 &&
        posts.map((post) => <WidgetPost key={post._id} post={post} />)}
    </>
  );
};
