<template>
    <div class="auth-container">
      <div class="card">
        <h2>Вход</h2>
        <form @submit.prevent="handleLogin">
          <input v-model="email" type="email" placeholder="Email" required />
          <input v-model="password" type="password" placeholder="Пароль" required />
          <button type="submit">Войти</button>
        </form>
        <p @click="$router.push('/register')">Нет аккаунта? Зарегистрируйтесь</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post('http://localhost:3000/login', {
            email: this.email,
            password: this.password
          });
  
          const token = response.data.token;
          sessionStorage.setItem('token', token);
  
          const user = JSON.parse(atob(token.split('.')[1])); // Раскодируем JWT
          if (user.role === 'admin') {
            this.$router.push('/admin');
          } else {
            this.$router.push('/user');
          }
        } catch (error) {
          alert('Ошибка: ' + error.response?.data?.message || 'Что-то пошло не так');
        }
      }
    }
  };
  </script>
  