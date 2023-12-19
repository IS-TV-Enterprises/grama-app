import * as React from "react";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {  grey, orange } from "@mui/material/colors";
import HelpButton from "../components/HelpButton";
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
} from "@mui/material";
import form from "../Assets/people.jpg";



const defaultTheme = createTheme();


export default function GramaCertificate() {
  const [gramaDivision, setgramaDivision] = useState('');
  const [reports,setReports] = useState('Hello');

  const postData = {
    "division_id": 1,
    "NIC": "19879956432",
    "address": "Main Street,Apt 4"
  }

  const handleSubmit = (event) => {
    //event.preventDefault();
    console.log("handle submit called");
    fetch(`http://localhost:9030/grama-certificate/addCertificateRequest`, {
    method: "POST",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json', // Specify content type as JSON
      
    },
    body: JSON.stringify(postData)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response)
      return response.json(); // Convert response to JSON
    })
    .then((data) => {
      // Handle the JSON data here
      console.log(data);
      setReports(data)
    })
    .catch((error) => {
      // Handle errors here
      console.error('There was a problem with the fetch operation:', error);
    });

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xl">
        <Box sx={{
           marginTop: 0,
           m: 1,
           mb:6,
           p: 0,
           display: "flex",
           flexDirection: "column",
           alignItems: "center",
           backgroundColor: orange[50],
           borderRadius: "18px",
           backgroundImage: `url(${form})`, // Set the background image
           backgroundRepeat: "no-repeat",
           backgroundSize: "cover", // Cover the entire container without cropping
           maxWidth: '100%', 
           height: '600px', 
        }}>
          <Typography variant="h3" component="h3" 
          sx={{
            mt:13,
            fontFamily: 'Whisper',
            color: orange[800],
            
          }}
        > Welcome to Grama App</Typography>
        <Button onClick={handleSubmit}> Try btn</Button>
          

        </Box>
        
        
        <Box
          sx={{
            marginTop: 6,
            m: 3,
            p: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: grey[200],
            borderRadius: "18px",
            boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)",
           
          }}
          
        >
          <Typography
            component="h1"
            variant="h5"
            marginBottom={2}
            fontWeight={"bold"}
          >
            Apply for Grama Certificate
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  autoComplete="NIC"
                  name="NIC"
                  required
                  fullWidth
                  id="NIC"
                  label="NIC Number"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                    <InputLabel >Grama Niladhari Division</InputLabel>
                    <Select
                      id="grama-division"
                      value={gramaDivision}
                      label="grama-division"
                       >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                        
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="address-line-1"
                  label="Address Line 1"
                  name="address-line-1"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="address-line-2"
                  label="Address Line 2"
                  name="address-line-2"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="address-line-3"
                  label="Address Line 3"
                  name="address-line-3"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Purpose of Obtaining a Grama Certificate"
                  id="purpose"
                  multiline // Enable multi-line mode
                  rows={4} // Number of rows
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent:"center",
                
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: "15vw",
                  height: "8vh",
                  backgroundColor: orange[600],
                }}
                
              >
                <Typography>Submit</Typography>
              </Button>
            </Box>
            <HelpButton/>
          </Box>
        </Box>
        
        
       
      </Container>
    </ThemeProvider>
  );
}
