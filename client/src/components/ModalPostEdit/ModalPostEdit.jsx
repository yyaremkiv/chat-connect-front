import { useState } from "react";
import { useSelector } from "react-redux";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import {
  Box,
  Divider,
  Typography,
  TextField,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
} from "@mui/icons-material";

export const ModalPostEdit = ({ postId }) => {
  const posts = useSelector((state) => state.posts.posts);
  const currentPosts = posts.filter((post) => post._id === postId);
  const [description, setDescription] = useState(currentPosts[0].description);
  const { palette } = useTheme();

  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  console.log(currentPosts);

  return (
    <Box>
      <Typography mb="0.5rem" textAlign="right">
        Hello, Add New Post!
      </Typography>
      <Box sx={{ width: "50%" }}>
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.5rem", marginTop: "0.75rem" }}
          src={currentPosts[0].picturePath}
        />
        <Box>
          {/* {isImage && ( */}
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
          {/* )} */}
        </Box>
      </Box>
      <FlexBetween gap="1.5rem">
        <TextField
          placeholder="What's on your mind..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
          }}
        />
      </FlexBetween>
    </Box>
  );
};
