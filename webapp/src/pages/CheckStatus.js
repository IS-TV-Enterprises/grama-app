import { Typography ,Box,Container} from "@mui/material";
import CertificateStatusTable from "../components/CertificateStatusTable"
import HelpButton from "../components/HelpButton";
import { useEffect, useState } from "react";





const CheckStatus = () => {
  // Sample data
 /* 
  NIC:"1234"
  address_check:false
  date_submitted: {year: 2023, month: 12, day: 19}
  division_id: 1
  id_check: false
  police_check:false
  request_id: 34
  status:1
  */

    const [certReqData,setcertReqData] = useState([]);
    

    //get status  of the certificates requested by the user
    useEffect(() => {

    //Get user's NIC from the access token
    const NIC = '19879956432';

    console.log("get grama certificates requested by the user");

    fetch(`http://localhost:9030/allCertRequestsById?id=${NIC}`, {
    method: "GET",
    // credentials: "include",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      return response.json(); // Convert response to JSON
    })
    .then((data) => {
      console.log(data);
      setcertReqData(data)
    })
    .catch((error) => {
      // Handle errors 
      console.error('There was a problem with the fetch operation:', error);
    });

    },[]);



 
  return (
    <Box>
       <Container>
      <Box mt={4} textAlign="center" mb={4}>
        <Typography component="h1" variant="h5" marginBottom={2} fontWeight={"bold"}>
              Your Grama Certificates</Typography>
      </Box>
    </Container>
      <CertificateStatusTable reportsData={certReqData} />
      <HelpButton/>
    </Box>
  );
};

export default CheckStatus;


