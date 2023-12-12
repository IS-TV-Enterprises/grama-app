import * as React from "react";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {  orange } from "@mui/material/colors";
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



const defaultTheme = createTheme();


export default function GramaCertificate() {
  const [gramaDivision, setgramaDivision] = useState('');

  const handleChange = (event) => {
    setgramaDivision(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xl">
        <Box
          sx={{
            marginTop: 6,
            m: 3,
            p: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: orange[50],
            borderRadius: "18px",
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
            onSubmit={handleSubmit}
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
                      onChange={handleChange}
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
