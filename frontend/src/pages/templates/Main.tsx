import { Box, Typography, useTheme } from "@mui/material"

const Main = () => {

    const theme = useTheme()

    return (
        <Box sx={{
            flexGrow: 1,
            mt: `${theme.primaryAppBar.height}px`,
            height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
            overflow: 'hidden'
        }}>
            {[...Array(50)].map((_,idx) => (
                <Typography key={idx} paragraph>
                    { idx + 1 }
                </Typography>
            ))}
        </Box>
    )
}

export default Main