import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {rh, rs, rw} from 'react-native-full-responsive';

const ThemeButton = ({onPress, label}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get('window').width - 40,
    height: rh(5),
    marginBottom: rh(2),
    backgroundColor: '#4CAF50',
    alignSelf: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: rh(1),
  },
  label: {
    fontSize: rs(16),
    color: 'white',
    textAlign: 'center',
  },
});

export default ThemeButton;
