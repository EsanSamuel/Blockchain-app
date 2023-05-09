import React from 'react'
import { Box, CircularProgress } from '@mui/material'

const Loader = () => {
  return (
    <div className='load'>
    <Box sx={{background:'none' }} >
      <CircularProgress sx={{background:'none' }} className='loading' />
      </Box>
    </div>
  )
}

export default Loader