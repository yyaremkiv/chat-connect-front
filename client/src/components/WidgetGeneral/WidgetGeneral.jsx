import { useState } from "react";
import { WidgetPosts } from "components/WidgetPosts/WidgetPosts";
import { WidgetAllUsers } from "components/WidgerAllUsers/WidgetAllUsers";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

export const WidgetGeneral = ({
  controlCategory = true,
  addNewPost = false,
  handleEditPost,
}) => {
  const [type, setType] = useState(localStorage.getItem("type") || "allPosts");
  const { palette } = useTheme();

  const handleChange = (setting, value) => {
    localStorage.setItem(setting, value);
    switch (setting) {
      case "type":
        setType(value);
        break;
      default:
        break;
    }
  };

  const handleChangeType = (e) => handleChange("type", e.target.value);

  return (
    <Box display="flex" flexDirection="column">
      {controlCategory ? (
        <Box
          display="flex"
          justifyContent="right"
          p="0.5rem"
          mb="1.5rem"
          bgcolor={palette.background.alt}
          borderRadius="0.5rem"
        >
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={type}
            onChange={handleChangeType}
          >
            <FormControlLabel
              value="allUsers"
              control={<Radio />}
              label="All Users"
            />
            <FormControlLabel
              value="allPosts"
              control={<Radio />}
              label="All Posts"
            />
          </RadioGroup>
        </Box>
      ) : null}

      {type === "allUsers" && controlCategory ? (
        <WidgetAllUsers />
      ) : (
        <WidgetPosts addNewPost={addNewPost} handleEditPost={handleEditPost} />
      )}
    </Box>
  );
};
