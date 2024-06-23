import { Route, Routes } from 'react-router-dom';
import HomePage from './pages';
import NotFound from './pages/NotFound';
import Page from './pages/page';

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/back/home" element={<HomePage />} />
      <Route path="/page" element={<Page />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouterComponent;
