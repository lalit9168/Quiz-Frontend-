import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Components/Layout/Navbar';

// Mock react-router-dom before importing useNavigate
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate implementation
const mockedUsedNavigate = jest.fn();
useNavigate.mockImplementation(() => mockedUsedNavigate);

// Mock LoginModal component to avoid actual rendering
jest.mock('../Components/Auth/LoginModal', () => () => (
  <div data-testid="login-modal">Login Modal</div>
));

describe('Navbar Component', () => {
  const renderNavbar = () =>
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

  test('renders logo and navigation links', () => {
    renderNavbar();

    expect(screen.getByText(/QuizApplication/i)).toBeInTheDocument();
    expect(screen.getByText(/Professional Learning Platform/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Feedback/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
  });

  test('navigates when login button is clicked', () => {
    renderNavbar();

    const loginButton = screen.getByText(/Login/i);
    fireEvent.click(loginButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
  });

  test('opens drawer on mobile menu icon click', () => {
    // Simulate mobile screen using matchMedia
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query.includes('max-width: 960px'),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    renderNavbar();

    const menuButton = screen.getByLabelText(/open drawer/i);
    fireEvent.click(menuButton);

    expect(screen.getByText(/Feedback/i)).toBeInTheDocument();
  });

  test('scroll to top button becomes visible after scrolling', () => {
    renderNavbar();

    // Simulate scroll event and scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150,
    });
    fireEvent.scroll(window);

    // Optionally, force re-render or trigger effect if needed
    // fireEvent.scroll(window, { target: { scrollY: 150 } });

    // Use findBy to wait for the button if it appears asynchronously
    expect(screen.getByLabelText(/scroll back to top/i)).toBeInTheDocument();
  });
});
