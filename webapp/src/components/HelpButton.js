import React from 'react';
import { Button } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router-dom';

const HelpButton= () => {
    const navigate = useNavigate();
    
    const handleHelpBtnClick = () => {
        console.log("here");
        navigate(`/help`); 
      };

    return (
        <div>
        {/* Your other content */}
        <Button
            variant="contained"
            color="primary"
            style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: '1000', 
            borderRadius:"50px",
            height:"3vw",
            width:"7vw",
            backgroundColor:'black',     

            }}

            onClick={handleHelpBtnClick}
        >
            <HelpOutlineIcon  sx={{mr:1}}/>
            Help
        </Button>
        </div>
    );
    };

export default HelpButton;
