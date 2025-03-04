import { cryptoAssets } from './data'

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
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets)
    }, 1)
  })
}
