import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { WidgetNewComment } from "components/WidgetNewComment/WidgetNewComment";
import { patchLike } from "redux/posts/postsOperations";
import { deletePost } from "redux/posts/postsOperations";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { formatDate } from "helper/dateFunction.ts";
import { ListComments } from "components/ListComments/ListComments";
import { addRemoveUserFriend } from "redux/user/userOperations";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCommentIcon from "@mui/icons-material/AddComment";

export const WidgetPost = ({ post, page, limit, sort }) => {
  const {
    _id: postId,
    author,
    likes,
    createdAt: created,
    description,
    picturePath,
    comments,
  } = post;
  const [isComments, setIsComments] = useState(false);
  const [addCommentShow, setAddCommentShow] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const isLiked = Boolean(likes[user._id]);
  const likeCount = Object.keys(likes).length;
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.user.friends.data);
  const isFriend = friends?.find(({ friendId }) => friendId._id === author._id);
  const { palette } = useTheme();

  const handlePatchLike = () =>
    dispatch(patchLike({ postId, userId: user._id }));

  const handlePatchFriend = () =>
    dispatch(addRemoveUserFriend({ userId: user._id, friendId: author._id }));

  const handleShowAddCommentWidget = () => setAddCommentShow(!addCommentShow);

  const handleDeletePost = () =>
    dispatch(deletePost({ postId, page, limit, sort }));

  return (
    <WidgetWrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Friend friend={author} date={formatDate(created)} showList={false} />

        {user._id === author._id ? (
          <IconButton onClick={handleDeletePost}>
            <DeleteIcon />
          </IconButton>
        ) : null}

        {user._id !== author._id ? (
          isFriend ? (
            <IconButton
              onClick={() => handlePatchFriend()}
              sx={{ backgroundColor: palette.primary.light, p: "0.6rem" }}
            >
              <PersonRemoveOutlined sx={{ color: palette.primary.dark }} />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => handlePatchFriend()}
              sx={{ backgroundColor: palette.primary.light, p: "0.6rem" }}
            >
              <PersonAddOutlined sx={{ color: palette.primary.dark }} />
            </IconButton>
          )
        ) : null}
      </Box>
      <Typography color={palette.neutral.main} sx={{ mt: "1rem" }}>
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
                <FavoriteOutlined sx={{ color: palette.primary.main }} />
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

      {isComments && comments.length ? (
        <ListComments comments={comments} postId={postId} />
      ) : null}

      {addCommentShow ? (
        <Box sx={{ marginTop: "1rem" }}>
          <WidgetNewComment postId={postId} />
        </Box>
      ) : null}
    </WidgetWrapper>
  );
};
