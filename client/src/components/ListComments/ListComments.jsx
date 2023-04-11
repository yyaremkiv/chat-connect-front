import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "helper/dateFunction.ts";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import DeleteIcon from "@mui/icons-material/Delete";
import PostsOperation from "redux/posts/postsOperations";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";

import Modal from "@mui/material/Modal";

import { ModalCommentEdit } from "components/ModalCommentEdit/ModalCommentEdit";

export const ListComments = ({ comments = [], postId }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { palette } = useTheme();

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => setModalOpen(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [commentCreated, setCommentCreated] = useState(null);
  const [commentText, setCommentText] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteComment = (commentId) => {
    console.log("commentId", commentId);
    dispatch(PostsOperation.deleteComment({ postId, commentId }));
    setAnchorEl(null);
  };

  // const handleEditComment = (created, text) => {
  //   setModalOpen(true);
  //   setCommentCreated(created);
  //   setCommentText(text);
  // };

  return (
    <Box
      mt="0.5rem"
      sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      {comments.map(
        (
          {
            id: commentId,
            author: { _id: userId, firstName, lastName, picturePath },
            created,
            text,
          },
          index
        ) => (
          <Box
            key={commentId}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Box display="flex" gap="0.5rem" alignItems="center" p="0 0.5rem">
                <UserImage image={picturePath} size="40px" />
                <Box>
                  <Typography fontSize="h5">{`${firstName} ${lastName}`}</Typography>
                  <Typography fontSize="0.75rem" color={palette.neutral.medium}>
                    Commented: {formatDate(created)}
                  </Typography>
                </Box>

                {user._id === userId ? (
                  <Box sx={{ ml: "auto" }}>
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
                      <MenuItem onClick={() => handleDeleteComment(commentId)}>
                        <DeleteIcon sx={{ color: palette.neutral.main }} />
                        <Typography sx={{ ml: 1 }}>Delete Comment</Typography>
                      </MenuItem>
                      <MenuItem
                      // onClick={() => handleEditComment(created, text)}
                      >
                        <EditIcon sx={{ color: palette.neutral.main }} />
                        <Typography sx={{ ml: 1 }}>Edit Comment</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : null}
              </Box>
              <Typography
                sx={{
                  color: palette.neutral.main,
                  m: "0.5rem 0 0.5rem 0",
                  p: "0 0.5rem 0.25rem 4rem",
                }}
              >
                {text}
              </Typography>
              {index !== comments.length - 1 ? <Divider /> : null}
            </Box>
          </Box>
        )
      )}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            padding: "1rem",
            maxWidth: "500px",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "0.5rem",
            boxShadow: 24,
          }}
        >
          <ModalCommentEdit
            postId={postId}
            commentCreated={commentCreated}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </Box>
  );
};
