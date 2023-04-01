import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "helper/dateFunction.ts";
import { deleteComment } from "redux/posts/postsOperations";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import DeleteIcon from "@mui/icons-material/Delete";

export const ListComments = ({ comments = [], postId }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { palette } = useTheme();

  const handleDeleteComment = (postId, created) => {
    dispatch(deleteComment({ postId, created }));
  };

  return (
    <Box
      mt="0.5rem"
      sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      {comments.map(
        (
          {
            author: { _id: userID, firstName, lastName, picturePath },
            created,
            text,
          },
          index
        ) => (
          <Box
            key={`${index}-${firstName}`}
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
                {user._id === userID ? (
                  <IconButton
                    onClick={() => handleDeleteComment(postId, created)}
                    sx={{ marginLeft: "auto" }}
                  >
                    <DeleteIcon />
                  </IconButton>
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
    </Box>
  );
};
