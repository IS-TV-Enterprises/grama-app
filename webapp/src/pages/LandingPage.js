import { Typography,useTheme,Box, Grid, Container, Button, Card} from "@mui/material";
import { grey, pink,orange} from '@mui/material/colors';
import form from "../Assets/form.jpg";
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';



import * as React from "react";
const LandingPage = () => {
    const theme = useTheme();
    
  const sectionItems = [
    {
      id: 1,
      icon: <AssignmentTurnedInOutlinedIcon sx={{ fontSize: 100, color:grey[800],mb:1}}  />,
      sentence: 'Apply for Grama Certificate',
      description: 'Apply for a Grama Certificate with ease. Utilize our smart digital solution designed to for efficient processing of your requests.',
    },
    {
      id: 2,
      icon: <TrackChangesOutlinedIcon sx={{ fontSize: 100 , color:grey[800],mb:1}} color="primary" />,
      sentence: 'Check Status',
      description:
        'Track the status of your Grama Certificate application online to stay updated with the approval process and expected completion timelines.',
    },
    {
      id: 3,
      icon: <HelpOutlineOutlinedIcon sx={{ fontSize: 100 , color:grey[800],mb:1}} color="primary" />,
      sentence: 'Get Help',
      description:
        'Get assistance and guidance regarding the application process, documentation, and any queries related to obtaining your Grama Certificate.',
    },
  ];
    

     
    return ( 
      <Box  sx={{ m: 1,mt:0}}>
          <Grid container spacing={2}>
            <Grid item xs={7} 
            sx={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
            }}>
            <Box
            sx={{
              ml:8,
              lineHeight: 1,
              fontSize: 50,
              fontWeight: 'bold',
              color: orange[900],
              
            }}>
             Grama App:
            </Box>
            <Box>
            <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 1, pb: 2 }}>
              <Typography
                sx={{
                  lineHeight: 1.5,
                  fontSize: 32,
                  ml:8,
                  marginBottom: 1,
                  fontWeight: 'bold',
                  color: grey[800],
                }}>
              Your one-stop solution for effortlessly obtaining Garam certificates with convenience and speed
              </Typography>
              
              </Container>
              <Container disableGutters maxWidth="lg" component="main" sx={{ pb: 2 }}>
              <Typography
              sx={{
                fontSize: 18,
                ml:8,
                color: grey[700],
                justifyContent:'center'
              }}>
                We help you seamlessly acquire your Garam certificates. Log in now to get started!
              </Typography>
              
              </Container>
              <Box >
                  <Button variant="contained" type="submit" 
                  sx={{
                    ml:8,
                    width: '8vw',
                    height: '3vw',
                
                    backgroundColor: orange[800],
                
                    fontSize: "1.2rem",
                    "&:hover": {
                      backgroundColor: orange[600],
                    },
                  }}> LOGIN</Button>
                
                  
              </Box>
          </Box>
          </Grid>
          <Grid item xs={5}>
            <img src={form} alt="Your alt text" style={{ maxWidth: '100%', maxHeight: '40vw' }} />
            </Grid>
          </Grid>

      <Box sx={{ flexGrow: 1, minHeight: '400px' ,mt:0,}}>
      <Grid container display={"flex"} justifyContent={"center"}>
        {sectionItems.map((item) => (
          <Grid
            item
            xs={12}
            md={3.5}
            minHeight={300}
            key={item.id}
            sx={{
              m:2,
            }}
            
          >
            <Card
            sx={{
              p:3,
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'center',
              textAlign:'center',
              backgroundColor:grey[100],
            }}>
            {item.icon}
            <Typography variant="h5" mt={2} mb={1} fontWeight={'bold'} color={orange[900]}>{item.sentence}</Typography>
            <Typography >{item.description}</Typography>
            </Card>
            
          </Grid>
        ))}
      </Grid>
    </Box>
         
       
      </Box>
     );
}
 
export default LandingPage;