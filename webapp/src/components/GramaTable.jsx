import React from 'react';
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  & > button {
    margin-right: 8px;
  }
`;

const CenteredTableCell = styled(TableCell)`
  text-align: center;
`;

// Your JSON data
const jsonData = [
  { "certificateId": 1, "name": "John Doe", "policeCheck": "Pending", "idCheck": "Approved", "addressCheck": "Pending" },
  { "certificateId": 2, "name": "Jane Smith", "policeCheck": "Approved", "idCheck": "Rejected", "addressCheck": "Approved" }
  // Add more data as needed
];

const GramaTable = () => {
  const handleApprove = (id) => {
    console.log(`Certificate with ID ${id} approved`);
  };

  const handleReject = (id) => {
    console.log(`Certificate with ID ${id} rejected`);
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
              <TableRow key={row.certificateId}>
                <CenteredTableCell>{row.certificateId}</CenteredTableCell>
                <CenteredTableCell>{row.name}</CenteredTableCell>
                <CenteredTableCell>{row.policeCheck}</CenteredTableCell>
                <CenteredTableCell>{row.idCheck}</CenteredTableCell>
                <CenteredTableCell>{row.addressCheck}</CenteredTableCell>
                <CenteredTableCell>
                  <ButtonWrapper>
                    <Button variant="contained" color="primary" onClick={() => handleApprove(row.certificateId)}>
                      Approve
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleReject(row.certificateId)}>
                      Reject
                    </Button>
                  </ButtonWrapper>
                </CenteredTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
};

export default GramaTable;
