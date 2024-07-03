import { Box, Drawer, Typography, styled, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DrawToggle from '../../components/PrimaryDraw/DrawToggle'
import MuiDrawer from "@mui/material/Drawer"

function PrimaryDraw() {
  const theme = useTheme()
  const below600 = useMediaQuery("(max-width:599px)")
  const [open, setOpen] = useState(!below600)

  const openedMixin = () => ({
    Transition: theme.transitions.create(
      "width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      overflowX : "hidden",
  })

  const closedMixin = () => ({
    Transition: theme.transitions.create(
      "width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      overflowX : "hidden",
      width: theme.primaryDraw.closed,
  })

  const Drawer = styled(MuiDrawer, {})(({ theme, open }) => ({
    width: theme.primaryDraw.width,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(),
      "& .MuiDrawer-paper": openedMixin(),
    }),
    ...(!open && {
      ...closedMixin(),
      "& .MuiDrawer-paper": closedMixin(),
    }),
  }))

  useEffect(() => {
    setOpen(!below600)
  },[below600])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Drawer open={open} variant={ below600 ? "temporary" : "permanent" }
      PaperProps={{
        sx:{mt: `${theme.primaryAppBar.height}px`,
            height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
            width: `${theme.primaryDraw.width}px`,
         }
      }}>
      <Box>
        <Box sx={{position: "absolute", top:0, right: 0, p:0, width: open ? "auto" : "100%"}}>

        <DrawToggle open={open} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} />

        {[...Array(50)].map((_,idx) => (
          <Typography key={idx} paragraph>
              { idx + 1 }
          </Typography>
        ))}
        </Box>
      </Box>
    </Drawer>
  )
}

export default PrimaryDraw