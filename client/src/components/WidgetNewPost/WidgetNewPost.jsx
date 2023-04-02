import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "redux/posts/postsOperations";
import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  TextField,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";

export const WidgetNewPost = ({ page, limit, sort }) => {
  const [post, setPost] = useState("");
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { palette } = useTheme();

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    dispatch(createNewPost({ page, limit, sort, formData }));
    setImage(null);
    setIsImage(false);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <Typography mb="0.5rem">Add New Post!</Typography>
      <FlexBetween gap="1.5rem">
        <UserImage image={user.picturePath} />
        <TextField
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          multiline
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${palette.neutral.medium}`}
          borderRadius="0.5rem"
          mt="1rem"
          p="0.75rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  borderRadius="0.5rem"
                  p="0.25rem 1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <IconButton>
                        <EditOutlined />
                      </IconButton>
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ marginLeft: "1rem" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: palette.neutral.mediumMain }} />
          <Typography
            color={palette.neutral.mediumMain}
            sx={{
              "&:hover": { cursor: "pointer", color: palette.neutral.medium },
            }}
          >
            Image
          </Typography>
        </FlexBetween>

        <Button disabled={!post} onClick={handlePost}>
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};
