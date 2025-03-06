import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CryptoContextProvider } from './context/crypto-context';
import MainPage from './components/pages/mainPage';
import PriceTest from './components/pages/priceTest';
import UserTest from './components/pages/userTest';
import Error404 from './components/pages/Error404';

export default function App() {
  return (
    <CryptoContextProvider>
      <Router>
        <Routes>
          {/* Маршрут для главной страницы */}
          <Route path="/" element={<MainPage />} />
          {/* Маршрут для страницы "О нас" */}
          <Route path="/price" element={<PriceTest />} />
          {/* Маршрут для страницы тест*/}
          <Route path="/user" element={<UserTest />} />
          {/* Маршрут для страницы 404 */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </CryptoContextProvider>
  );
}