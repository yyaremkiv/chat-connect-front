import { useSelector } from "react-redux";
import { Formik } from "formik";
import { FormConfig } from "configs/Form.config";
import { useTheme } from "@emotion/react";
import { Box, Divider, FormHelperText, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

export const WidgetNewComment = ({ handleAddComment }) => {
  const isLoading = useSelector((state) => state.posts.isLoading);
  const { palette } = useTheme();

  const handleSubmitPost = (values, { resetForm }) => {
    handleAddComment(values.text);
    resetForm();
  };

  return (
    <Formik
      onSubmit={handleSubmitPost}
      initialValues={{ text: "" }}
      validationSchema={FormConfig.commentSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ m: "0.5rem 0 1rem 0" }}>
            <Divider sx={{ mb: "0.75rem" }} />
            <TextField
              multiline
              placeholder="Add New Comment"
              name="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.text}
              error={Boolean(touched.text && errors.text)}
              disabled={isLoading}
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
              }}
            />
            <FormHelperText
              error={Boolean(touched.text && errors.text)}
              sx={{
                visibility: touched.text && errors.text ? "visible" : "hidden",
                height: "0.3rem",
              }}
            >
              {errors.text}
            </FormHelperText>
          </Box>

          <LoadingButton
            type="submit"
            loading={isLoading}
            loadingPosition="start"
            startIcon={<SendIcon />}
            variant="outlined"
            sx={{
              m: "0.25rem auto",
              p: "0.5rem 2rem",
              width: "fit-content",
            }}
          >
            <span>Add comment</span>
          </LoadingButton>
        </form>
      )}
    </Formik>
  );
};
