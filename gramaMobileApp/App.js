// App.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import CustomHeader from './components/Header';
// import CertificateRequestPage from './pages/CertificateRequestPage';
// import CertificateStatusPage from './pages/CertificateStatusPage';
// import LoginScreen from './pages/LoginPage';

// const Stack = createStackNavigator();

// const commonHeaderOptions = ({ navigation, route }) => ({
//   header: () => <CustomHeader navigation={navigation} route={route} />,
// });

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="LoginScreen">
//         <Stack.Screen
//           name="LoginScreen"
//           component={LoginScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="CertificateRequestPage"
//           component={CertificateRequestPage}
//           options={commonHeaderOptions}
//         />
//         <Stack.Screen
//           name="CertificateStatusPage"
//           component={CertificateStatusPage}
//           options={commonHeaderOptions}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: 'https://bf4726e1-884b-4e5b-b7b7-86f410b9dbe3.e1-us-east-azure.choreoapps.dev' }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;