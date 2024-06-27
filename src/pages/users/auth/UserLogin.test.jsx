import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserLogin from './UserLogin';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { describe, it, expect, vi } from "vitest";
import api from "../../../axiosInterceptors";

vi.mock('axios');

describe('UserLogin Component', () => {
    it('renders login form and handles submit', async () => {
        
        api.post.mockResolvedValue({
            status: 200,
            data: {
                accessToken: 'mockAccessToken',
                refreshToken: 'mockRefreshToken',
                login: { _id: 'mockUserId' }
            }
        });

        render(
            <BrowserRouter> 
                <UserLogin />
            </BrowserRouter>
        );

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        const loginButton = screen.getByText('Login In');
        fireEvent.click(loginButton);

        // Assuming you have a loader element with data-testid="loader"
        const loaderElement = screen.getByTestId('loader');
        expect(loaderElement).toBeInTheDocument();

        // Wait for the loader to be removed and for the navigation to happen
        await waitFor(() => {
            expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
        });

        // Verify if the tokens are set in localStorage
        expect(localStorage.getItem('access_token')).toBe('mockAccessToken');
        expect(localStorage.getItem('refresh_token')).toBe('mockRefreshToken');
        expect(localStorage.getItem('userId')).toBe('mockUserId');

        // Clean up mock after test
        vi.restoreAllMocks(); // Restore mocked functions to original implementation
    });
});
