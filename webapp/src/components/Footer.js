import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import {  grey, } from '@mui/material/colors';


const Footer = () => {
 

  return (
    <Box 
    sx=
    {{ 
      flexGrow: 1,
      p: 3,
      backgroundColor: grey[200],
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      bottom: 0,
      mt:100,
              
    }} >
      <Typography color={grey[500]}>
        Provided by{' '}
        <Link href="https://appseed.us" target="_blank" underline="none" color={grey[700]}>
          IS-TV
        </Link>
      </Typography>
      <Typography  color={grey[500]}>Grama Check - Your Local Digital Certificate</Typography>
    </Box>
  );
};

export default Footer;