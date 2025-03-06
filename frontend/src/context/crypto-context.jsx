import { createContext, useState, useEffect, useContext } from 'react';
import { fetchCryptoData, fetchAssets } from '../api'; // Убедитесь, что fetchCryptoData теперь работает с WebSocket
import { percentDifference } from '../utils';

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  // Функция для преобразования assets с учетом новых данных
  function mapAssets(assets, cryptoData) {
    return assets.map((asset) => {
      const coin = cryptoData.find((c) => c.id === asset.id);
      if (!coin) return asset; // Если данные по монете не найдены, возвращаем исходный asset

      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };
    });
  }

  useEffect(() => {
    // Загрузка начальных данных (assets)
    async function loadInitialData() {
      setLoading(true);
      const assets = await fetchAssets(); // Загружаем assets из API
      setAssets(assets); // Устанавливаем начальные данные для assets
      setLoading(false);
    }

    loadInitialData();
  }, []);

  useEffect(() => {
    // Подключение к WebSocket
    const socket = fetchCryptoData((newData) => {
      // newData — это данные, полученные через WebSocket
      setCrypto(newData); // Обновляем состояние crypto
      setAssets((prevAssets) => mapAssets(prevAssets, newData)); // Обновляем assets на основе новых данных
    });

    // Закрытие соединения при размонтировании компонента
    return () => {
      socket.close();
    };
  }, []);

  // Функция для добавления нового актива
  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

// Хук для использования контекста
export function useCrypto() {
  return useContext(CryptoContext);
}
