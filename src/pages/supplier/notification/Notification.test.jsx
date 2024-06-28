import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Notification from './Notification'
import '@testing-library/jest-dom/extend-expect';

test('renders SupplyHome component', () => {
    render(
        <MemoryRouter>
            <Notification />
        </MemoryRouter>
    ); 
});
