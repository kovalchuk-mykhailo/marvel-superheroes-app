import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CharacterInfoPage from '../pages/character-info-page/CharacterInfoPage';
import HomePage from '../pages/home-page/HomePage';
import NotFoundPage from '../pages/not-found-page/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="characters" element={<HomePage />} />
        <Route path="characters/:characterId" element={<CharacterInfoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
