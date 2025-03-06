import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useCrypto } from '../context/crypto-context';

ChartJS.register(ArcElement, Tooltip, Legend);

// Статический массив цветов
const defaultColors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
];

// Функция для генерации случайных цветов
const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 1)`;
};

export default function PortfolioChart() {
  const { assets } = useCrypto();

  // Проверка на пустые данные
  if (assets.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>No assets to display</div>;
  }

  // Генерация массива цветов
  const backgroundColors = assets.map((_, index) =>
    index < defaultColors.length ? defaultColors[index] : generateRandomColor()
  );

  const data = {
    labels: assets.map((a) => a.name),
    datasets: [
      {
        label: '$',
        data: assets.map((a) => a.totalAmount),
        backgroundColor: backgroundColors,
      },
    ],
  };

  return (
    <div
      style={{
        display: 'flex',
        marginBottom: '1rem',
        justifyContent: 'center',
        height: 400,
      }}
    >
      <Pie data={data} />
    </div>
  );
}