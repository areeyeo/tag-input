import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TagInput from '../components/TagInput';

describe('TagInput Component', () => {
  test('renders input and no tags initially', () => {
    render(<TagInput />);
    const input = screen.getByPlaceholderText(/enter a tag/i);
    expect(input).toBeInTheDocument();
    expect(screen.queryByText('apple')).not.toBeInTheDocument();
  });
});
