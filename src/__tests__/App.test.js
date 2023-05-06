import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders the app title', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Expense Tracker/i);
  expect(titleElement).toBeInTheDocument();
});
