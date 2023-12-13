import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logoblack from "../Assets/logoblacck.jpg";
import { blue, grey, orange } from "@mui/material/colors";
import { useAuthContext } from "@asgardeo/auth-react";

const drawerWidth = 240;
const navItems = [
  { label: "Grama Certificate", to: "/GramaCertificate" }, // Define paths for your navigation items
  { label: "Check Status", to: "/checkStatus" },
];

const linkStyles = {
  textDecoration: "none",
  color: "inherit", // Inherit the color from parent (default)
  "&:hover": {
    color: "#f50057", // Change link color on hover
  },
};

const Navtop = (props) => {
  const { state, signIn, signOut, getBasicUserInfo } = useAuthContext();
  const [role, setRole] = useState("");
  getBasicUserInfo()
    .then((basicUserDetails) => {
      console.log(basicUserDetails);
      console.log("username = " + basicUserDetails.username);
      console.log("groups = " + basicUserDetails.groups);
      setRole(basicUserDetails.groups);
    })
    .catch((error) => {
      // Handle the error
    });

  let user = state.isAuthenticated;

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Button component={Link} to="/" variant="h6" sx={{ my: 2 }}>
        <img src={logoblack} alt="Pixie Logo" style={{ width: "300vw" }} />
      </Button>

      <Divider />

      {user && (
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <Link
                  to={item.to}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemText primary={item.label} />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
          <Button onClick={() => signOut()} component={Link}>
            Log out
          </Button>
        </List>
      )}

      {!user && (
        <List>
          <Button
            onClick={() => signIn()}
            component={Link}
            to="/gramaCertificate"
            sx={{ ...linkStyles }}
          >
            <Typography fontWeight="bold"> Login </Typography>
          </Button>
        </List>
      )}
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ color: "black", backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                padding: "2%",
              }}
            >
              {" "}
              <img
                src={logoblack}
                alt="Pixie Logo"
                style={{ width: "100%", maxWidth: "100px" }}
              />
            </Link>
          </Typography>
          {user && (
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {role == "Grama_Niladhari" ? (
                // <Button onClick={() => signOut()} sx={{ color: grey[800] }}>
                //   Log out
                // </Button>
                <div></div>
              ) : (
                navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.to}
                    sx={{
                      color: grey[900],
                      fontWeight: "bold",
                      backgroundColor: grey[50],
                      mr: 2,
                    }}
                  >
                    {item.label}
                  </Button>
                ))
              )}
              <Button onClick={() => signOut()} sx={{ color: grey[800] }}>
                Log out
              </Button>
            </Box>
          )}

          {!user && (
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button onClick={() => signIn()} sx={{ ...linkStyles }}>
                <Typography fontWeight="550"> Login </Typography>
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 1 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

Navtop.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navtop;
