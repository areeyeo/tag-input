import React from 'react';
import TagInput from '../components/TagInput/TagInput';

const TagInputPage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Tag Input Page</h1>
      <TagInput maxTags={5} separator="," />
    </div>
  );
};

export default TagInputPage;
