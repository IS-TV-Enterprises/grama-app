// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomHeader from './components/Header';
import CertificateRequestPage from './pages/CertificateRequestPage';
import CertificateStatusPage from './pages/CertificateStatusPage';
import LoginScreen from './pages/LoginPage';

const Stack = createStackNavigator();

const commonHeaderOptions = ({ navigation, route }) => ({
  header: () => <CustomHeader navigation={navigation} route={route} />,
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CertificateRequestPage"
          component={CertificateRequestPage}
          options={commonHeaderOptions}
        />
        <Stack.Screen
          name="CertificateStatusPage"
          component={CertificateStatusPage}
          options={commonHeaderOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
