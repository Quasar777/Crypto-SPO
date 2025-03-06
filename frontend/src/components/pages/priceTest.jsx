import { useEffect, useState } from "react";

const CryptoPrices = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8054");

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setCoins(data.result);
      } catch (error) {
        console.error("Ошибка при разборе данных WebSocket", error);
      }
    };

    ws.onopen = () => console.log("WebSocket подключен");
    ws.onclose = () => console.log("WebSocket отключен");
    ws.onerror = (error) => console.error("Ошибка WebSocket", error);

    return () => ws.close();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Криптовалютные цены</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coins.map((coin) => (
          <div key={coin.id} className="p-4 border rounded-lg shadow-md">
            <div className="flex items-center gap-3">
              <img src={coin.icon} alt={coin.name} className="w-10 h-10" />
              <h2 className="text-lg font-semibold">{coin.name} ({coin.symbol})</h2>
            </div>
            <p className="mt-2">Цена: ${coin.price.toFixed(2)}</p>
            <p>Ранг: {coin.rank}</p>
            <p>Объем: ${coin.volume.toLocaleString()}</p>
            <p>Изменение (24ч): {coin.priceChange1d}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoPrices;