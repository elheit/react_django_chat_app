import { Box, Typography, useTheme } from "@mui/material";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Main: React.FC<Props> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        mt: `${theme.primaryAppBar.height}px`,
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
};

export default Main;
