import {render} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import {test} from 'vitest'
import SupplierRegister from './SupplierRegister'


test('userlogin test',()=>{
    render(
        <MemoryRouter>
        <SupplierRegister/>
        </MemoryRouter>
    )
})