import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "redux/user/userOperations";
import { Box } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { ItemUser } from "components/ItemUser/ItemUser";

export const WidgetAllUsers = ({
  user = null,
  page,
  limit,
  sort,
  handleChangePage,
}) => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers.data);
  const totalCounts = useSelector((state) => state.user.allUsers.totalCounts);
  const isLoading = useSelector((state) => state.user.allUsers.isLoading);

  useEffect(() => {
    dispatch(getAllUsers({ page: 1, limit: 10, sort }));
  }, [dispatch, limit, sort]);

  const handleLoadMore = () => {
    // dispatch(fetchPosts({ page: page + 1, limit, sort, isLoadMore: true }));
    handleChangePage();
  };

  return (
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
  );
};
