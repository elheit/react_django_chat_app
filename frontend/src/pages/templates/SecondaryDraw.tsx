import { Box, Typography, useTheme } from "@mui/material";

import React from "react";

type SecondaeyDrawProps = {
  children: React.ReactNode;
};

const SecondaryDraw = ({ children }: SecondaeyDrawProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: `${theme.primaryAppBar.height}px`,
        minWidth: `${theme.secondaryDraw.width}px`,
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: { xs: "none", sm: "block" },
        overflow: "auto",
      }}
    >
      {children}
    </Box>
  );
};

export default SecondaryDraw;
