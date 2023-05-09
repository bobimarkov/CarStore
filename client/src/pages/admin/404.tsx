import { Box, Typography } from '@mui/material'
import React from 'react'

const NotFound: React.FC = () => {
  return (
        <Box width='100%' display='flex' alignItems='center' justifyContent='center'>
            <Typography variant="h1">404 Not Found</Typography>
        </Box>
  )
}

export default NotFound
