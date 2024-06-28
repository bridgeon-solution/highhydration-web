import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserLogin from './UserLogin';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock API
vi.mock('../../../axiosInterceptors', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: {
      ...actual.default,
      post: vi.fn()
    }
  };
});

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe('UserLogin Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <UserLogin />
      </MemoryRouter>
    );

    expect(screen.getByText('Login to your Account')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login In')).toBeInTheDocument();
  });

  test('updates email and password on input change', () => {
    render(
      <MemoryRouter>
        <UserLogin />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('handles login successfully', async () => {
    const mockResponse = { status: 200, data: { token: 'fakeToken' } };
    const api = (await import('../../../axiosInterceptors')).default;
    api.post.mockResolvedValue(mockResponse);

    render(
      <MemoryRouter>
        <UserLogin />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Login In'));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/users/login', {
        email: 'user@example.com',
        password: 'password123'
      });
    });

    expect(mockNavigate).toHaveBeenCalledWith('/home');
    expect(localStorage.getItem('access_token')).toBe('fakeToken');
  });

  test('handles login error', async () => {
    const mockError = { response: { status: 400 } };
    const api = (await import('../../../axiosInterceptors')).default;
    api.post.mockRejectedValue(mockError);

    render(
      <MemoryRouter>
        <UserLogin />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('Login In'));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/users/login', {
        email: 'wrong@example.com',
        password: 'wrongpassword'
      });
    });

    expect(screen.getByText('invalid user or password')).toBeInTheDocument();
  });
});
