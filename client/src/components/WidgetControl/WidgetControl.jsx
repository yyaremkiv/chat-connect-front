import WidgetWrapper from "components/WidgetWrapper";
import { Box, IconButton, useMediaQuery, Typography } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export const WidgetControl = ({
  type,
  page,
  limit,
  sort,
  totalCounts,
  handleChangeType,
  handleChangeLimit,
  handleChangeSort,
}) => {
  const { palette } = useTheme();

  return (
    <WidgetWrapper>
      <Box
        display="flex"
        flexDirection="row-reverse"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" justifyContent="right" gap="1rem" p="0.25rem 0">
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
        <FormControl>
          <Select
            value={limit}
            onChange={handleChangeLimit}
            sx={{
              backgroundColor: palette.neutral.light,
              borderRadius: "0.25rem",
              p: "0rem 0.5rem",
              "& .MuiSvgIcon-root": {
                pr: "0.25rem",
                width: "2rem",
              },
              "& .MuiSelect-select:focus": {
                backgroundColor: palette.neutral.light,
              },
            }}
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
        <IconButton
          onClick={() => {
            const newSorting = sort === "desc" ? "asc" : "desc";
            handleChangeSort(newSorting);
          }}
        >
          {sort === "desc" ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
        </IconButton>
        Sort date:
      </Box>

      {page && limit && totalCounts && (
        <Box display="flex" justifyContent="right" gap="1rem" p="0.5rem 0">
          <Typography color={palette.neutral.main}>
            Posts shown:{" "}
            {page * limit > totalCounts ? totalCounts : page * limit}
          </Typography>
          <Typography color={palette.neutral.main}>
            Total Posts: {totalCounts}
          </Typography>
        </Box>
      )}
    </WidgetWrapper>
  );
};
