import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "helper/dateFunction.ts";
import { SectionComments } from "components/SectionComments/SectionComments";
import { useTheme } from "@emotion/react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  PersonAddOutlined,
  PersonRemoveOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCommentIcon from "@mui/icons-material/AddComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import UserOperations from "redux/user/userOperations";
import PostsOperation from "redux/posts/postsOperations";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";

export const ItemPost = ({ post, page, limit, sort, handleEditPost }) => {
  const {
    _id: postId,
    author,
    likes,
    createdAt: created,
    updatedAt: updated,
    description,
    picturePath,
    comments,
    commentsCount,
  } = post;
  const [isComments, setIsComments] = useState(false);
  const [addCommentShow, setAddCommentShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const isLiked = Boolean(likes[user._id]);
  const likeCount = Object.keys(likes).length;
  const dispatch = useDispatch();
  const authUserFrinends = useSelector((state) => state.user.friends.authUser);
  const { palette } = useTheme();
  const open = Boolean(anchorEl);
  const isFriend = authUserFrinends?.find(
    ({ friendId }) => friendId._id === author._id
  );

  const handlePatchLike = () =>
    dispatch(PostsOperation.patchLike({ postId, userId: user._id }));

  const handlePatchFriend = () =>
    dispatch(
      UserOperations.addRemoveUserFriend({
        userId: user._id,
        friendId: author._id,
      })
    );

  const handleDeletePost = () => {
    dispatch(PostsOperation.deletePost({ postId, page, limit, sort }));
    setAnchorEl(null);
  };

  const handleShowAddCommentWidget = () => setAddCommentShow(!addCommentShow);
  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleEdit = (postId) => {
    handleEditPost(postId);
    setAnchorEl(null);
  };

  return (
    <WidgetWrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Friend
          friend={author}
          dataCreated={formatDate(created)}
          dataUpdated={created === updated ? null : formatDate(updated)}
          showList={false}
        />

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
        ) : (
          <Box>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleDeletePost}>
                <DeleteIcon sx={{ color: palette.neutral.main }} />{" "}
                <Typography sx={{ ml: 1 }}>Delete Post</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleEdit(postId)}>
                <EditIcon sx={{ color: palette.neutral.main }} />
                <Typography sx={{ ml: 1 }}>Edit Post</Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Box>
      <Typography variant="h5" color={palette.neutral.main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>

      {picturePath && (
        <img
          src={picturePath}
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.5rem", marginTop: "0.75rem" }}
        />
      )}
      <FlexBetween sx={{ mt: "0.25rem" }}>
        <FlexBetween sx={{ gap: "1rem" }}>
          <FlexBetween sx={{ gap: "0.3rem" }}>
            <IconButton onClick={handlePatchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: palette.primary.main }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween sx={{ gap: "0.3rem" }}>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{commentsCount}</Typography>
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

      <SectionComments
        postId={postId}
        comments={comments}
        totalComments={commentsCount}
        showNewComment={addCommentShow}
        showListComments={isComments && commentsCount > 0}
      />
    </WidgetWrapper>
  );
};
