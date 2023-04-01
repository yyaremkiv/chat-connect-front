import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "redux/user/userOperations";
import WidgetWrapper from "components/WidgetWrapper";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import Friend from "components/Friend";

export const WidgetAllUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allUsers = useSelector((state) => state.user.allUsers.data);
  const { palette } = useTheme();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <WidgetWrapper>
      <Box display="flex" flexDirection="column" gap="1rem">
        {allUsers.map((friend, index) => (
          <Box key={index} display="flex" gap="1rem">
            <Friend friend={friend} showList={true} hideAdmin={true} />
          </Box>
        ))}
      </Box>
    </WidgetWrapper>
  );
};
