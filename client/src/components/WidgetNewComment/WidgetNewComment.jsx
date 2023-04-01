import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "redux/posts/postsOperations";
import { useTheme } from "@emotion/react";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

export const WidgetNewComment = ({ postId }) => {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.posts.isLoading);
  const { palette } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.length) return;
    dispatch(addComment({ postId, text: commentText }));
    setCommentText("");
  };

  const handleChangeInput = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <TextField
        placeholder="Your comment"
        fullWidth={true}
        value={commentText}
        onChange={handleChangeInput}
        multiline
        disabled={isLoading}
        sx={{
          backgroundColor: palette.neutral.light,
        }}
      />
      <LoadingButton
        type="submit"
        endIcon={<SendIcon />}
        loading={isLoading}
        disabled={isLoading}
        loadingPosition="center"
        sx={{
          color: palette.background.alt,
          backgroundColor: palette.primary.main,
          borderRadius: "0.5rem",
          padding: "0.5rem 4rem",
          fontSize: "0.75rem",
          "&:hover": {
            backgroundColor: palette.primary.dark,
          },
          "&:focus": {
            backgroundColor: palette.primary.dark,
          },
        }}
      >
        <span>{isLoading ? "Send comment" : "Send"}</span>
      </LoadingButton>
    </form>
  );
};
