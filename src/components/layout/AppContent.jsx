import { Layout, Typography } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import PortfolioChart from './PortfolioChart';
import AssetsTable from './AssetsTable';

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#0958d9',
    borderRadius: '1rem 0 0 0 ',
  };

export default function AppContent() {
    const {assets, crypto} = useCrypto()

    return (
      <Layout.Content style={contentStyle}>
        <Typography.Title style={{textAlign: 'left', color: '#fff', margin: '1rem'}} level={3}>
          Portfolio: ${assets.reduce((acc, {totalAmount}) => acc + totalAmount, 0).toFixed(2)}
        </Typography.Title>
        <PortfolioChart />
        <AssetsTable />
      </Layout.Content>)
}