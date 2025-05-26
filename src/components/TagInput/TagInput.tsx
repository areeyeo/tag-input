import React, { useState, KeyboardEvent, ChangeEvent, FocusEvent } from 'react';

interface TagInputProps {
  maxTags?: number;
  separator?: string;
}

const TagInput: React.FC<TagInputProps> = ({ maxTags = 10, separator = ',' }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      border: '1px solid #ccc',
      padding: '8px',
      borderRadius: '6px',
      gap: '6px',
      minHeight: '40px',
      fontFamily: 'Prompt, sans-serif',
    } as React.CSSProperties,
    tag: {
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
      padding: '4px 8px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
    } as React.CSSProperties,
    remove: {
      background: 'none',
      border: 'none',
      marginLeft: '6px',
      cursor: 'pointer',
      fontWeight: 'bold',
      color: '#888',
    } as React.CSSProperties,
    input: {
      flex: 1,
      minWidth: '120px',
      border: 'none',
      outline: 'none',
      fontSize: '14px',
      fontFamily: 'Prompt, sans-serif',
    } as React.CSSProperties,
  };

  const addTag = (value: string) => {
    const rawTags = value
      .split(separator!)
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    let newTags = [...tags];

    for (const tag of rawTags) {
      if (newTags.includes(tag)) continue;
      if (newTags.length >= maxTags) break;
      newTags.push(tag);
    }

    setTags(newTags);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === separator) {
      e.preventDefault();
      addTag(inputValue);
      setInputValue('');
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (inputValue.trim()) {
      addTag(inputValue);
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div style={styles.container}>
      {tags.map((tag, index) => (
        <span key={index} style={styles.tag}>
          {tag}
          <button
            type="button"
            onClick={() => removeTag(index)}
            style={styles.remove}
            aria-label={`Remove ${tag}`}
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder="Type and press Enter..."
        style={styles.input}
      />
    </div>
  );
};

export default TagInput;
