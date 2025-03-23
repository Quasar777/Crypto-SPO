import React, { FC, useContext, useState } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import type { FormProps } from "antd";
import classes from "./LoginFormStyles.module.css";
import { Button, Checkbox, Divider, Form, Input, Typography } from "antd";
import { Link } from "react-router";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

  return (
    <div className={classes.formWrapper}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        Авторизация
      </Typography.Title>
      <Divider style={{ margin: 10 }} />
      <Form
        name="LoginForm"
        style={{ minWidth: 400 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelAlign="left"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Введите ваш email!" }]}
        >
          <Input style={{ padding: 10, margin: 0 }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль!" }]}
        >
          <Input.Password style={{ padding: 10, margin: 0 }} />
        </Form.Item>

        <Form.Item label={null}>
          <Button
            style={{ width: "100%", padding: 20}}
            type="primary"
            htmlType="submit"
          >
            Войти
          </Button>
        </Form.Item>

        <Typography>Нет аккаунта?</Typography>
      </Form>
    </div>
  );
};

export default observer(Login);
