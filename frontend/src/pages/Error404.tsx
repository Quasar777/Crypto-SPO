import React from 'react';

export const Error404 = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.text}>Упс! Страница, которую вы ищете, не существует.</p>
      <p style={styles.subText}>
        Возможно, она была перемещена или удалена. Попробуйте вернуться на главную страницу.
      </p>
      <a href="/" style={styles.link}>Вернуться на главную</a>
    </div>
  );
};

const styles: {[key: string]: React.CSSProperties} = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#001529',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '8rem',
    margin: '0 0 20px 0',
    fontWeight: 'bold',
    color: '#ff4d4f', // Красный цвет для заголовка
  },
  text: {
    fontSize: '2rem',
    margin: '0 0 10px 0',
    fontWeight: '500',
  },
  subText: {
    fontSize: '1.2rem',
    margin: '0 0 30px 0',
    color: '#d9d9d9', // Светло-серый цвет для дополнительного текста
  },
  link: {
    color: '#40a9ff',
    textDecoration: 'none',
    fontSize: '1.1rem',
    border: '2px solid #40a9ff',
    padding: '10px 20px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
  },
  linkHover: {
    backgroundColor: '#40a9ff',
    color: '#001529',
  },
};

export default Error404;