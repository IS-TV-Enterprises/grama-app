// CustomHeader.js
import React from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Alert, StyleSheet } from 'react-native';

const CustomHeader = ({ navigation, route }) => {
  const isRequestPage = route.name === 'CertificateRequestPage';
  const isStatusPage = route.name === 'CertificateStatusPage';

  const handleRequestPress = () => {
    if (!isRequestPage) {
      navigation.navigate('CertificateRequestPage');
    }
  };

  const handleStatusPress = () => {
    if (!isStatusPage) {
      navigation.navigate('CertificateStatusPage');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleRequestPress}
          style={[styles.buttonOrange, isRequestPage && styles.disabledButton]}
          disabled={isRequestPage}
        >
          <Text style={styles.buttonText}>Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleStatusPress}
          style={[styles.buttonOrange, isStatusPage && styles.disabledButton]}
          disabled={isStatusPage}
        >
          <Text style={styles.buttonText}>Status</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Alert.alert('Hi')}
          style={styles.buttonGrey}
        >
          <Text style={styles.buttonText}>Help</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFA500',
  },
  buttonOrange: {
    backgroundColor: '#ff8c00', // Orange color
    padding: 10,
    borderRadius: 8,
    width: 80, // Fixed width
    marginTop: 10,
    elevation: 5,
  },
  buttonGrey: {
    backgroundColor: '#808080', // Grey color
    padding: 10,
    borderRadius: 8,
    width: 80, // Fixed width
    marginTop: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
  disabledButton: {
    elevation: 0,
    backgroundColor: '#FFA500', // Light grey for disabled state

  },
});

export default CustomHeader;
