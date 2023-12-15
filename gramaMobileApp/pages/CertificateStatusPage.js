import React from 'react';
import { ScrollView } from 'react-native';
import CertificateRequestCard from '../components/CertificateStatusCard';

const CertificateRequestStatus = () => {
  // Dummy data
  const certificateRequests = [
    {
      certificateRequestId: 'CR123',
      dateSubmitted: '2023-01-01',
      status: 0, // Completed
      dateCompleted: '2023-01-10',
    },
    {
      certificateRequestId: 'CR456',
      dateSubmitted: '2023-02-01',
      status: 1, // Pending
      dateCompleted: null,
    },
    {
      certificateRequestId: 'CR789',
      dateSubmitted: '2023-03-01',
      status: 2, // Rejected
      dateCompleted: null,
    },
  ];

  return (
    <ScrollView>
      {certificateRequests.map((request, index) => (
        <CertificateRequestCard key={index} {...request} />
      ))}
    </ScrollView>
  );
};

export default CertificateRequestStatus;


