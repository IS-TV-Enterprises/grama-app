import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "@asgardeo/auth-react";
import form from "../Assets/people.jpg";
import {  grey, orange } from "@mui/material/colors";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const MasterHome = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {
    state,
    signIn,
    signOut,
    getBasicUserInfo,
    getIDToken,
    getDecodedIDToken,
    getAccessToken,
    on,
  } = useAuthContext();

  if (loading) {
    const status = <div>Loading...</div>;
  }

  if (error || !role) {
    const status = <div>Invalid Role</div>;
  }

  useEffect(() => {
    getBasicUserInfo()
      .then((basicUserDetails) => {
        console.log(basicUserDetails);
        console.log("username = " + basicUserDetails.username);
        console.log("groups = " + basicUserDetails.groups);
        setRole(basicUserDetails.groups[0]);
      })
      .catch((error) => {
        // Handle the error
      });
  });

  useEffect(() => {
    getAccessToken()
      .then((accessToken) => {
        console.log(accessToken);
      })
      .catch((error) => {
        //console.log(error);
      });
  });

  getDecodedIDToken()
    .then((decodedIDToken) => {
      console.log(decodedIDToken);
    })
    .catch((error) => {
      // Handle the error
    });

  console.log(role);

  if (state.isAuthenticated) {
    if (!role) {
      return <div><Box sx={{
        marginTop: 0,
        m: 1,
        mb:6,
        p: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: orange[50],
        borderRadius: "18px",
        backgroundImage: `url(${form})`, // Set the background image
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // Cover the entire container without cropping
        maxWidth: '100%', 
        height: '90vh', 
        justifyContent: "space-between",
        
     }}>
       <Typography variant="h3" component="h3" 
       sx={{
         mt:13,
         fontFamily: 'Whisper',
         color: orange[800],
         
       }}
     > Welcome to Grama App</Typography>
    
    <Button
                variant="contained"
                type="submit"
                onClick={() => navigate("/gramaCertificate")}
                sx={{
                  ml: 8,
                  width: "15vw",
                  height: "3vw",
                  bottom: 0,
                  backgroundColor: orange[500],

                  fontSize: "1.2rem",
                  "&:hover": {
                    backgroundColor: orange[600],
                  },
                }}
              >
                {" "}
                Submit a request
              </Button>

     </Box>
     
     </div>;
    }

    if (role === "Grama_Niladhari") {
      navigate("/gramaNilHome");
    } else {
      navigate("/gramaCertificate");
    }
  } else {
    return (
      // give me a div with a button circular progress and the title loading in an orange color text
      
      <Box sx={{
        marginTop: 0,
        m: 1,
        mb:6,
        p: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: orange[50],
        borderRadius: "18px",
        backgroundImage: `url(${form})`, // Set the background image
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // Cover the entire container without cropping
        maxWidth: '100%', 
        height: '90vh', 
        justifyContent: "space-between",
        
     }}>
       <CircularProgress />
     </Box>
    );
  }
  // Return null if navigate is used to prevent rendering anything here
};

export default MasterHome;
