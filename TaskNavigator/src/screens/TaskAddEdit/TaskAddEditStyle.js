import {Dimensions, StyleSheet} from 'react-native';
import {rh, rs, rw} from 'react-native-full-responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: rw(5),
    backgroundColor: '#f1f1f1',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: rs(24),
    fontWeight: 'bold',
    marginBottom: rh(2),
  },
  input: {
    height: rh(6),
    width: Dimensions.get('window').width - 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: rh(1),
    paddingLeft: rw(2),
    borderRadius: 5,
    backgroundColor: '#fff',
    color: 'black',
    fontSize: rs(16),
  },
  dropdown: {
    fontSize: rs(16),
    padding: rw(3),
    height: rh(6),
    width: Dimensions.get('window').width - 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: rh(2),
    borderRadius: 5,
    backgroundColor: '#fff',
    color: 'black',
  },
  selectedText: {
    fontSize: rs(16),
  },
  errorText: {
    color: 'red',
    fontSize: rs(14),
    marginBottom: rh(1),
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000004D',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  datePickerButton: {
    padding: rw(3),
    height: rh(6),
    width: Dimensions.get('window').width - 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: rh(1),
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  dateText: {
    color: 'black',
    fontSize: rs(16),
    textAlign: 'left',
  },
});
