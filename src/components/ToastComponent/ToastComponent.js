import {Toast} from 'react-native-toast-notifications';

export const showToast = message => {
  Toast.show(message, {duration: 2000});
};
