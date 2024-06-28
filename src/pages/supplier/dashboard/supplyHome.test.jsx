import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SupplyHome from './SupplyHome';
import '@testing-library/jest-dom/extend-expect';

test('renders SupplyHome component', () => {
    render(
        <MemoryRouter>
            <SupplyHome />
        </MemoryRouter>
    ); 
});
