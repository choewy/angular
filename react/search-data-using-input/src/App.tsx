import React, { ChangeEvent, useEffect, useState } from 'react';
import { Manager } from './interfaces';
import { managers } from './data';

const App: React.FC = () => {
  const [rows, setRows] = useState<Manager[]>([]);
  const [results, setResults] = useState<Manager[]>([]);

  useEffect(() => {
    setRows(managers);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    if (value === '') {
      return setResults([]);
    }

    setResults(rows.filter((row) => row.name.includes(value)));
  };

  return (
    <div>
      <input onChange={handleInputChange} />
      <div>
        {results.map((result) => (
          <div>
            {result.name}({result.id} | {result.account})
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
