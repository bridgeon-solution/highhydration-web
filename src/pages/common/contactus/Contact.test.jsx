import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test } from 'vitest';
import Contact from './Contact';

vi.mock('../../../context/SocketContext', () => ({
    useSocketContext: () => ({
      socket: {
        on: vi.fn(), 
        off: vi.fn(), 
      },
    }),
  }));
test('renders UserLogin component', () => {
    render(
        <MemoryRouter>
            <Contact/>
        </MemoryRouter>
    ); 
});