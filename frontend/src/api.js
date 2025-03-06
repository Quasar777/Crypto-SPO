export function connectCryptoWebSocket(setData) {
  const socket = new WebSocket('ws://localhost:8054'); // Подключаемся к WebSocket-серверу

  socket.onopen = () => {
    console.log('WebSocket соединение установлено');
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log('WebSocket данные отправлены');
      setData(data); // Обновляем состояние в React с новыми данными
    } catch (error) {
      console.error('Ошибка при обработке данных:', error);
    }
  };

  socket.onclose = () => {
    console.log('WebSocket соединение закрыто');
  };

  socket.onerror = (error) => {
    console.error('WebSocket ошибка:', error);
  };

  return socket; // Можно использовать для закрытия соединения при размонтировании компонента
}



export async function fetchCryptoData() {
  try {
    // Отправка GET-запроса на сервер
    const response = await fetch('http://localhost:8054/api/coins');
    
    // Проверка, успешен ли запрос
    if (!response.ok) {
      throw new Error('Ошибка при получении данных');
    }
    
    // Преобразование полученных данных в формат JSON
    const data = await response.json();
    
    // Возвращаем данные
    return data;
  } catch (error) {
    // В случае ошибки выводим в консоль
    console.error('Ошибка при запросе данных:', error);
    throw error; // Можно выбросить ошибку дальше или вернуть какой-то fallback
  }
}


export function fetchAssets() {
  return fetch('http://localhost:8054/api/user') // Запрос к вашему API
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных');
      }
      return response.json(); // Парсим JSON
    })
    .then((data) => {
      return data.cryptoAssets; // Возвращаем данные из API
    })
    .catch((error) => {
      console.error('Ошибка:', error);
      throw error; // Пробрасываем ошибку, чтобы её можно было обработать
    });
}