import { Layout, Spin } from 'antd';
import AppHeader from '../layout/AppHeader';
import AppSider from '../layout/AppSider';
import AppContent from '../layout/AppContent';
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context';
import '../../styles/App.css';
import Counter from '../COUNTER';

export default function AppLayout() {
  const { loading } = useContext(CryptoContext)

  if (loading) {
    return <Spin fullscreen />
  }

  return (
      <Layout style={{backgroundColor: "#001529"}}>
        <AppHeader />
        <Layout className="AppLayoutBg">
          <AppSider />
          <AppContent />
          <Counter />
        </Layout>
        
      </Layout>
  )
}
