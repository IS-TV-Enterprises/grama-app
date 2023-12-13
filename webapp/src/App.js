import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Navtop from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import CheckStatus from "./pages/CheckStatus";
import Footer from "./components/Footer";
import GramaCertificate from "./pages/GramaCertificate";
import GramaNilHome from "./pages/GramaNilHome";

function App() {
  return (
    <Box
      className="App"
      sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <BrowserRouter>
        <Navtop />

        <Box
          className="pages"
          sx={{ display: "flex", flexFlow: "column", height: "100%" }}
        >
          {" "}
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/gramaCertificate" element={<GramaCertificate />} />

            <Route path="/checkStatus" element={<CheckStatus />} />

            <Route path="/gramaNilHome" element={<GramaNilHome />} />
          </Routes>
        </Box>
        <Footer />
      </BrowserRouter>
    </Box>
  );
}

export default App;
