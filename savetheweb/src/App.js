import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Navtop from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import CheckStatus from "./pages/CheckStatus";
import GramaCertificate from "./pages/GramaCertificate";
import HelpForm from "./components/HelpForm";
import GramaNilHome from "./pages/GramaNilHome";
import MasterHome from "./pages/MasterHome";

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

            <Route path="/home" element={<MasterHome />} />
            {/* change redirect upon signin to this page */}

            <Route path="/gramaCertificate" element={<GramaCertificate />} />

            <Route path="/checkStatus" element={<CheckStatus />} />

            <Route path="/gramaNilHome" element={<GramaNilHome />} />

            <Route path="/help" element={<HelpForm />} />

          </Routes>
        </Box>

      </BrowserRouter>
    </Box>
  );
}

export default App;