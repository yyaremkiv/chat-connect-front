import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { WidgetNewComment } from "components/WidgetNewComment/WidgetNewComment";
import { ListComments } from "components/ListComments/ListComments";
import { ModalCommentEdit } from "components/ModalCommentEdit/ModalCommentEdit";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Modal,
  Pagination,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PostsOperations from "redux/posts/postsOperations";

export const SectionComments = ({
  postId,
  comments,
  totalComments,
  showNewComment = false,
  showListComments = false,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [commentId, setcommentId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(localStorage.getItem("commentLimit") || 5);
  const [sort, setSort] = useState(
    localStorage.getItem("commentSortType") || "desc"
  );
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.posts.isLoading);
  const { palette } = useTheme();

  useEffect(() => {
    if (showListComments) {
      dispatch(
        PostsOperations.fetchComments({
          postId,
          page,
          limit,
          sort,
          isLoadMore: false,
        })
      );
    }
    // eslint-disable-next-line
  }, [dispatch, showListComments, postId, limit, sort]);

  const handleLoadMore = () => {
    dispatch(
      PostsOperations.fetchComments({
        postId,
        page: page + 1,
        limit,
        sort,
        isLoadMore: true,
      })
    );
    setPage(page + 1);
  };

  const handleChangePage = (_, value) => {
    dispatch(
      PostsOperations.fetchComments({
        postId,
        page: value,
        limit,
        sort,
        isLoadMore: false,
      })
    );
    setPage(value);
  };

  const handleDeleteComment = (commentId) => {
    dispatch(
      PostsOperations.deleteComment({ postId, commentId, page, limit, sort })
    );
  };

  const handleAddComment = (commentText) => {
    dispatch(
      PostsOperations.addComment({
        postId,
        commentText,
        page,
        limit,
        sort,
      })
    );
  };

  const handleUpdateComment = (commentText) => {
    dispatch(
      PostsOperations.updateComment({
        postId,
        commentId,
        commentText,
      })
    );
  };

  const handleChange = (setting, value) => {
    localStorage.setItem(setting, value);
    switch (setting) {
      case "commentLimit":
        setPage(1);
        setLimit(value);
        break;
      case "commentSortType":
        setSort(value);
        break;
      default:
        break;
    }
  };
  const handleChangeSort = (sortType) =>
    handleChange("commentSortType", sortType);
  const handleModalClose = () => setModalOpen(false);

  const handleChangeLimit = (e) => {
    const value = e.target.value;
    handleChange("commentLimit", value);
  };

  const handleEditComment = (commentId) => {
    setcommentId(commentId);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(!modalOpen);

  return (
    <Box>
      {showNewComment ? (
        <WidgetNewComment handleAddComment={handleAddComment} />
      ) : null}

      {showListComments ? (
        <Box>
          <Divider sx={{ m: "0.5rem 0" }} />

          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                gap: "1rem",
                p: "0.5rem 0",
              }}
            >
              <Typography variant="h6" sx={{ color: palette.neutral.main }}>
                Comments shown: {comments.length}
              </Typography>
              <Typography variant="h6" sx={{ color: palette.neutral.main }}>
                Total Comments: {totalComments}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: "1rem",
              }}
            >
              <Button
                variant="text"
                onClick={() =>
                  handleChangeSort(sort === "desc" ? "asc" : "desc")
                }
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.85rem",
                  color: palette.neutral.main,
                }}
              >
                {sort === "desc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                <Typography variant="h5">Sort Date</Typography>
              </Button>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Typography variant="h5" sx={{ color: palette.neutral.main }}>
                  Display post count:{" "}
                </Typography>
                <Select size="small" value={limit} onChange={handleChangeLimit}>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                </Select>
              </Box>
            </Box>
          </Box>

          <ListComments
            comments={comments}
            handleEditComment={handleEditComment}
            handleDeleteComment={handleDeleteComment}
          />
        </Box>
      ) : null}

      {comments.length < totalComments &&
      showListComments &&
      Math.ceil(totalComments / limit) > page ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: "0.75rem" }}>
          <LoadingButton
            variant="text"
            loadingPosition="start"
            startIcon={<RefreshIcon />}
            loading={isLoading}
            onClick={handleLoadMore}
            sx={{ p: "0.75rem 2rem", fontSize: "0.8rem", color: "inherit" }}
          >
            <span>Load more comments!</span>
          </LoadingButton>
        </Box>
      ) : null}

      {showListComments && comments.length < totalComments ? (
        <Box sx={{ display: "flex", justifyContent: "center", pt: "0.5rem" }}>
          <Pagination
            count={Math.ceil(totalComments / limit)}
            page={page}
            onChange={handleChangePage}
            disabled={isLoading}
          />
        </Box>
      ) : null}

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
            maxWidth: {
              xs: "90vw",
              sm: "80vw",
              md: "60vw",
              lg: "50vw",
              xl: "40vw",
            },
            width: "100%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "0.5rem",
            boxShadow: 24,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <ModalCommentEdit
            postId={postId}
            commentId={commentId}
            handleClose={handleCloseModal}
            handleUpdateComment={handleUpdateComment}
          />
        </Box>
      </Modal>
    </Box>
  );
};
