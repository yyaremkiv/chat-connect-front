import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import { WidgetNewComment } from "components/WidgetNewComment/WidgetNewComment";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserImage from "components/UserImage";

import { patchLike } from "redux/posts/postsOperations";

import { deletePost } from "redux/posts/postsOperations";
import { deleteComment } from "redux/posts/postsOperations";

function formatDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formattedDate.replace(/\//g, ".");
}

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.auth.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const handlePatchLike = () => {
    dispatch(patchLike({ postId, loggedInUserId }));
  };

  const handleDeleteComment = (postId, text) => {
    dispatch(deleteComment({ postId, text }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {/* New funcion - start */}
      <IconButton onClick={() => dispatch(deletePost(postId))}>
        <DeleteIcon />
      </IconButton>
      {/* New funcion - end */}
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={picturePath}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={handlePatchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {/* Comments - start */}
      {isComments && (
        <Box
          mt="0.5rem"
          sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {comments.map(
            ({ picturePath, firstName, lastName, text, create }, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Divider />
                <UserImage image={userPicturePath} size="40px" />
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography fontSize="h5">{`${firstName} ${lastName}`}</Typography>
                    <Typography>{formatDate(create)}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Typography
                      sx={{ color: main, m: "0.5rem 0", pl: "0.5rem" }}
                    >
                      {text}
                    </Typography>
                    <IconButton
                      onClick={() => handleDeleteComment(postId, text)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Divider />
                </Box>
              </Box>
            )
          )}
          <Divider />
        </Box>
      )}
      {/* Comments - end */}
      <Box sx={{ marginTop: "1rem" }}>
        <WidgetNewComment postId={postId} />
      </Box>
    </WidgetWrapper>
  );
};

export default PostWidget;
