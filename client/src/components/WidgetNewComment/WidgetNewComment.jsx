import { useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

export const WidgetNewComment = ({ postId, handleAddComment }) => {
  const [commentText, setCommentText] = useState("");
  const isLoading = useSelector((state) => state.posts.isLoading);
  const { palette } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.length) return;
    handleAddComment(commentText);
    setCommentText("");
  };

  const handleChangeInput = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginBottom: "1.5rem",
      }}
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
