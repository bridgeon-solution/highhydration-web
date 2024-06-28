import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test } from 'vitest';
import Aboutus from './Aboutus';

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
            <Aboutus />
        </MemoryRouter>
    ); 
});