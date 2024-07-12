import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test, vi } from 'vitest';
import AdminChatModal from './AdminChatModal';


vi.mock('../../../zustand/useConversation', () => ({
    default: () => ({
        conversations: [],
        setConversations: vi.fn(),
    }),
}));


vi.mock('./AdminMessages', () => ({
    __esModule: true,
    default: () => <div>AdminMessages</div>,
}));

vi.mock('./AdminInput', () => ({
    __esModule: true,
    default: () => <div>AdminInput</div>,
}));

test('renders AdminChatModal component', () => {
    const closeModal = vi.fn();

    render(
        <MemoryRouter>
            <AdminChatModal closeModal={closeModal} />
        </MemoryRouter>
    );

    expect(screen.getByText('Chat')).toBeInTheDocument();
    expect(screen.getByText('Start a conversation with us!')).toBeInTheDocument();
    expect(screen.getByText('AdminMessages')).toBeInTheDocument();
    expect(screen.getByText('AdminInput')).toBeInTheDocument();
});
