import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test } from 'vitest';
import Order from './Order';


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
            <Order />
        </MemoryRouter>
    ); 
});
