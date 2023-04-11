import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ItemUser } from "components/ItemUser/ItemUser";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import WidgetWrapper from "components/WidgetWrapper";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Select from "@mui/material/Select";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MenuItem from "@mui/material/MenuItem";

import UserOperations from "redux/user/userOperations";

export const WidgetAllUsers = ({ user = null }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(localStorage.getItem("limit") || 10);
  const [sort, setSort] = useState(localStorage.getItem("sortType") || "desc");
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers.data);
  const totalCounts = useSelector((state) => state.user.allUsers.totalCounts);
  const isLoading = useSelector((state) => state.user.allUsers.isLoading);
  const error = useSelector((state) => state.user.allUsers.error);
  const { palette } = useTheme();

  useEffect(() => {
    dispatch(
      UserOperations.getAllUsers({ page, limit, sort, isLoadMore: false })
    );
    // eslint-disable-next-line
  }, [dispatch, limit, sort]);

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
      UserOperations.getAllUsers({
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
      {allUsers.length > 0 && !isLoading && !error ? (
        <>
          <Box
            p="0.5rem 1rem"
            backgroundColor={palette.background.alt}
            borderRadius="0.5rem"
          >
            <Box display="flex" justifyContent="right" gap="1rem" p="0.5rem 0">
              <Typography color={palette.neutral.main}>
                Users shown:{" "}
                {page * limit > totalCounts ? totalCounts : page * limit}
              </Typography>
              <Typography color={palette.neutral.main}>
                Total Users: {totalCounts}
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
                <Typography>Display Users count: </Typography>
                <Select size="small" value={limit} onChange={handleChangeLimit}>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                </Select>
              </Box>
            </Box>
          </Box>

          <WidgetWrapper>
            <Box display="flex" flexDirection="column" gap="1rem">
              {allUsers?.map((user, index) => (
                <ItemUser key={index} user={user} />
              ))}
            </Box>

            {allUsers?.length && page * limit < totalCounts ? (
              <Box display="flex" justifyContent="center" p="1.5rem">
                <LoadingButton
                  size="large"
                  variant="contained"
                  loadingPosition="end"
                  endIcon={<SendIcon />}
                  loading={isLoading}
                  onClick={handleLoadMore}
                >
                  <span>Load more users!</span>
                </LoadingButton>
              </Box>
            ) : null}
          </WidgetWrapper>
        </>
      ) : (
        <Box>
          {error && (
            <Typography variant="body1" color="error">
              Loading error. Please try again later.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
