import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserLogin from './UserLogin';
import { test } from 'vitest';

test('renders UserLogin component', () => {
    render(
        <MemoryRouter>
            <UserLogin />
        </MemoryRouter>
    ); 
});
