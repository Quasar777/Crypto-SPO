import { createContext, useState, useEffect, useContext } from 'react';
import { fetchCryptoData, fetchAssets, fetchAssetsNEW } from '../api'; // Убедитесь, что fetchCryptoData теперь работает с WebSocket
import { percentDifference } from '../utils';
import axios from 'axios';
import $api from '../../http';

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
      if (!coin) return asset; 

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
      const assets = await fetchAssetsNEW();
      setAssets(assets); 
      setLoading(false);
    }

    loadInitialData();
  }, []);

  useEffect(() => {
    // Подключение к WebSocket
    const socket = fetchCryptoData((newData) => {      
      setCrypto(newData); 
      setAssets((prevAssets) => mapAssets(prevAssets, newData));
    });

    return () => {
      socket.close();
    };
  }, []);

  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  async function addAssetNEW(newAsset) {
    try {
      $api.post('/addasset', {
        email: "test@mail.com",
        id: newAsset.id,
        amount: newAsset.amount,
        price: newAsset.price,
        date: newAsset.date
      })
    
      setLoading(true);
      const updatedAssets = await fetchAssetsNEW();
      setAssets(updatedAssets);
      setLoading(false);

    } catch(e) {
      console.log("adding new asset error: ", e)
    }
    
    
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAssetNEW }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

// Хук для использования контекста
export function useCrypto() {
  return useContext(CryptoContext);
}
