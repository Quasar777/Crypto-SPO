import React, { useState } from "react";
import { Layout, Menu, Table, Button, Modal, Input, message, Card, Tag } from "antd";
import { UserOutlined, MessageOutlined, DashboardOutlined } from "@ant-design/icons";
import { Line } from "@ant-design/charts";

const { Header, Content, Sider } = Layout;

const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [balance, setBalance] = useState(0);

  const users = [
    { key: "1", name: "Alice", email: "alice@example.com", balance: 1200, status: "Active" },
    { key: "2", name: "Bob", email: "bob@example.com", balance: 500, status: "Blocked" },
    { key: "3", name: "Charlie", email: "charlie@example.com", balance: 800, status: "Active" },
    { key: "4", name: "David", email: "david@example.com", balance: 150, status: "Blocked" },
    { key: "5", name: "Eve", email: "eve@example.com", balance: 3000, status: "Active" },
  ];

  const chatMessages = [
    { key: "1", user: "Alice", message: "Привет! У меня вопрос по балансу." },
    { key: "2", user: "Bob", message: "Почему мой аккаунт заблокирован?" },
    { key: "3", user: "Charlie", message: "Как можно пополнить баланс?" },
  ];

  const requestsData = [
    { date: "01-04", count: 120 },
    { date: "02-04", count: 200 },
    { date: "03-04", count: 180 },
    { date: "04-04", count: 220 },
    { date: "05-04", count: 170 },
  ];

  const usersData = [
    { date: "01-04", count: 10 },
    { date: "02-04", count: 15 },
    { date: "03-04", count: 20 },
    { date: "04-04", count: 25 },
    { date: "05-04", count: 22 },
  ];

  const chartConfig = {
    data: requestsData,
    xField: "date",
    yField: "count",
    point: {
      size: 5,
      shape: "diamond",
    },
  };

  const userChartConfig = {
    data: usersData,
    xField: "date",
    yField: "count",
    point: {
      size: 5,
      shape: "circle",
    },
  };

  const userColumns = [
    { title: "Имя", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Баланс", dataIndex: "balance", key: "balance" },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>,
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, user) => (
        <>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>Изменить баланс</Button>
          {user.status === "Active" ? (
            <Button danger onClick={() => message.warning(`Пользователь ${user.name} заблокирован!`)} style={{ marginLeft: 8 }}>
              Заблокировать
            </Button>
          ) : (
            <Button type="default" onClick={() => message.success(`Пользователь ${user.name} разблокирован!`)} style={{ marginLeft: 8 }}>
              Разблокировать
            </Button>
          )}
        </>
      ),
    },
  ];

  const chatColumns = [
    { title: "Пользователь", dataIndex: "user", key: "user" },
    { title: "Сообщение", dataIndex: "message", key: "message" },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) => (
        <Button type="primary" onClick={() => message.info(`Ответ на сообщение: "${record.message}"`)}>
          Ответить
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Sider theme="dark" style={{ boxShadow: "2px 0 5px rgba(0,0,0,0.1)" }}>
        <div className="logo" style={{ color: "#fff", textAlign: "center", padding: "16px", fontSize: "18px", fontWeight: "bold" }}>
          Админ панель
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]} onClick={({ key }) => setSelectedMenu(key)}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>Главная</Menu.Item>
          <Menu.Item key="users" icon={<UserOutlined />}>Пользователи</Menu.Item>
          <Menu.Item key="chat" icon={<MessageOutlined />}>Чат</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#001529", padding: "16px", color: "#fff", fontSize: "20px", textAlign: "center" }}></Header>
        <Content style={{ margin: "16px", padding: "24px", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          {selectedMenu === "dashboard" && (
            <>
              <Card title="Количество обращений к серверу" style={{ marginBottom: 24 }}>
                <Line {...chartConfig} />
              </Card>
              <Card title="Количество пользователей" >
                <Line {...userChartConfig} />
              </Card>
            </>
          )}
          {selectedMenu === "users" && (
            <Card title="Управление пользователями" bordered={false}>
              <Table columns={userColumns} dataSource={users} pagination={{ pageSize: 5, position: ["bottomCenter"] }} bordered />
            </Card>
          )}
          {selectedMenu === "chat" && (
            <Card title="Сообщения от пользователей" bordered={false}>
              <Table 
                columns={chatColumns} 
                dataSource={chatMessages} 
                pagination={{ pageSize: 5, position: ["bottomCenter"] }} 
                bordered 
              />
            </Card>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;