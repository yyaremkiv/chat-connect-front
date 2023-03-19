import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, InputBase } from "@mui/material";
import { useTheme } from "@emotion/react";

import { addComment } from "redux/posts/postsOperations";

export const WidgetNewComment = ({ postId }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const { palette } = useTheme();
  const userId = useSelector((state) => state.auth.user._id);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ postId, userId, text: commentText }));
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
      <InputBase
        placeholder="Your comment"
        fullWidth={true}
        value={commentText}
        onChange={handleChangeInput}
        sx={{
          backgroundColor: palette.neutral.light,
          borderRadius: "2rem",
          padding: "0.5rem 1rem",
        }}
      />
      <Button
        sx={{
          color: palette.background.alt,
          backgroundColor: palette.primary.main,
          borderRadius: "2rem",
          "&:hover": {
            backgroundColor: palette.primary.dark,
          },
          "&:focus": {
            backgroundColor: palette.primary.dark,
          },
        }}
        type="sumbit"
      >
        Send comment
      </Button>
    </form>
  );
};
