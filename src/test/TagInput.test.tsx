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

  test('adds tag with Enter', () => {
    render(<TagInput />);
    const input = screen.getByPlaceholderText(/enter a tag/i);

    fireEvent.change(input, { target: { value: 'jennie' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByText('jennie')).toBeInTheDocument();
  });

  test('prevents duplicate tags', () => {
    render(<TagInput />);
    const input = screen.getByPlaceholderText(/enter a tag/i);

    fireEvent.change(input, { target: { value: 'lisa' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    fireEvent.change(input, { target: { value: 'lisa' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const allTags = screen.getAllByText('lisa');
    expect(allTags.length).toBe(1);
  });

  test('removes tag with × button', () => {
    render(<TagInput />);
    const input = screen.getByPlaceholderText(/enter a tag/i);

    fireEvent.change(input, { target: { value: 'Cristina' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const removeButton = screen.getByLabelText('Remove Cristina');
    fireEvent.click(removeButton);

    expect(screen.queryByText('Cristina')).not.toBeInTheDocument();
  });

  test('adds multiple tags with separator', () => {
    render(<TagInput separator="," />);
    const input = screen.getByPlaceholderText(/enter a tag/i);

    fireEvent.change(input, { target: { value: 'a, b, c' } });
    fireEvent.keyDown(input, { key: ',' });

    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
    expect(screen.getByText('c')).toBeInTheDocument();
  });

  test('limits tags when maxTags is reached', () => {
    render(<TagInput maxTags={2} />);
    const input = screen.getByPlaceholderText(/enter a tag/i);

    fireEvent.change(input, { target: { value: '1' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    fireEvent.change(input, { target: { value: '2' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    fireEvent.change(input, { target: { value: '3' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByText(/maximum allowed tags/i)).toBeInTheDocument();
  });
});