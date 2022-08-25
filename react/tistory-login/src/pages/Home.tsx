import React, { useEffect } from 'react';

export const Home: React.FC = () => {
  useEffect(() => {
    window.location.href = 'http://localhost:8000/auth';
  }, []);

  return <></>;
};
