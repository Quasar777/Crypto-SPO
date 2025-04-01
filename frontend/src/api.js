import { useContext } from "react";
import { Context } from "./main";



export function fetchCryptoData(setData) {
  const socket = new WebSocket('ws://localhost:8054'); // Подключаемся к WebSocket-серверу

  socket.onopen = () => {
    console.log('WebSocket соединение установлено');
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      setData(data.result); // Обновляем состояние в React с новыми данными
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

export function fetchAssetsNEW() {

  return fetch('http://localhost:8054/api/userZ', {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ email: "test@mail.com" }),
    headers: { 'Content-Type': 'application/json' }
  }) // Запрос к вашему API
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




