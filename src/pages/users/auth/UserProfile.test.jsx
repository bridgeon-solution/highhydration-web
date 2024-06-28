// src/pages/users/auth/UserProfile.test.jsx

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import UserProfile from './UserProfile';
import { useSocketContext } from '../../../context/SocketContext'; // Adjust the path to your context

// Mock the useSocketContext hook
vi.mock('../../../context/SocketContext', () => ({
  useSocketContext: () => ({
    socket: {
      on: vi.fn(), 
      off: vi.fn(), 
    },
  }),
}));

describe('UserProfile', () => {
  it('renders UserProfile component', () => {
    render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>
    );
    
    
  });
});
