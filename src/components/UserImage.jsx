import { useState } from "react";
import { Box } from "@mui/system";
import { Skeleton } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
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
      width={size}
      height={size}
    >
      <img
        style={{
          objectFit: "cover",
          borderRadius: "50%",
          opacity: isLoading ? 0 : 1,
        }}
        width={size}
        height={size}
        alt="user"
        src={image}
        onLoad={handleImageLoaded}
        onError={handleImageError}
      />

      {isLoading && (
        <Box position="absolute">
          <Skeleton
            variant="circular"
            width={size}
            height={size}
            animation="wave"
          />
        </Box>
      )}

      {error && (
        <Box position="absolute">
          <Skeleton
            variant="circular"
            width={size}
            height={size}
            animation="wave"
          />
        </Box>
      )}
    </Box>
  );
};

export default UserImage;
