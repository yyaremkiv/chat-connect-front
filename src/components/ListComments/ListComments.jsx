import { Box, Divider } from "@mui/material";
import { ItemComment } from "components/ItemComment/ItemComment";
import { useTheme } from "@emotion/react";
import { TransitionGroup } from "react-transition-group";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";

export const ListComments = ({
  comments = [],
  handleEditComment,
  handleDeleteComment,
}) => {
  const { palette } = useTheme();

  return (
    <Box
      mt="0.5rem"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        p: "0.75rem 0.5rem",
        backgroundColor: palette.neutral.light,
        borderRadius: "0.5rem",
      }}
    >
      <List>
        <TransitionGroup>
          {comments.map((comment, index) => (
            <Collapse key={comment.id}>
              <ItemComment
                comment={comment}
                handleDeleteComment={handleDeleteComment}
                handleEditComment={handleEditComment}
              />
              {index !== comments.length - 1 ? <Divider /> : null}
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </Box>
  );
};
