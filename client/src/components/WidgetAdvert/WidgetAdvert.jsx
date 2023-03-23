import { useState } from "react";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

export const WidgetAdvert = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const [errorImage, setErrorImage] = useState(false);

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={
          errorImage
            ? "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg"
            : `${process.env.REACT_APP_BASE_URL}/assets/info4.jpeg`
        }
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        onError={() => setErrorImage(true)}
        onLoad={() => console.log("donload succes")}
      />
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoligation skin and shining like light
      </Typography>
    </WidgetWrapper>
  );
};
