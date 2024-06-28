import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test } from 'vitest';
import Home2 from './Home2';



test('renders UserLogin component', () => {
    render(
        <MemoryRouter>
            <Home2 />
        </MemoryRouter>
    ); 
});