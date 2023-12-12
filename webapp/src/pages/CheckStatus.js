import { Typography ,Box,Container} from "@mui/material";
import CertificateStatusTable from "../components/CertificateStatusTable"
import HelpButton from "../components/HelpButton";


// Sample data
const sampleReportsData = [
  {
    reportID: 'RPT001',
    dateSubmitted: '2023-10-02',
    dateCompleted: '2023-10-15',
    status: 'Completed',
  },
  {
    reportID: 'RPT002',
    dateSubmitted: '2023-10-22',
    dateCompleted: '2023-11-20',
    status: 'Completed',
  },
];


const CheckStatus = () => {
  return (
    <Box>
       <Container>
      <Box mt={4} textAlign="center" mb={4}>
        <Typography component="h1" variant="h5" marginBottom={2} fontWeight={"bold"}>
              Your Grama Certificates</Typography>
      </Box>
    </Container>
      <CertificateStatusTable reportsData={sampleReportsData} />
      <HelpButton/>
    </Box>
  );
};

export default CheckStatus;


