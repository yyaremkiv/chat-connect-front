import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import { WidgetNewComment } from "components/WidgetNewComment/WidgetNewComment";
import WidgetWrapper from "components/WidgetWrapper";
import DeleteIcon from "@mui/icons-material/Delete";
import { patchLike } from "redux/posts/postsOperations";
import { deletePost } from "redux/posts/postsOperations";

import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import AddCommentIcon from "@mui/icons-material/AddComment";

import { formatDate } from "helper/dateFunction";
import { patchFriend } from "redux/posts/postsOperations";
import { ListComments } from "components/ListComments/ListComments";

export const WidgetPost = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  created,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [addCommentShow, setAddCommentShow] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.auth.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;

  const friends = useSelector((state) => state.posts.friends.data);
  const isFriend = friends.find((friend) => friend._id === postUserId);

  const handlePatchLike = () => {
    dispatch(patchLike({ postId, loggedInUserId }));
  };

  const handlePatchFriend = () => {
    dispatch(patchFriend({ userId: user._id, postUserId }));
  };

  const handleShowAddCommentWidget = () => {
    setAddCommentShow(!addCommentShow);
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
          date={formatDate(created)}
          showFriendList={false}
        />

        {user._id === postUserId ? (
          <IconButton onClick={() => dispatch(deletePost(postId))}>
            <DeleteIcon />
          </IconButton>
        ) : null}

        {user._id !== postUserId ? (
          isFriend ? (
            <IconButton
              onClick={() => handlePatchFriend()}
              sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
              <PersonRemoveOutlined sx={{ color: primaryDark }} />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => handlePatchFriend()}
              sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
              <PersonAddOutlined sx={{ color: primaryDark }} />
            </IconButton>
          )
        ) : null}
      </Box>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>

      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.5rem", marginTop: "0.75rem" }}
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

        <FlexBetween>
          <Button
            startIcon={<AddCommentIcon />}
            onClick={handleShowAddCommentWidget}
          >
            Add comment
          </Button>
        </FlexBetween>
      </FlexBetween>

      {/* List comments - start */}
      {isComments && comments.length ? (
        <ListComments comments={comments} postId={postId} />
      ) : null}
      {/* List comments - end */}

      {/* Widget add new comment - start */}
      {addCommentShow ? (
        <Box sx={{ marginTop: "1rem" }}>
          <WidgetNewComment postId={postId} />
        </Box>
      ) : null}
      {/* Widget add new comment - end */}
    </WidgetWrapper>
  );
};
