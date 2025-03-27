import React, { useContext, useEffect, useState } from "react";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import background from "./images/authBackgrond.webp"
import "./styles/App.css"
import RegForm from "./components/RegForm/RegForm";

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  useEffect(() => {
    if (store.user.isActivated) {
      window.location.href = "http://localhost:5173";
    }
  }, [store.user.isActivated]);


  if (store.isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!store.isAuth) {
    return (
      <div style={{ background: `url(${background}) center/cover no-repeat`, width: '100vw', height: '100vh' }}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <RegForm />
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
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
}

export default observer(App);
