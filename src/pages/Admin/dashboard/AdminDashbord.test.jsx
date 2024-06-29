import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test } from 'vitest';
import AdminDashbord from './AdminDashbord';

test('renders UserLogin component', () => {
    render(
        <MemoryRouter>
          <AdminDashbord/>
        </MemoryRouter>
    ); 
});