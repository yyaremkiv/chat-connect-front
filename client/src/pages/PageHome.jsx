import { useState } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "components/Navbar/Navbar";
import { WidgetUser } from "components/WidgetUser/WidgetUser";
import { WidgetGeneral } from "components/WidgetGeneral/WidgetGeneral";
import { WidgetAdvert } from "components/WidgetAdvert/WidgetAdvert";
import { WidgetFriendList } from "components/WidgetFriendList/WidgetFriendList";
import { Box, useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { Divider, TextField, useTheme, IconButton } from "@mui/material";

import { ModalPostEdit } from "components/ModalPostEdit/ModalPostEdit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
};

export const PageHome = () => {
  const user = useSelector((state) => state.auth.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [post, setPost] = useState("");
  const { palette } = useTheme();

  const [postId, setPostId] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditPost = (postId) => {
    setOpen(true);
    setPostId(postId);
  };

  return (
    <>
      {user._id && (
        <Box>
          <Navbar />
          <Box
            display="flex"
            flexDirection={isNonMobileScreens ? "row" : "column"}
            gap="1.5rem"
            padding="1.5rem 5%"
          >
            <Box flexBasis={isNonMobileScreens ? "25%" : "100%"}>
              <WidgetUser />
            </Box>

            <Box flexBasis={isNonMobileScreens ? "45%" : "100%"}>
              <WidgetGeneral
                controlCategory={true}
                addNewPost={true}
                handleEditPost={handleEditPost}
              />
            </Box>

            {isNonMobileScreens && (
              <Box
                display="flex"
                flexDirection="column"
                gap="1.5rem"
                flexBasis="30%"
              >
                <WidgetAdvert />
                <WidgetFriendList />
              </Box>
            )}
          </Box>
        </Box>
      )}
      <div>
        {/* Modal window - start */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ModalPostEdit postId={postId} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "1rem",
              }}
            >
              <Button
                sx={{
                  backgroundColor: palette.neutral.light,
                  fontSize: "1rem",
                }}
              >
                Change
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
      {/* Modal window - end */}
    </>
  );
};
