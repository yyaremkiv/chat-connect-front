import { Box, Divider } from "@mui/material";
import { ItemComment } from "components/ItemComment/ItemComment";

export const ListComments = ({
  comments = [],
  handleEditComment,
  handleDeleteComment,
}) => {
  return (
    <Box
      mt="0.5rem"
      sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      {comments.map((comment, index) => (
        <Box key={comment.id}>
          <ItemComment
            comment={comment}
            handleDeleteComment={handleDeleteComment}
            handleEditComment={handleEditComment}
          />
          {index !== comments.length - 1 ? <Divider /> : null}
        </Box>
      ))}
    </Box>
  );
};
