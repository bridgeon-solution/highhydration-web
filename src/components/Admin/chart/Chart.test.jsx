import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test } from 'vitest';
import AdminChart from './AdminChart';

test('renders AdminChart component', () => {
    render(
        <MemoryRouter>
            <AdminChart/>
        </MemoryRouter>
    ); 
});