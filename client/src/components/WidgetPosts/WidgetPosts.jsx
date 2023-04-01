import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WidgetControl } from "components/WidgetControl/WidgetControl";
import { WidgetPost } from "components/WidgetPost/WidgetPost";
import { WidgetNewPost } from "components/WidgetNewPost/WidgetNewPost";
import { Box } from "@mui/material";
import { fetchPosts } from "redux/posts/postsOperations";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

export const WidgetPosts = ({ userId = null }) => {
  const [type, setType] = useState(localStorage.getItem("type") || "allPosts");
  const [limit, setLimit] = useState(localStorage.getItem("limit") || 10);
  const [sort, setSort] = useState(localStorage.getItem("sortType") || "desc");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.posts.posts);
  const totalCounts = useSelector((state) => state.posts.totalCounts);
  const postsIsLoading = useSelector((state) => state.posts.isLoading);

  const handleChange = (setting, value) => {
    localStorage.setItem(setting, value);
    switch (setting) {
      case "limit":
        setLimit(value);
        break;
      case "type":
        setType(value);
        break;
      case "sortType":
        setSort(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchPosts({ userId, page, limit, sort, isLoadMore: false }));
    } else {
      dispatch(fetchPosts({ page, limit, sort, isLoadMore: false }));
    }
    // eslint-disable-next-line
  }, [dispatch, userId, limit, sort]);

  const handleChangeType = (e) => handleChange("type", e.target.value);
  const handleChangeLimit = (e) => handleChange("limit", e.target.value);
  const handleChangeSort = (sortType) => handleChange("sortType", sortType);

  const handleButtonLoadMorePosts = () => {
    dispatch(fetchPosts({ page: page + 1, limit, sort, isLoadMore: true }));
    setPage(page + 1);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="1.5rem"
      border="1px solid red"
    >
      {true ? (
        <WidgetNewPost
          page={page}
          limit={limit}
          sort={sort}
          picturePath={user.picturePath}
        />
      ) : null}

      <WidgetControl
        type={type}
        page={page}
        limit={limit}
        sort={sort}
        totalCounts={totalCounts}
        handleChangeType={handleChangeType}
        handleChangeLimit={handleChangeLimit}
        handleChangeSort={handleChangeSort}
      />
      {posts?.length > 0 &&
        posts.map((post) => (
          <WidgetPost
            key={post._id}
            post={post}
            page={page}
            limit={limit}
            sort={sort}
          />
        ))}

      {posts.length && page * limit < totalCounts ? (
        <Box display="flex" justifyContent="center" p="1.5rem">
          <LoadingButton
            size="large"
            variant="contained"
            loadingPosition="end"
            endIcon={<SendIcon />}
            loading={postsIsLoading}
            onClick={handleButtonLoadMorePosts}
          >
            <span>Load more posts!</span>
          </LoadingButton>
        </Box>
      ) : null}
    </Box>
  );
};
