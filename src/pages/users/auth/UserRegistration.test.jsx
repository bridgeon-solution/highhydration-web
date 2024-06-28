import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test } from 'vitest';
import UserRegister from './UserRegister';

test('renders UserLogin component', () => {
    render(
        <MemoryRouter>
            <UserRegister />
        </MemoryRouter>
    ); 
});
