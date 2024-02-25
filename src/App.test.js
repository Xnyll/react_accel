import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';


test("renders successfully", () => {
    render(<App/>);
    const element = screen.getByText(/request device motion permission/i);
    expect(element).toBeInTheDocument();
});

test('initial state', () => {
  render(<App />);
  const xValue = screen.getByText(/X: 0/i);
  const yValue = screen.getByText(/Y: 0/i);
  expect(xValue).toBeInTheDocument();
  expect(yValue).toBeInTheDocument();
});
