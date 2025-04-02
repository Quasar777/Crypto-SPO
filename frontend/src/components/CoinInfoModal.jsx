import { Flex, Tag, Typography, Divider } from 'antd'
import CoinInfo from './CoinInfo'

export default function CoinInfoModal({ coin }) {
  return (
    <>
      <CoinInfo coin={coin} withSymbol />
      <Divider />
      
      <Typography.Paragraph>
        <Flex justify='space-between'>
          <div>
            <Typography.Text strong>1 час: </Typography.Text>
            <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>
              {coin.priceChange1h}%
            </Tag>
          </div>
          <div>
            <Typography.Text strong>1 день: </Typography.Text>
            <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>
              {coin.priceChange1d}%
            </Tag>
          </div>
          <div>
            <Typography.Text strong>1 неделя: </Typography.Text>
            <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>
              {coin.priceChange1w}%
            </Tag>
          </div>
        </Flex>
      </Typography.Paragraph>
      
      <Typography.Paragraph>
        <Typography.Text strong>Цена: </Typography.Text>
        {coin.price.toFixed(2)}$
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Цена в BTC: </Typography.Text>
        {coin.priceBtc}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Капитализация: </Typography.Text>
        {coin.marketCap}$
      </Typography.Paragraph>
      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong>Контрактный адрес: </Typography.Text>
          {coin.contractAddress}
        </Typography.Paragraph>
      )}
    </>
  )
}
