import React, { useState, useEffect } from 'react';
import TagInput from '../components/TagInput';

const TagInputPage: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //responsive
  const containerStyle: React.CSSProperties = {
    padding: windowWidth <= 480 ? '1rem' : '2rem',
    maxWidth: '600px',
    margin: 'auto',
    boxSizing: 'border-box',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: windowWidth <= 480 ? '1.5rem' : '2rem',
    textAlign: 'center',
    marginBottom: '1.5rem',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Tag Input Page</h1>
      <TagInput maxTags={5} separator="-" />
    </div>
  );
};

export default TagInputPage;
