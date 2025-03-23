import React, { useContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import LoginForm from "./components/LoginForm/LoginForm";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import UserService from "./service/UserService";
import { redirect } from "react-router";
import background from "./images/authBackgrond.webp"
import "./styles/App.css"

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  // useEffect(() => {
  //   if (store.user.isActivated) {
  //     window.location.href = "http://localhost:5173";
  //   }
  // }, [store.user.isActivated]);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!store.isAuth) {
    return (
      <div style={{ background: `url(${background}) center/cover no-repeat`, width: '100vw', height: '100vh' }}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <LoginForm />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>
        {store.isAuth
          ? `Пользователь ${store.user.email} авторизован.`
          : "Авторизуйтесь!"}
      </h1>
      <h1>
        {store.user.isActivated
          ? "Аккаунт подтвержден по почте"
          : "ПОДТВЕРДИ АККАУНТ ТВАРЬ"}
      </h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
}

export default observer(App);
