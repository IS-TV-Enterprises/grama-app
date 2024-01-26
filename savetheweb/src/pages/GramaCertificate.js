import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
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
import config from '../config.json'; 



const defaultTheme = createTheme();


export default function GramaCertificate() {
  const [gramaDivisions, setgramaDivisions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const api_url = config.api_url;
  
  //Handle submission of the grama certificate request form
  const handleSubmit = (event) => {
    event.preventDefault();
    const postData = {
      "division_id": parseInt(event.target.gramaDivision.value, 10),
      "NIC": event.target.NIC.value,
      "address": event.target.addressLine1.value +"," + event.target.addressLine2.value + ","+ event.target.addressLine3.value + ","+ event.target.city.value
    }

    console.log("handle submit called");
    fetch(`${api_url}/addCertificateRequest`, {
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
    .catch((error) => {
      // Handle errors here
      console.error('There was a problem when sending the request data:', error);
    });

    event.target.reset(); // Reset the form fields
    setSelectedDivision('');

  };

  //getnames of the grama division and divisionIds from division table
  useEffect(() => {
    const api_url = config.api_url;
    console.log(" get grama divisions");

    fetch(`${api_url}/allDivisions`, {
    method: "GET",
    credentials: false,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      return response.json(); // Convert response to JSON
    })
    .then((data) => {
      // Handle the JSON data 
      // NIC:"20006756432", address_check:false, division_id: 1, id_check: true , police_check: true, request_id: 1, status:1 
      console.log(data);
      setgramaDivisions(data)
    })
    .catch((error) => {
      // Handle errors 
      console.error('There was a problem with the fetch operation:', error);
    });

  },[api_url]);

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
          onSubmit ={handleSubmit}
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
                      id="gramaDivision"
                      name="gramaDivision"
                      label="grama-division"
                      value={selectedDivision}
                      onChange={(event) => setSelectedDivision(event.target.value)}
                      required
                       >
                      <MenuItem value={''} disabled>Select Division</MenuItem>
                      {gramaDivisions.map((division) => (
                        <MenuItem key={division.division_id} value={division.division_id}>
                          {division.division}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                        
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="addressLine1"
                  label="Address Line 1"
                  name="address-line-1"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="addressLine2"
                  label="Address Line 2"
                  name="address-line-2"
                  autoComplete
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="addressLine3"
                  label="Address Line 3"
                  name="address-line-3"
                  autoComplete
              />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="purpose"
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
