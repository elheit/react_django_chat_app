import { Box, Typography, useTheme } from "@mui/material"

import axios from 'axios'
import useAxiosWithInterceptor from "../../helpers/jwtinterceptor"


const SecondaryDraw = () => {

  // axios.get('http://localhost:8000/api/server/select/').then(response => {
  //   console.log("===========< response.data", response.data)
  // }).catch(err => {console.log("=======> err ", err)})

  const jwtAxios = useAxiosWithInterceptor()
  // now using the custom inteceptor 
  jwtAxios.get('http://localhost:8000/api/server/select/').then(response => {
    console.log("===========< response.data", response.data)
  }).catch(err => {console.log("=======> err ", err)})


      
  const theme = useTheme()

  return (
  <Box sx={{
      mt: `${theme.primaryAppBar.height}px`,
      minWidth: `${theme.secondaryDraw.width}px`,
      height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
      borderRight: `1px solid ${theme.palette.divider}`,
      display: { xs: "none", sm: "block" },
      overflow: "auto",
  }}>
      {[...Array(50)].map((_,idx) => (
        <Typography key={idx} paragraph>
            { idx + 1 }
        </Typography>
      ))}
  </Box>
  )
}

export default SecondaryDraw