import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRemoveUserFriend } from "redux/user/userOperations";
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
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCommentIcon from "@mui/icons-material/AddComment";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";

const options = ["None", "Atria", "Callisto", "Dione"];

const ITEM_HEIGHT = 48;

export const ItemPost = ({ post, page, limit, sort, handleEditPost }) => {
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handlePatchLike = () =>
    dispatch(patchLike({ postId, userId: user._id }));

  const handlePatchFriend = () =>
    dispatch(addRemoveUserFriend({ userId: user._id, friendId: author._id }));

  const handleShowAddCommentWidget = () => setAddCommentShow(!addCommentShow);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeletePost = () => {
    dispatch(deletePost({ postId, page, limit, sort }));
    setAnchorEl(null);
  };

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
        <Friend friend={author} date={formatDate(created)} showList={false} />

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

        {/* {user._id === author._id ? (
          <IconButton onClick={handleDeletePost}>
            <EditIcon />
          </IconButton>
        ) : null} */}

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
