import React, { useState } from 'react';

const placeholderDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>
  <rect width='100%' height='100%' fill='%23f3f4f6'/>
  <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23959e9f' font-family='Arial, Helvetica, sans-serif' font-size='20'>No Image</text>
</svg>`)}; 

export default function ImageWithFallback({ src, alt = '', className = '', style = {}, ...rest }) {
  const [currentSrc, setCurrentSrc] = useState(src || placeholderDataUri);

  const handleError = () => {
    if (currentSrc !== placeholderDataUri) setCurrentSrc(placeholderDataUri);
  };

  return (
    <img src={currentSrc} alt={alt} className={className} style={style} onError={handleError} {...rest} />
  );
}
