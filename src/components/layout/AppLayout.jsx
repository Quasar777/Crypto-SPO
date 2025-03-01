import { Layout, Spin } from 'antd';
import AppHeader from './AppHeader';
import AppSider from './AppSider';
import AppContent from './AppContent';
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context';

export default function AppLayout() {
    const {loading} = useContext(CryptoContext)

    if (loading) {
        return  <Spin fullscreen />
    }

    return (
        <Layout>
            <AppHeader />
            <Layout style={{backgroundColor: 'rgb(6, 35, 57)'}}>
                <AppSider />
                <AppContent />
            </Layout>
      
        </Layout>
    )
}