import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropzoneUpload } from "components/DropzoneUpload";
import { ImageOutlined } from "@mui/icons-material";
import * as Yup from "yup";
import {
  Divider,
  Typography,
  TextField,
  useTheme,
  Button,
} from "@mui/material";
import PostsOperation from "redux/posts/postsOperations";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import PostAddIcon from "@mui/icons-material/PostAdd";

const validationSchema = Yup.object().shape({
  text: Yup.string().required("This field is required"),
});

export const WidgetNewPost = ({ page, limit, sort }) => {
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user.data);
  const { palette } = useTheme();

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("description", text);
    if (image) formData.append("picture", image);

    dispatch(PostsOperation.createPost({ page, limit, sort, formData }));
    setImage(null);
    setIsImage(false);
    setText("");
  };

  const handleChange = (e) => setText(e.target.value);

  const handleBlur = async () => {
    try {
      await validationSchema.validate({ text });
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <WidgetWrapper>
      <Typography sx={{ mb: "0.25rem", textAlign: "right" }}>
        Hello, Add New Post
      </Typography>
      <FlexBetween sx={{ display: "flex", gap: "1rem", mb: "1rem" }}>
        <UserImage image={user.picturePath} />
        <TextField
          multiline
          placeholder="What's on your mind..."
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          error={error}
          helperText={error && "This field cannot be empty"}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
          }}
        />
      </FlexBetween>

      {isImage && <DropzoneUpload image={image} setImage={setImage} />}

      <Divider sx={{ m: "1rem 0" }} />

      <FlexBetween>
        <Button
          variant="text"
          onClick={() => setIsImage(!isImage)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.8rem",
            color: palette.neutral.main,
          }}
        >
          <ImageOutlined sx={{ color: palette.neutral.main }} />
          IMAGE
        </Button>

        <Button
          variant="text"
          onClick={handlePost}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.8rem",
            color: palette.neutral.main,
          }}
        >
          <PostAddIcon sx={{ color: palette.neutral.main }} />
          ADD POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};
