import React, {FC, useContext, useState} from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";


const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('') 
    const [password, setPassword] = useState<string>('') 
    const {store} = useContext(Context)

    return (
        <div className="container">
            <div className="form-box">
                <h2>Вход / Регистрация</h2>
                <input
                    className="input"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    placeholder="Email"
                />
                <input
                    className="input"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Пароль"
                />
                <button className="button login" onClick={() => store.login(email, password)}>
                    Логин
                </button>
                <button className="button register" onClick={() => store.registration(email, password)}>
                    Регистрация
                </button>
            </div>
        </div>     
    );
};

export default observer(LoginForm);