import { Skeleton } from '@mui/material';
import React from 'react';

export interface ImageProps {
  src: string;
  alt: string;
  fallback?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  loading?: React.ImgHTMLAttributes<HTMLImageElement>['loading'];
}

export const Image: React.FC<ImageProps> = ({ src, alt, fallback, style, onClick, loading = 'lazy' }) => {
  const [source, setSource] = React.useState(src);
  const [error, setError] = React.useState(false);

  const handleError = () => {
    if (fallback) setSource(fallback);
    setError(true);
  };

  if (!fallback && error) {
    return <Skeleton variant="rectangular" sx={style} />;
  }
  return <img src={source} onError={handleError} alt={alt} style={style} onClick={onClick} loading={loading} />;
};
