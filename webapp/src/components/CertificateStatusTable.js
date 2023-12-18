import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';
import { orange } from '@mui/material/colors';

const PreviousReportsTable = ({ reportsData }) => {
  return (
    <Container component="main" maxWidth="xl" sx={{
        display:"flex",
        justifyContent:"center",
       
    }}>
    <TableContainer component={Paper} sx={{ maxWidth: 'lg', backgroundColor: orange[50], }} >
      <Table sx={{ minWidth: 600 }} aria-label="customized table" >
        <TableHead sx={{ backgroundColor: orange[600] }}>
          <TableRow>
            <TableCell sx={{fontWeight:'bold'}}>Report ID</TableCell>
            <TableCell sx={{fontWeight:'bold'}} >Date Submitted</TableCell>
            <TableCell sx={{fontWeight:'bold'}}>Status</TableCell>
            <TableCell sx={{fontWeight:'bold'}}>Date Completed</TableCell>
            {/* Add more table headers based on your data */}
          </TableRow>
        </TableHead>
        <TableBody>
          {reportsData.map((report, index) => (
            <TableRow key={index}>
              <TableCell>{report.reportID}</TableCell>
              <TableCell>{report.dateSubmitted}</TableCell>
              <TableCell>{report.status}</TableCell>
              <TableCell>{report.dateCompleted}</TableCell>
              {/* Add more TableCell for other data */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
};

export default PreviousReportsTable;