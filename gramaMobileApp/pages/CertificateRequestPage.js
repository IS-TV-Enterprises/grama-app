import React from 'react';
import { View, Text } from 'react-native';
import RequestForm from '../components/RequestForm';
import { ScrollView } from 'react-native';

const CertificateRequestPage = () => {
  return (
    <ScrollView>
      <RequestForm />
    </ScrollView>
  );
};

export default CertificateRequestPage;
