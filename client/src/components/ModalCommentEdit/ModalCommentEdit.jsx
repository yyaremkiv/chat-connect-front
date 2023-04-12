import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, TextField, useTheme, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";

export const ModalCommentEdit = ({
  postId,
  commentId,
  handleClose,
  handleUpdatePost,
}) => {
  const { palette } = useTheme();
  const { posts } = useSelector((state) => state.posts);

  const post = posts.find((post) => post._id === postId);
  const comment = post?.comments?.find((comment) => comment.id === commentId);
  const [text, setText] = useState(comment?.text || "");

  const handleSubmit = () => {
    handleUpdatePost(text);
    handleClose();
  };

  return (
    <Box>
      Update this comment:
      <FlexBetween mt="1.5rem">
        <TextField
          placeholder="What's on your mind..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
          }}
        />
      </FlexBetween>
      <Button
        onClick={handleSubmit}
        sx={{
          backgroundColor: palette.neutral.light,
          fontSize: "1rem",
        }}
      >
        Update Comment
      </Button>
    </Box>
  );
};
