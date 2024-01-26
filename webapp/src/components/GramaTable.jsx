import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { grey } from "@mui/material/node/colors";
import { Typography } from "@mui/material";

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-left: 50px;
  margin-right: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center; /* Center the buttons horizontally */

  & button {
    margin-left: 10px; /* Add a 10px margin to all buttons */
  }

  & button:first-of-type {
    margin-left: 0; /* Remove margin from the first button */
  }
`;

const CenteredTableCell = styled(TableCell)`
  text-align: center;
`;

const IncidentRow = styled(TableRow)`
  & > td {
    padding: 0;
  }
`;

const IncidentDetails = styled.div`
  padding: 10px;
`;



const GramaTable = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [jsonData ,setjsonData ] = useState([]); 
  const [criminalRecords,setcriminalrecords] = useState([]); 


  const handleExpand = (rowId,NIC) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
    console.log("request Id is",NIC);
    if(expandedRow !== rowId){
      fetch(`http://localhost:9030/crimesById?id=${NIC}`, {
        method: "GET",
        credentials: "include",
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Convert response to JSON
        })
        .then((data) => {
          console.log(data);
          //NIC: "20006756432", crime_id: 1001,  date: {year: 2023, month: 1, day: 1}, description: "Theft"
          setcriminalrecords(data)
          
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    
    }
  };

  const approveOrRejectRequest = (reqId,status) => {
    console.log("approve request Id ",reqId);
    fetch(`http://localhost:9030/updateStatus?status=${status}&id=${reqId}`, {
      method: "PATCH",
      credentials: "include",
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Convert response to JSON
      })
      .then((data) => {
        console.log(data);
        setjsonData((jsonData) => jsonData.filter((record) => record.request_id !== reqId));
        
      })
      .catch((error) => {
        console.error('There was a problem in modifying the status:', error);
      });
  
    
  };

  
  
  useEffect(() => {
    console.log(" 'Get all grama certifactes' request called");

    fetch(`http://localhost:9030/allCertRequests`, {
    method: "GET",
    credentials: "include",
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
      setjsonData(data)
    })
    .catch((error) => {
      // Handle errors 
      console.error('There was a problem with the fetch operation:', error);
    });

  },[]);


  return (
    <TableWrapper >
      <TableContainer component={Paper} sx={{
      marginBottom: 10,
    }}>
        <Table >
          <TableHead>
            <TableRow sx={{
              backgroundColor:grey[800],
            }}>
              <CenteredTableCell sx={{color:"white"}}>Certificate ID</CenteredTableCell>
              <CenteredTableCell sx={{color:"white"}}>NIC</CenteredTableCell>
              <CenteredTableCell sx={{color:"white"}}>ID Check</CenteredTableCell>
              <CenteredTableCell sx={{color:"white"}}>Address Check</CenteredTableCell>
              <CenteredTableCell sx={{color:"white"}}>Police Check</CenteredTableCell>
              <CenteredTableCell sx={{color:"white"}}>Actions</CenteredTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jsonData.map((row) => (
              <React.Fragment key={row.request_id}>
                <TableRow>
                  <CenteredTableCell>{row.request_id}</CenteredTableCell>
                  <CenteredTableCell>{row.NIC}</CenteredTableCell>
                  <CenteredTableCell>{row.id_check ? 'Approved':'Rejected'}</CenteredTableCell>
                  <CenteredTableCell>{row.address_check ? 'Approved':'Rejected'}</CenteredTableCell>
                  <CenteredTableCell>{row.police_check ? 'Rejected': 'Approved'}</CenteredTableCell>
                  <CenteredTableCell>
                    <ButtonWrapper>
                    <Button onClick={() => handleExpand(row.request_id, row.NIC)}>
                        <ExpandMoreIcon/> view criminal records
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        // intial request status (processing=0, approved=1, rejected=2, smth like that)
                        onClick={() =>approveOrRejectRequest(row.request_id,1)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => approveOrRejectRequest(row.request_id,2)}
                        
                      >
                        Reject
                      </Button>
                     
                    </ButtonWrapper>
                  </CenteredTableCell>
                </TableRow>
                {expandedRow === row.request_id && (
                  <IncidentRow sx={{
                    ml:3,
                  }}>
                    <TableCell colSpan={6} >
                    {criminalRecords.length === 0 ? (
                          <TableContainer component={Paper} sx={{backgroundColor: grey[100] , paddingLeft:5,paddingRight:10 }} >
                          <Table aria-label="customized table">
                             <TableBody  sx={{ paddingLeft:50}}>
                                  <TableRow>
                                  <TableCell>No criminal records</TableCell>
                                  </TableRow>
                               
                             </TableBody>
                           </Table>
                     </TableContainer>
                        ) : (
                      
                      <TableContainer component={Paper} sx={{backgroundColor: grey[100] , paddingLeft:5,paddingRight:10 }} >
                       <Table aria-label="customized table">
                          <TableBody  sx={{ paddingLeft:50}}>
                            {criminalRecords.map((incident, index) => (
                              <TableRow key={index}>
                                <TableCell>{incident.crime_id}</TableCell>
                                <TableCell>{`${incident.date.year} - ${incident.date.month} - ${incident.date.day}`}</TableCell>
                                <TableCell>{incident.description}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                  </TableContainer>
                        )}
                    </TableCell>
                    
                  </IncidentRow>
                  
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
};

export default GramaTable;
