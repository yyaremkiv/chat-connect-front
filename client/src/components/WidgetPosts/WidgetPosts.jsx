import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { WidgetNewPost } from "components/WidgetNewPost/WidgetNewPost";
import { ModalPostEdit } from "components/ModalPostEdit/ModalPostEdit";
import { ItemPost } from "components/ItemPost/ItemPost";
import { useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PostsOperation from "redux/posts/postsOperations";
import Modal from "@mui/material/Modal";

export const WidgetPosts = ({ user = null, addNewPost = true }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(localStorage.getItem("limit") || 10);
  const [sort, setSort] = useState(localStorage.getItem("sortType") || "desc");
  const [postId, setPostId] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const totalCounts = useSelector((state) => state.posts.totalCounts);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const { userId } = useParams();
  const currentUserId = user ? user : userId;
  const { palette } = useTheme();

  const handleClose = () => setOpen(false);

  const handleEditPost = (postId) => {
    setOpen(true);
    setPostId(postId);
  };

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

  const handleChangeLimit = (e) => handleChange("limit", e.target.value);
  const handleChangeSort = (sortType) => handleChange("sortType", sortType);
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

  return (
    <Box display="flex" flexDirection="column" gap="1.5rem">
      {addNewPost && <WidgetNewPost page={page} limit={limit} sort={sort} />}

      <Box
        p="0.5rem 1rem"
        backgroundColor={palette.background.alt}
        borderRadius="0.5rem"
      >
        <Box display="flex" justifyContent="right" gap="1rem" p="0.5rem 0">
          <Typography color={palette.neutral.main}>
            Posts shown:{" "}
            {page * limit > totalCounts ? totalCounts : page * limit}
          </Typography>
          <Typography color={palette.neutral.main}>
            Total Posts: {totalCounts}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Button
            onClick={() => handleChangeSort(sort === "desc" ? "asc" : "desc")}
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

      {posts.length > 0 ? (
        <Box display="flex" flexDirection="column" gap="1.5rem">
          {posts.map((post) => (
            <ItemPost
              key={post._id}
              post={post}
              page={page}
              limit={limit}
              sort={sort}
              handleEditPost={handleEditPost}
            />
          ))}
        </Box>
      ) : null}

      {posts?.length > 0 && page * limit < totalCounts ? (
        <Box display="flex" justifyContent="center" p="1.5rem">
          <LoadingButton
            size="large"
            variant="contained"
            loadingPosition="end"
            endIcon={<SendIcon />}
            loading={isLoading}
            onClick={handleLoadMore}
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
            padding: "1rem",
            maxWidth: "500px",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "0.5rem",
            boxShadow: 24,
          }}
        >
          <ModalPostEdit postId={postId} handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};
