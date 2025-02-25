import AsyncStorage from '@react-native-async-storage/async-storage';

// Save token in AsyncStorage
export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Error storing token', error);
  }
};

// Get token from AsyncStorage
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    console.error('Error retrieving token', error);
    return null;
  }
};

// Remove token from AsyncStorage
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.error('Error removing token', error);
  }
};

// Save user data in AsyncStorage
export const storeUserData = async (userData) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    console.error('Error storing user data', error);
  }
};

// Get user data from AsyncStorage
export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error retrieving user data', error);
    return null;
  }
};

// Remove user data from AsyncStorage
export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem('userData');
  } catch (error) {
    console.error('Error removing user data', error);
  }
};

// Save Task List in AsyncStorage
export const storeTaskList = async (taskList) => {
  try {
    await AsyncStorage.setItem('taskList', JSON.stringify(taskList));
  } catch (error) {
    console.error('Error storing task list', error);
  }
};

// Get Task List from AsyncStorage
export const getTaskList = async () => {
  try {
    const taskList = await AsyncStorage.getItem('taskList');
    return taskList ? JSON.parse(taskList) : [];
  } catch (error) {
    console.error('Error retrieving task list', error);
    return [];
  }
};

// Remove Task List from AsyncStorage
export const removeTaskList = async () => {
  try {
    await AsyncStorage.removeItem('taskList');
  } catch (error) {
    console.error('Error removing task list', error);
  }
};
