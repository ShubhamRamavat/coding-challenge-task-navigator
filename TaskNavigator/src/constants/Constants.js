import {Platform} from 'react-native';

export const Screens = {
  TokenVerificationScreen: 'TokenVerificationScreen',
  UserDetailsScreen: 'UserDetailsScreen',
  TaskListScreen: 'TaskListScreen',
  TaskDetailsScreen: 'TaskDetailsScreen',
  TaskAddEditScreen: 'TaskAddEditScreen',
};

export const asyncStorageKeys = {
  UserData: 'UserData',
  UserID: 'UserID',
  AuthToken: 'AuthToken',
};

export const Constants = {
  appName: 'Task Navigator',
  deviceType: Platform.select({ios: 'iOS', android: 'Android'}),
  userID: '',
  userData: '',
  userAuthToken:
    '92bfb724090ad1315626f5962b352227ecab53f70471ccb44cc50bdaab5b398e',
};
