import { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { formatDate } from "helper/dateFunction.ts";
import UserImage from "components/UserImage";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const ItemComment = ({
  comment,
  handleDeleteComment,
  handleEditComment,
}) => {
  const {
    id: commentId,
    author: { firstName, lastName, picturePath },
    created,
    updated,
    text,
  } = comment;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { palette } = useTheme();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleDelete = (commentId) => {
    handleDeleteComment(commentId);
    handleClose();
  };

  const handleEdit = (commentId) => {
    handleEditComment(commentId);
    handleClose();
  };

  return (
    <Box
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
            {created !== updated ? (
              <Typography fontSize="0.75rem" color={palette.neutral.medium}>
                Last Updated: {formatDate(updated)}
              </Typography>
            ) : null}
          </Box>

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
              <MenuItem onClick={() => handleDelete(commentId)}>
                <DeleteIcon sx={{ color: palette.neutral.main }} />
                <Typography sx={{ ml: 1 }}>Delete Comment</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleEdit(commentId)}>
                <EditIcon sx={{ color: palette.neutral.main }} />
                <Typography sx={{ ml: 1 }}>Edit Comment</Typography>
              </MenuItem>
            </Menu>
          </Box>
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
      </Box>
    </Box>
  );
};
