import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";

export const ModalCommentEdit = ({ postId, commentCreated, handleClose }) => {
  const { palette } = useTheme();

  return (
    <Box>
      <FlexBetween mt="1.5rem">
        <TextField
          placeholder="What's on your mind..."
          // value={text}
          // onChange={(e) => setText(e.target.value)}
          multiline
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
          }}
        />
      </FlexBetween>
      <Button
        // onClick={handleChangePost}
        sx={{
          backgroundColor: palette.neutral.light,
          fontSize: "1rem",
        }}
      >
        Update Post
      </Button>
    </Box>
  );
};
