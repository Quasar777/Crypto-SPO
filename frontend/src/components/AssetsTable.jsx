import { Table } from 'antd';
import { useCrypto } from '../context/crypto-context';
import './AssetsTable.css'; // Импортируем файл со стилями
import { getReadableDate } from '../utils';

const columns = [
  {
    title: 'Валюта',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Цена (средняя), $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Кол-во',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Дата покупки:',
    dataIndex: 'date',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
];

export default function AssetsTable() {
  const { assets } = useCrypto();

  const data = assets.map((a) => ({
    key: a.id,
    name: a.name,
    price: a.price,
    amount: a.amount,
    date: getReadableDate(a.date)
  }));

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
      className="rounded-table" // Добавляем класс для стилизации
    />
  );
}