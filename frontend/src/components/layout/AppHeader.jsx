import { Layout, Select, Space, Button, Modal, Drawer, Flex } from 'antd'
import { useCrypto } from '../../context/crypto-context'
import { useContext, useEffect, useState } from 'react'
import CoinInfoModal from '../CoinInfoModal'
import AddAssetForm from '../AddAssetForm'
import { Context } from '../../main'
import { UserOutlined } from '@ant-design/icons'


const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 80,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'transparent'
}

export default function AppHeader() {
  const [select, setSelect] = useState(false)
  const [coin, setCoin] = useState(null)
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const { crypto } = useCrypto()
  const {store} = useContext(Context)

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect((prev) => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value))
    setModal(true)
  }

  return (
    <Layout.Header style={headerStyle}>

      <Flex gap='middle' align='center'>
        <Select
          style={{
            width: 250,
          }}
          open={select}
          onSelect={handleSelect}
          onClick={() => setSelect((prev) => !prev)}
          value="Статус валют"
          options={crypto.map((coin) => ({
            label: coin.name,
            value: coin.id,
            icon: coin.icon,
          }))}
          optionRender={(option) => (
            <Space>
              <img
                style={{ width: 20 }}
                src={option.data.icon}
                atl={option.data.label}
              />{' '}
              {option.data.label}
            </Space>
          )}
        />
        <Flex gap='small'>
          <UserOutlined style={{color: 'white', fontSize: 22}} />
          <p style={{color: 'white', fontSize: 20}}>
            {store.email}
          </p>
        </Flex>
      </Flex>

      <Button type="primary" onClick={() => setDrawer(true)}>
        Добавить
      </Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        width={600}
        title="Добавить валюту"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  )
}
