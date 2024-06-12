import React from 'react';

interface PreTagProps {
  content: string;
}

const PreTag: React.FC<PreTagProps> = ({ content }) => {
  return <pre>{content}</pre>;
};

export default PreTag;
