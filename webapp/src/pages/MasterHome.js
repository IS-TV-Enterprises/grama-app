import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MasterHome = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Function to fetch role using access token
    const fetchRole = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken"); // Replace this with your method of accessing the access token
        if (!accessToken) {
          setError(true);
          setLoading(false);
          return;
        }

        const response = await axios.get("your_getRole_api_endpoint", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setRole(response.data.role); // Assuming the role is available in the response

        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.error("Error fetching role:", error);
      }
    };

    fetchRole();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !role) {
    return <div>Invalid Role</div>;
  }

  // Navigation based on the role received
  if (role === "user") {
    navigate("/gramaCertificate");
  } else if (role === "gramaNiladhari") {
    navigate("/gramaNilHome");
  } else {
    return <div>Invalid Role</div>;
  }

  // Return null if navigate is used to prevent rendering anything here
  return null;
};

export default MasterHome;
