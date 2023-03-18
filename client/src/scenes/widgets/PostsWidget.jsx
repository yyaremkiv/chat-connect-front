import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUserPosts } from "redux/posts/postsOperations";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
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
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
    </>
  );
};

export default PostsWidget;
