import React, { useState } from "react";
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

// Your JSON data
const jsonData = [
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
];

const GramaTable = () => {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleExpand = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  return (
    <TableWrapper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <CenteredTableCell>Certificate ID</CenteredTableCell>
              <CenteredTableCell>Name</CenteredTableCell>
              <CenteredTableCell>Police Check</CenteredTableCell>
              <CenteredTableCell>ID Check</CenteredTableCell>
              <CenteredTableCell>Address Check</CenteredTableCell>
              <CenteredTableCell>Actions</CenteredTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jsonData.map((row) => (
              <React.Fragment key={row.certificateId}>
                <TableRow>
                  <CenteredTableCell>{row.certificateId}</CenteredTableCell>
                  <CenteredTableCell>{row.name}</CenteredTableCell>
                  <CenteredTableCell>{row.policeCheck}</CenteredTableCell>
                  <CenteredTableCell>{row.idCheck}</CenteredTableCell>
                  <CenteredTableCell>{row.addressCheck}</CenteredTableCell>
                  <CenteredTableCell>
                    <ButtonWrapper>
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
                      <Button onClick={() => handleExpand(row.certificateId)}>
                        <ExpandMoreIcon />
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
