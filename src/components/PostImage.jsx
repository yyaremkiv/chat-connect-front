import { useState } from "react";
import { Box, Skeleton } from "@mui/material";

const PostImage = ({ picturePath }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleImageLoaded = () => setIsLoading(false);

  const handleImageError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
      minWidth="10rem"
      height="auto"
    >
      <img
        style={{
          borderRadius: "0.5rem",
          objectFit: "cover",
          opacity: isLoading ? 0 : 1,
        }}
        width="100%"
        height="auto"
        alt="post"
        src={picturePath}
        onLoad={handleImageLoaded}
        onError={handleImageError}
      />

      {isLoading && (
        <Box position="absolute">
          <Skeleton
            variant="circular"
            width="100%"
            height="100%"
            animation="wave"
          />
        </Box>
      )}

      {error && (
        <Box position="absolute">
          <Skeleton
            variant="circular"
            width="100%"
            height="auto"
            animation="wave"
          />
        </Box>
      )}
    </Box>
  );
};

export default PostImage;
