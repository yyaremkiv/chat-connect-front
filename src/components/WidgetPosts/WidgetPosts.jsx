import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { WidgetNewPost } from "components/WidgetNewPost/WidgetNewPost";
import { ModalPostEdit } from "components/ModalPostEdit/ModalPostEdit";
import { ItemPost } from "components/ItemPost/ItemPost";
import { useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { TransitionGroup } from "react-transition-group";
import {
  Box,
  Button,
  List,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PostsOperation from "redux/posts/postsOperations";

export const WidgetPosts = ({ user = null, addNewPost = true }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(localStorage.getItem("limit") || 10);
  const [sort, setSort] = useState(localStorage.getItem("sortType") || "desc");
  const [postId, setPostId] = useState(null);
  const [open, setOpen] = useState(false);
  const { userId } = useParams();
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const totalCounts = useSelector((state) => state.posts.totalCounts);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const currentUserId = user ? user : userId;

  useEffect(() => {
    if (currentUserId) {
      dispatch(
        PostsOperation.fetchPosts({
          userId: currentUserId,
          page,
          limit,
          sort,
          isLoadMore: false,
        })
      );
    } else {
      dispatch(
        PostsOperation.fetchPosts({ page, limit, sort, isLoadMore: false })
      );
    }
    // eslint-disable-next-line
  }, [dispatch, userId, limit, sort]);

  const handleChange = (setting, value) => {
    localStorage.setItem(setting, value);
    switch (setting) {
      case "limit":
        setPage(1);
        setLimit(value);
        break;
      case "sortType":
        setSort(value);
        break;
      default:
        break;
    }
  };

  const handleLoadMore = () => {
    dispatch(
      PostsOperation.fetchPosts({
        page: page + 1,
        limit,
        sort,
        isLoadMore: true,
      })
    );
    setPage(page + 1);
  };

  const handleChangeLimit = (e) => handleChange("limit", e.target.value);
  const handleChangeSort = (sortType) => handleChange("sortType", sortType);
  const handleClose = () => setOpen(false);

  const handleEditPost = (postId) => {
    setOpen(true);
    setPostId(postId);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {addNewPost && <WidgetNewPost page={page} limit={limit} sort={sort} />}

      <Box
        sx={{
          p: "0.75rem 1rem",
          backgroundColor: palette.background.alt,
          borderRadius: "0.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            gap: "1rem",
            pb: "0.5rem",
          }}
        >
          <Typography variant="h6" sx={{ color: palette.neutral.main }}>
            Posts shown:{" "}
            {page * limit > totalCounts ? totalCounts : page * limit}
          </Typography>
          <Typography variant="h6" sx={{ color: palette.neutral.main }}>
            Total Posts: {totalCounts}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="text"
            onClick={() => handleChangeSort(sort === "desc" ? "asc" : "desc")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.85rem",
              color: palette.neutral.main,
            }}
          >
            {sort === "desc" ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
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

      {posts.length > 0 ? (
        <List>
          <TransitionGroup
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {posts.map((post) => (
              <Collapse key={post._id}>
                <ItemPost
                  post={post}
                  page={page}
                  limit={limit}
                  sort={sort}
                  handleEditPost={handleEditPost}
                />
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      ) : null}

      {posts?.length > 0 && page * limit < totalCounts ? (
        <Box sx={{ display: "flex", justifyContent: "center", pb: "1.5rem" }}>
          <LoadingButton
            size="large"
            variant="text"
            loadingPosition="start"
            startIcon={<RefreshIcon />}
            loading={isLoading}
            onClick={handleLoadMore}
            sx={{ p: "0.75rem 2rem", fontSize: "0.8rem", color: "inherit" }}
          >
            <span>Load more posts!</span>
          </LoadingButton>
        </Box>
      ) : null}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            padding: "1.5rem",
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
          <ModalPostEdit postId={postId} handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};
