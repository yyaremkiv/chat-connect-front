import { Link, Typography, Box, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

export const WidgetAdvert = () => {
  const { palette } = useTheme();

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={palette.neutral.dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
      </FlexBetween>
      <img
        src="../assets/building.jpg"
        width="100%"
        height="auto"
        alt="advert"
        style={{ borderRadius: "0.5rem", margin: "0.75rem 0" }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <Typography color={palette.neutral.main}>IntergalBud</Typography>
        <Link
          href="https://intergal-bud.com.ua/"
          color={palette.neutral.medium}
          underline="hover"
        >
          https://intergal-bud.com.ua
        </Link>
      </Box>
      <Typography
        color={palette.neutral.medium}
        sx={{ m: "0.75rem 0 0.5rem 0" }}
      >
        A reliable partner in the construction of commercial and residential
        buildings. A full range of services from design to construction. Our
        team of professionals guarantees quality and adherence to deadlines.
        Contact us to realize your project!
      </Typography>
    </WidgetWrapper>
  );
};
