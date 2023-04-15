import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ItemUser } from "components/ItemUser/ItemUser";
import { TransitionGroup } from "react-transition-group";
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
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";

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

  const handleChangeLimit = (e) => handleChange("limit", e.target.value);
  const handleChangeSort = (sortType) => handleChange("sortType", sortType);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {allUsers.length > 0 && !isLoading && !error ? (
        <>
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
                Users shown:{" "}
                {page * limit > totalCounts ? totalCounts : page * limit}
              </Typography>
              <Typography variant="h6" sx={{ color: palette.neutral.main }}>
                Total Users: {totalCounts}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                  Display Users count:{" "}
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

          <WidgetWrapper>
            <List>
              <TransitionGroup
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {allUsers?.map((user) => (
                  <Collapse key={user._id}>
                    <ItemUser user={user} />
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>

            {allUsers?.length && page * limit < totalCounts ? (
              <Box
                sx={{ display: "flex", justifyContent: "center", p: "1.5rem" }}
              >
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
