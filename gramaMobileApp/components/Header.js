
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet } from 'react-native';
import HelpModal from './HelpModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


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

  const [isHelpModalVisible, setHelpModalVisible] = useState(false);

  const showHelpModal = () => {
    setHelpModalVisible(true);
  };

  const hideHelpModal = () => {
    setHelpModalVisible(false);
  };

  const handleLogOutPress =async () => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem('accessToken');
  
      // Your client ID (replace 'your_client_id' with the actual client ID)
      const clientId = 'XTe3UDXz7d5M6Ghuem7hRr5ITEYa';
  
      // If there's an access token, send a request to revoke it
      if (accessToken) {
        const revokeResponse = await fetch(
          'https://api.asgardeo.io/t/istventerprises/oauth2/revoke',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `token=${accessToken}&token_type_hint=access_token&client_id=${clientId}`,
          }
        );

        console.log(revokeResponse.status);
  
        // Check the response status
        if (revokeResponse.ok) {
          // Remove the access token from AsyncStorage
          await AsyncStorage.removeItem('accessToken');
        } else {
          // Handle the case where revocation fails
          Alert.alert('Logout failed', 'Failed to revoke the access token');
        }
      } else {
        // Handle the case where there's no access token to revoke
        Alert.alert('Logout failed', 'No access token found');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
    navigation.navigate('LoginScreen');
  }

  const handleHelpSubmit = (message) => {
    // Handle the submitted message
    console.log('Submitted message:', message);
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
        <TouchableOpacity onPress={showHelpModal} style={styles.buttonHelp}>
          <Text style={styles.buttonText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogOutPress} style={styles.buttonLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>


        <HelpModal
          visible={isHelpModalVisible}
          onClose={hideHelpModal}
          onSubmit={handleHelpSubmit}
        />
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
    borderRadius: 15,
    width: 80, // Fixed width
    marginTop: 10,
    elevation: 5,
  },
  buttonHelp: {
    backgroundColor: 'lightgrey', // Grey color
    padding: 10,
    borderRadius: 15,
    width: 80, // Fixed width
    marginTop: 10,
    elevation: 5,
  },
  buttonLogout: {
    backgroundColor: 'lightgrey', // Grey color
    padding: 10,
    borderRadius: 15,
    width: 80, // Fixed width
    marginTop: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'midnightblue',
    textAlign: 'center',
  },
  disabledButton: {
    elevation: 0,
    backgroundColor: '#FFA500', // Light grey for disabled state
  },
});

export default CustomHeader;

