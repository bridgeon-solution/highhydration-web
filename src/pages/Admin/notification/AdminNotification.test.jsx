import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test } from 'vitest';
import AdminNotification from './AdminNotification';

test('renders UserLogin component', () => {
    render(
        <MemoryRouter>
          <AdminNotification/>
        </MemoryRouter>
    ); 
});