import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test } from 'vitest';
import SupLogin from './SupLogin';

test('renders UserLogin component', () => {
    render(
        <MemoryRouter>
            <SupLogin/>
        </MemoryRouter>
    ); 
});