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
import { blue, grey, orange } from "@mui/material/node/colors";

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

/*const jsonData = [
  {
    certificateId: 1,
    name: "John Doe",
    policeCheck: "Pending",
    idCheck: "Approved",
    addressCheck: "Pending",
    incidents: ["Incident 1", "Incident 2"],
  },
  {
    certificateId: 2,
    name: "Jane Smith",
    policeCheck: "Approved",
    idCheck: "Rejected",
    addressCheck: "Approved",
    incidents: ["Incident 3", "Incident 4"],
  },
  // Add more data as needed
];*/

const GramaTable = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [jsonData ,setjsonData ] = useState([]); 

  const handleExpand = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };
  
  useEffect(() => {
    console.log(" 'Get all grama certifactes' request called");

    fetch(`http://localhost:9030/grama-certificate/allCertRequests`, {
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
      console.log(data);
      /*     
      NIC:"20006756432"
      address_check:false
      division_id: 1
      id_check: true
      police_check: true
      request_id: 1
      status:1
      */
      setjsonData(data)
    })
    .catch((error) => {
      // Handle errors 
      console.error('There was a problem with the fetch operation:', error);
    });

  },[])

  return (
    <TableWrapper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{
              backgroundColor:grey[300],
            }}>
              <CenteredTableCell>Certificate ID</CenteredTableCell>
              <CenteredTableCell>NIC</CenteredTableCell>
              <CenteredTableCell>ID Check</CenteredTableCell>
              <CenteredTableCell>Address Check</CenteredTableCell>
              <CenteredTableCell>Police Check</CenteredTableCell>
              <CenteredTableCell>Actions</CenteredTableCell>
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
                  <CenteredTableCell>{row.police_check ? 'Approved':'Rejected'}</CenteredTableCell>
                  <CenteredTableCell>
                    <ButtonWrapper>
                    <Button onClick={() => handleExpand(row.certificateId)}>
                        <ExpandMoreIcon /> view criminal records
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          console.log(
                            `Approve certificate with ID ${row.certificateId}`
                          )
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          console.log(
                            `Reject certificate with ID ${row.certificateId}`
                          )
                        }
                      >
                        Reject
                      </Button>
                     
                    </ButtonWrapper>
                  </CenteredTableCell>
                </TableRow>
                {expandedRow === row.certificateId && (
                  <IncidentRow>
                    <TableCell colSpan={6}>
                      <IncidentDetails>
                        {row.incidents.map((incident, index) => (
                          <div key={index}>{incident}</div>
                        ))}
                      </IncidentDetails>
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
