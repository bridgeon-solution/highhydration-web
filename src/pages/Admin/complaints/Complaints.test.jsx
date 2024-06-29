import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test } from 'vitest';
import Complaints from './Complaints';

test('renders UserLogin component', () => {
    render(
        <MemoryRouter>
          <Complaints/>
        </MemoryRouter>
    ); 
});