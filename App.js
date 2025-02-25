import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import TokenVerificationScreen from './src/screens/Login/TokenVerification';
import TaskListScreen from './src/screens/TaskList/TaskList';
import TaskDetailsScreen from './src/screens/TaskDetails/TaskDetails';
import TaskAddEditScreen from './src/screens/TaskAddEdit/TaskAddEdit';
import UserDetailsScreen from './src/screens/UserDetails/UserDetails';

import {getToken, getUserData} from './src/helper/Storage';
import {Constants, Screens} from './src/constants/Constants';
import {ToastProvider} from 'react-native-toast-notifications';
import {navigationRef} from './src/config/ApiCall';

const Stack = createStackNavigator();

// Deep linking configuration for TaskDetailsScreen
const linking = {
  prefixes: ['tasknavigator://'], // Define your custom URI scheme
  config: {
    screens: {
      [Screens.TokenVerificationScreen]: '',
      [Screens.UserDetailsScreen]: 'userDetails',
      [Screens.TaskListScreen]: 'taskList',
      [Screens.TaskDetailsScreen]: 'todo/:id', // Deep link configuration for TaskDetails
      [Screens.TaskAddEditScreen]: 'taskAddEdit',
    },
  },
};

// Disable yellow box warnings for a cleaner development experience
console.disableYellowBox = true;
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notifications by message
LogBox.ignoreAllLogs(); // Ignore all log notifications
console.warn = () => {}; // Suppress all warnings in the console

// If not in development mode, suppress logs
if (!__DEV__) {
  console.log = () => {};
  console.warn = () => {};
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loader state

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  const checkLoggedInStatus = async () => {
    const token = await getToken();
    const userData = await getUserData();

    Constants.userAuthToken = token;
    Constants.userData = userData;

    setIsLoggedIn(!!token && !!userData);
    setIsLoading(false); // Once token check is complete, hide the loader
  };

  if (isLoading) {
    // Show loader while checking the token
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ToastProvider>
      <NavigationContainer linking={linking} ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={
            isLoggedIn
              ? Screens.TaskListScreen
              : Screens.TokenVerificationScreen
          }>
          <Stack.Screen
            name={Screens.TokenVerificationScreen}
            component={TokenVerificationScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Screens.UserDetailsScreen}
            component={UserDetailsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Screens.TaskListScreen}
            component={TaskListScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Screens.TaskDetailsScreen}
            component={TaskDetailsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Screens.TaskAddEditScreen}
            component={TaskAddEditScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
};

// Style for the loader container
const styles = {
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1', // Optional: set background color
  },
};

export default App;
