import { useTheme } from "@emotion/react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import ExploreCategories from "../../components/SecondaryDraw/ExploreCategories";

const PrimaryAppBar = () => {
  const [sideMenu, setSideMenu] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (isSmallScreen && sideMenu) setSideMenu(false);
  }, [isSmallScreen]);

  const toggleDrawer = (open: boolean) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();
      setSideMenu(open);
      console.log("====> hello", sideMenu);
    };
  };
  const list = () => (
    <Box
      sx={{ paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200 }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <ExploreCategories />
    </Box>
  );

  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: theme.primaryAppBar.height,
          minHeight: theme.primaryAppBar.height,
        }}
      >
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        {/* open={sideMenu} onClose={() => toggleDrawer(false)} */}
        <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>

        <Link href="/" underline="none" color="inherit">
          <Typography
            varient="h6"
            noWrap
            component="div"
            sx={{
              display: { fontWeight: 700, letterSpacing: "-0.5px" },
            }}
          >
            Home
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryAppBar;
