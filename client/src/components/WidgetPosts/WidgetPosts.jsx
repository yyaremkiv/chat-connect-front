import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, IconButton, Typography } from "@mui/material";
import { fetchPosts } from "redux/posts/postsOperations";
import { ItemPost } from "components/ItemPost/ItemPost";
import { useParams } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

import WidgetWrapper from "components/WidgetWrapper";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useTheme } from "@emotion/react";

import { WidgetNewPost } from "components/WidgetNewPost/WidgetNewPost";

export const WidgetPosts = ({ user = null }) => {
  const [type, setType] = useState(localStorage.getItem("type") || "allPosts");
  const posts = useSelector((state) => state.posts.posts);
  const totalCounts = useSelector((state) => state.posts.totalCounts);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const dispatch = useDispatch();
  const { userId } = useParams();

  const currentUserId = user ? user : userId;

  const [limit, setLimit] = useState(localStorage.getItem("limit") || 10);
  const [sort, setSort] = useState(localStorage.getItem("sortType") || "desc");
  const [page, setPage] = useState(1);

  const { palette } = useTheme();

  useEffect(() => {
    if (currentUserId) {
      dispatch(
        fetchPosts({
          userId: currentUserId,
          page,
          limit,
          sort,
          isLoadMore: false,
        })
      );
    } else {
      dispatch(fetchPosts({ page, limit, sort, isLoadMore: false }));
    }
    // eslint-disable-next-line
  }, [dispatch, userId, limit, sort]);

  const handleLoadMore = () => {
    dispatch(fetchPosts({ page: page + 1, limit, sort, isLoadMore: true }));
    setPage(page + 1);
  };

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

  const handleChangeType = (e) => handleChange("type", e.target.value);
  const handleChangeLimit = (e) => handleChange("limit", e.target.value);
  const handleChangeSort = (sortType) => handleChange("sortType", sortType);

  // const handleChangePage = () => {
  //   setPage(page + 1);
  // };

  return (
    <Box display="flex" flexDirection="column" gap="1.5rem">
      <WidgetNewPost page={page} limit={limit} sort={sort} />
      <WidgetWrapper>
        <Box
          display="flex"
          flexDirection="row-reverse"
          justifyContent="space-between"
          alignItems="center"
        >
          <FormControl>
            <Select
              value={limit}
              onChange={handleChangeLimit}
              sx={{
                backgroundColor: palette.neutral.light,
                borderRadius: "0.25rem",
                p: "0rem 0.5rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "2rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: palette.neutral.light,
                },
              }}
            >
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </FormControl>
          <IconButton
            onClick={() => {
              const newSorting = sort === "desc" ? "asc" : "desc";
              handleChangeSort(newSorting);
            }}
          >
            {sort === "desc" ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
          </IconButton>
          Sort date:
        </Box>

        {page && limit && totalCounts && (
          <Box display="flex" justifyContent="right" gap="1rem" p="0.5rem 0">
            <Typography color={palette.neutral.main}>
              {type === "allPosts" ? "Posts shown: " : "Users shown: "}
              {page * limit > totalCounts ? totalCounts : page * limit}
            </Typography>
            <Typography color={palette.neutral.main}>
              {type === "allPosts"
                ? `Total Posts: ${totalCounts}`
                : `Total Users: ${totalCounts - 1}`}
            </Typography>
          </Box>
        )}
      </WidgetWrapper>

      {posts.length > 0 ? (
        <Box display="flex" flexDirection="column" gap="1.5rem">
          {posts.map((post) => (
            <ItemPost
              key={post._id}
              post={post}
              page={page}
              limit={limit}
              sort={sort}
            />
          ))}
        </Box>
      ) : null}

      {posts.length > 0 && page * limit < totalCounts ? (
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
    </Box>
  );
};
