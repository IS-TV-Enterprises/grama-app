import React from "react";
import { Button, Box, Typography, Container, Grid } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import { grey, pink, orange } from "@mui/material/colors";
import form from "../Assets/form.jpg";

const Banner = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid
          item
          xs={7}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              ml: 8,
              lineHeight: 1,
              fontSize: 50,
              fontWeight: "bold",
              color: orange[900],
            }}
          >
            Welcome Back
          </Box>
          <Box>
            <Container
              disableGutters
              maxWidth="lg"
              component="main"
              sx={{ pt: 1, pb: 2 }}
            >
              <Typography
                sx={{
                  lineHeight: 1.5,
                  fontSize: 32,
                  ml: 8,
                  marginBottom: 1,
                  fontWeight: "bold",
                  color: grey[800],
                }}
              >
                Scroll down to view pending certificate requests
              </Typography>
            </Container>
            {/* <Container
              disableGutters
              maxWidth="lg"
              component="main"
              sx={{ pb: 2 }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  ml: 8,
                  color: grey[700],
                  justifyContent: "center",
                }}
              >
                Scroll down to view pending certificate requests
              </Typography>
            </Container> */}
            <Box>
              <ScrollLink to="gramatable" smooth={true} duration={500}>
                <Button
                  variant="contained"
                  sx={{
                    ml: 8,
                    width: "14vw",
                    height: "10vw",

                    backgroundColor: orange[800],

                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: orange[600],
                    },
                  }}
                >
                  Pending Requests
                </Button>
              </ScrollLink>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <img
            src={form}
            alt="Your alt text"
            style={{ maxWidth: "100%", maxHeight: "40vw" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Banner;
