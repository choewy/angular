import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const Callback: React.FC = () => {
  const query = useSearchParams();
  console.log(query);

  return <div>Callback</div>;
};
