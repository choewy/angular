import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Callback } from './pages';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
