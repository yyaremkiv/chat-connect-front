import Dropzone from "react-dropzone";
import { Box, Typography, useTheme, IconButton, Tooltip } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";

export const DropzoneUpload = ({ image, setImage, handleSend }) => {
  const { palette } = useTheme();

  return (
    <Box>
      <Dropzone
        acceptedFiles=".jpg,.jpeg,.png"
        multiple={false}
        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
      >
        {({ getRootProps, getInputProps }) => (
          <FlexBetween display="flex" gap="1.5rem">
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
                <p>Add or change your avatar here</p>
              ) : (
                <FlexBetween>
                  <Typography>{image.name}</Typography>
                  <Tooltip title="Change the selected photo" placement="top">
                    <IconButton>
                      <EditOutlined />
                    </IconButton>
                  </Tooltip>
                </FlexBetween>
              )}
            </Box>
            <Box>
              {!image ? null : (
                <FlexBetween display="flex" gap="0.5rem">
                  <Tooltip title="Save the selected photo" placement="top">
                    <IconButton onClick={handleSend}>
                      <SaveIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete the selected photo" placement="top">
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ marginLeft: "1rem" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  </Tooltip>
                </FlexBetween>
              )}
            </Box>
          </FlexBetween>
        )}
      </Dropzone>
    </Box>
  );
};
