import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "@asgardeo/auth-react";

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

  if (role === "Grama_Niladhari") {
    navigate("/gramaNilHome");
  } else {
    navigate("/gramaCertificate");
  }
  // else {
  //   return (
  //     <div>
  //       <h1>Please wait while we verify you details</h1>
  //       {state.isAuthenticated ? (
  //         <h2>user Authenticated</h2>
  //       ) : (
  //         <h2>user not Authenticated</h2>
  //       )}
  //     </div>
  //   );
  // }
  // Return null if navigate is used to prevent rendering anything here
};

export default MasterHome;
