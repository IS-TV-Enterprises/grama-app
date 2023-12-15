// CertificateRequestCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const getStatusText = (status) => {
  switch (status) {
    case 0:
      return 'Completed';
    case 1:
      return 'Pending';
    case 2:
      return 'Rejected';
    default:
      return '';
  }
};

const CertificateRequestCard = ({ certificateRequestId, dateSubmitted, status, dateCompleted }) => {
  const statusText = getStatusText(status);

  return (
    <View style={[styles.card, status === 1 ? styles.pending : (status === 0 ? styles.completed : styles.rejected)]}>
      <View style={styles.field}>
        <Text>
          <Text style={styles.label}>Certificate Request ID:</Text> {certificateRequestId}
        </Text>
      </View>
      <View style={styles.field}>
        <Text>
          <Text style={styles.label}>Date Submitted:</Text> {dateSubmitted}
        </Text>
      </View>
      <View style={styles.field}>
        <Text>
          <Text style={styles.label}>Status:</Text> {statusText}
        </Text>
      </View>
      <View style={styles.field}>
        <Text>
          <Text style={styles.label}>Date Completed:</Text> {dateCompleted}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    elevation: 1,
    margin: 8,
  },
  pending: {
    borderRadius: 5,
    shadowColor: 'rgba(169, 169, 169, 0.8)',
  },
  completed: {
    borderRadius: 5,
    shadowColor: 'rgba(0, 128, 0, 0.8)',
  },
  rejected: 
  {
    borderRadius: 5,
    shadowColor: 'rgba(255, 0, 0, 0.8)',
  },
  field: {
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default CertificateRequestCard;
