import { Typography ,Box,Container} from "@mui/material";
import CertificateStatusTable from "../components/CertificateStatusTable"
// Sample data
const sampleReportsData = [
  {
    reportID: 'RPT001',
    dateSubmitted: '2023-10-02',
    dateCompleted: '2023-10-15',
    status: 'Completed',
    // Add more fields for other data
  },
  {
    reportID: 'RPT002',
    dateSubmitted: '2023-10-22',
    dateCompleted: '2023-11-20',
    status: 'Completed',
    // Add more fields for other data
  },
  // Add more sample reports data as needed
];

// Usage example
const CheckStatus = () => {
  return (
    <div>
       <Container>
      <Box mt={4} textAlign="center" mb={4}>
        <Typography component="h1" variant="h5" marginBottom={2} fontWeight={"bold"}>
              Your Grama Certificates</Typography>
      </Box>
    </Container>
      <CertificateStatusTable reportsData={sampleReportsData} />
    </div>
  );
};

export default CheckStatus;


