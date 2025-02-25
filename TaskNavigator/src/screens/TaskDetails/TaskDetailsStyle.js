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
    textAlign: 'center',
  },
  description: {
    fontSize: rs(16),
    marginBottom: rh(1),
    textAlign: 'center',
  },
  status: {
    fontSize: rs(18),
    marginBottom: rh(1),
    fontWeight: 'bold',
    color: '#555',
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
