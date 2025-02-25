import React from 'react';
import renderer from 'react-test-renderer';
import TaskDetails from '../src/screens/TaskDetails/TaskDetails';

test('renders correctly', () => {
  const tree = renderer.create(<TaskDetails />).toJSON();
  expect(tree).toMatchSnapshot();
});
