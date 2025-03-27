import React, { FC, useContext, useState } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import type { FormProps } from "antd";
import classes from "./LoginFormStyles.module.css";
import { Button, Divider, Form, Input, Typography } from "antd";
import RegForm from "../RegForm/RegForm";

type FieldType = {
  email: string;
  password: string;
};


const LoginForm: FC = () => {
  const {store} = useContext(Context);

  const onFinish: FormProps<FieldType>["onFinish"] = ({email, password}) => {
    store.login(email, password);
  };
  
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
        
          rules={[{ type: 'email', required: true, message: "Введите ваш email!" }]}
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
      </Form>
    </div>
  );
};

export default observer(LoginForm);
