import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { WidgetNewComment } from "components/WidgetNewComment/WidgetNewComment";
import { ListComments } from "components/ListComments/ListComments";
import { Box } from "@mui/material";
import PostsOperations from "redux/posts/postsOperations";
import Modal from "@mui/material/Modal";
import { ModalCommentEdit } from "components/ModalCommentEdit/ModalCommentEdit";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Pagination from "@mui/material/Pagination";
import { Button, Typography, useTheme } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export const SectionComments = ({
  postId,
  comments,
  totalComments,
  showNewComment = false,
  showListComments = false,
}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(localStorage.getItem("commentLimit") || 5);
  const [sort, setSort] = useState(
    localStorage.getItem("commentSortType") || "desc"
  );
  const dispatch = useDispatch();
  const { palette } = useTheme();

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => setModalOpen(false);
  const [commentId, setcommentId] = useState(null);

  const isLoading = useSelector((state) => state.posts.isLoading);

  const handleCloseModal = () => {
    setModalOpen(!modalOpen);
  };

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

  const handleChangeSort = (sortType) => {
    handleChange("commentSortType", sortType);
  };

  const handleChangeLimit = (e) => {
    const value = e.target.value;
    handleChange("commentLimit", value);
  };

  const handleEditComment = (commentId) => {
    setcommentId(commentId);
    setModalOpen(true);
  };

  const handleDeleteComment = (commentId) => {
    dispatch(
      PostsOperations.deleteComment({ postId, commentId, page, limit, sort })
    );
  };

  const handleAddComment = (text) => {
    dispatch(
      PostsOperations.addComment({
        postId,
        text,
        page,
        limit,
        sort,
      })
    );
  };

  const handleUpdatePost = (text) => {
    dispatch(
      PostsOperations.updateComment({
        postId,
        commentId,
        text,
        page,
        limit,
        sort,
      })
    );
  };

  return (
    <Box sx={{ border: "1px solid red" }}>
      {showNewComment ? (
        <WidgetNewComment postId={postId} handleAddComment={handleAddComment} />
      ) : null}

      {showListComments ? (
        <Box>
          <Box sx={{ border: "1px solid red", p: "1rem" }}>
            <Box display="flex" justifyContent="right" gap="1rem" p="0.5rem 0">
              <Typography color={palette.neutral.main}>
                Comments shown: {comments.length}
                {/* {page * limit > totalCounts ? totalCounts : page * limit} */}
              </Typography>
              <Typography color={palette.neutral.main}>
                Total Comments: {totalComments}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Button
                onClick={() =>
                  handleChangeSort(sort === "desc" ? "asc" : "desc")
                }
              >
                {sort === "desc" ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                <Typography ml="0.5rem">Date</Typography>
              </Button>
              <Box display="flex" alignItems="center" gap="1rem">
                <Typography>Display post count: </Typography>
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
        <Box display="flex" justifyContent="center" p="0.5rem">
          <LoadingButton
            size="large"
            variant="contained"
            loadingPosition="end"
            endIcon={<SendIcon />}
            loading={isLoading}
            onClick={handleLoadMore}
          >
            <span>Load more comments!</span>
          </LoadingButton>
        </Box>
      ) : null}

      {showListComments && comments.length < totalComments ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: "0.5rem" }}>
          <Pagination
            count={Math.ceil(totalComments / limit)}
            page={page}
            onChange={handleChangePage}
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
            maxWidth: "500px",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "0.5rem",
            boxShadow: 24,
          }}
        >
          <ModalCommentEdit
            postId={postId}
            commentId={commentId}
            handleClose={handleCloseModal}
            handleUpdatePost={handleUpdatePost}
          />
        </Box>
      </Modal>
    </Box>
  );
};
