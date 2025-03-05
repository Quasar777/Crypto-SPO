import { useEffect, useState } from "react";
import { connectCryptoWebSocket } from "../../api"; // Импортируем WebSocket функцию

export default function CryptoPrices() {
  const [cryptoData, setCryptoData] = useState(null);

  useEffect(() => {
    const socket = connectCryptoWebSocket(setCryptoData);
    console.log("Data:", soket);

    return () => {
      socket.close(); // Закрываем соединение при размонтировании компонента
    };
  }, []);

  return (
    <div>
      <h2>Криптовалюты</h2>
      {cryptoData ? (
        <ul>
          {cryptoData.coins.map((coin) => (
            <li key={coin.id}>
              {coin.name}: ${coin.price.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
}
