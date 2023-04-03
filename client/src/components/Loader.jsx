import { Box } from "@mui/material";
import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  bgcolor: "red",
  zIndex: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
  backgroundColor: theme.palette.background.alt,
}));

// eslint-disable-next-line
export default function () {
  return (
    <Loader>
      <CircularProgress size="small" />
    </Loader>
  );
}
