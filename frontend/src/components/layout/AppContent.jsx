import { Flex, Layout, Typography } from 'antd'
import { useCrypto } from '../../context/crypto-context'
import PortfolioChart from '../PortfolioChart'
import AssetsTable from '../AssetsTable'

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: 'transparent',
  padding: '1rem',
}

export default function AppContent() {
  const { assets, crypto } = useCrypto()

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price
    return acc
  }, {})

  const portfolioProfit = assets
                          .map(asset => asset.totalProfit)
                          .reduce((acc, val) => (acc += val), 0)
                          .toFixed(2)

  return (
    <Layout.Content style={contentStyle}>
      <Flex justify='space-between'>
        <Flex  vertical>
          <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
            Цена портфеля:{' '}
            {assets
              .map((asset) => asset.amount * cryptoPriceMap[asset.id])
              .reduce((acc, v) => (acc += v), 0)
              .toFixed(2)}
            $
          </Typography.Title>
          <Typography.Title 
            level={3} 
            style={{ textAlign: 'left', color: '#fff'}}
          >    
              Общая прибыль: {' '}
              <span style={{color: portfolioProfit >= 0 ? 'lightgreen' : 'red'}}>
                {portfolioProfit}$
              </span>
          </Typography.Title>
        </Flex>
        <PortfolioChart />
      </Flex>
      <AssetsTable />
    </Layout.Content>
  )
}
