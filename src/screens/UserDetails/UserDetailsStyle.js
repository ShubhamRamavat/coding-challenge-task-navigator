import {Dimensions, StyleSheet} from 'react-native';
import {rh, rs, rw} from 'react-native-full-responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  title: {
    fontSize: rs(24),
    marginBottom: rh(2),
    fontWeight: 'bold',
  },
  label: {
    fontSize: rs(16),
    marginBottom: rh(2),
    marginTop: rh(2),
    fontWeight: '600',
  },
  input: {
    fontSize: rs(16),
    width: Dimensions.get('window').width - 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: rh(2),
    padding: rw(3),
    borderRadius: 5,
    backgroundColor: '#fff',
    color: 'black',
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
  error: {
    color: 'red',
    fontSize: rs(12),
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
});
