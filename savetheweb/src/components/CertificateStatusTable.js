import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';
import { orange } from '@mui/material/colors';

// Format of request data
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

  //set req status to 'Processing' / 'Approved' / 'Rejected' based on the status value
  const getRequestStatus = (status) => {
    if (status === 1) {
      return 'Approved';
    } 
    else if (status === 2) {
      return 'Rejected';
    } 
    else {
      return 'Processing';
    }
  };

const PreviousReportsTable = ({ reportsData }) => {
 
  return (
    <Container component="main" maxWidth="xl" 
    sx={{
        display:"flex",
        justifyContent:"center",
        marginBottom: 10,
       
    }}>
    <TableContainer component={Paper} sx={{ maxWidth: 'lg', backgroundColor: orange[50], }} >
      <Table sx={{ minWidth: 600 }} aria-label="customized table" >
        <TableHead sx={{ backgroundColor: orange[600] }}>
          <TableRow>
            <TableCell sx={{fontWeight:'bold'}}>Report ID</TableCell>
            <TableCell sx={{fontWeight:'bold'}} >Date Submitted</TableCell>
            <TableCell sx={{fontWeight:'bold'}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportsData.map((report, index) => (
            <TableRow key={index}>
              <TableCell>{report.request_id}</TableCell>
              <TableCell>{report.date_submitted.year}-{report.date_submitted.month}-{report.date_submitted.day}</TableCell>
              <TableCell>{getRequestStatus(report.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
};

export default PreviousReportsTable;