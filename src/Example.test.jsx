import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Example from "./Example";

describe('Example', () => {
    it('should render an h1 with the text "Hello"', () => {
        render(<Example />);
        const headingElement = screen.getByRole('heading', { level: 1 });
        expect(headingElement.textContent).toBe('Hello');
    });
});
