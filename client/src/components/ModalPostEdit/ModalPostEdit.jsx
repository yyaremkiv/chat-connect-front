import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import {
  Box,
  Typography,
  TextField,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PostsOperations from "redux/posts/postsOperations";

export const ModalPostEdit = ({
  postId,
  page = 1,
  limit = 10,
  sort = "desc",
  handleClose,
}) => {
  const [image, setImage] = useState(null);
  const [deleteCurrentPhoto, setDeleteCurrentPhoto] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.posts.posts);
  const currentPost = posts.filter((post) => post._id === postId);
  const [postDescription, setPostDescription] = useState(
    currentPost[0].description
  );
  const { palette } = useTheme();

  const handleChangePost = () => {
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("postId", postId);
    formData.append("description", postDescription);
    formData.append("deletePhoto", deleteCurrentPhoto);

    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    dispatch(PostsOperations.updatePost({ page, limit, sort, formData }));
    setDeleteCurrentPhoto(false);
    handleClose();
  };

  const handleCheckboxChange = (event) => {
    setDeleteCurrentPhoto(event.target.checked);
  };

  return (
    <Box>
      <Typography mb="0.5rem" textAlign="center">
        Change your post
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* SECTION PHOTO - start */}

        {currentPost[0].picturePath ? (
          <Box
            sx={{
              width: "50%",
            }}
          >
            <img
              width="100%"
              height="auto"
              alt="post"
              style={{
                borderRadius: "0.5rem",
                marginTop: "0.75rem",
                backgroundColor: "rgba(0, 0, 0, 0.9)",
              }}
              src={currentPost[0].picturePath}
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={deleteCurrentPhoto}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Delete current photo"
              />
            </FormGroup>
          </Box>
        ) : null}
        {/* SECTION PHOTO - end */}

        <Box sx={{ width: "50%" }}>
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
                    p="0.1rem 1rem"
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
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ marginLeft: "1rem" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        </Box>
      </Box>
      <FlexBetween mt="1.5rem">
        <TextField
          placeholder="What's on your mind..."
          value={postDescription}
          onChange={(e) => setPostDescription(e.target.value)}
          multiline
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
          }}
        />
      </FlexBetween>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <Button
          onClick={handleChangePost}
          sx={{
            backgroundColor: palette.neutral.light,
            fontSize: "1rem",
          }}
        >
          Update Post
        </Button>
      </Box>
    </Box>
  );
};
