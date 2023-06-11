import React, { useState } from 'react';

const ReadMore = ({ content, maxCharacterCount = 100 }: any): any => {
  const [isTruncated, setIsTruncated] = useState(true);

  const resultString = isTruncated ? content.slice(0, maxCharacterCount) + '...' : content;

  const toggleIsTruncated = () => setIsTruncated(!isTruncated);

  return (
    <p>
      {resultString}
      <span onClick={toggleIsTruncated} className="text-blue-500 cursor-pointer">
        {isTruncated ? ' Read More' : ' Show Less'}
      </span>
    </p>
  );
};

export default ReadMore;
