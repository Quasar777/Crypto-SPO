<template>
    <div class="auth-container">
      <div class="card">
        <h2>Регистрация</h2>
        <form @submit.prevent="handleRegister">
          <input v-model="email" type="email" placeholder="Email" required />
          <input v-model="password" type="password" placeholder="Пароль" required />
          <select v-model="role">
            <option value="user">Пользователь</option>
            <option value="admin">Администратор</option>
          </select>
          <button type="submit">Зарегистрироваться</button>
        </form>
        <p @click="$router.push('/login')">Уже есть аккаунт? Войдите</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        role: 'user' // Значение по умолчанию
      };
    },
    methods: {
      async handleRegister() {
        try {
          await axios.post('http://localhost:3000/register', {
            email: this.email,
            password: this.password,
            role: this.role
          });
          alert('Регистрация успешна');
          this.$router.push('/login');
        } catch (error) {
          alert('Ошибка: ' + error.response?.data?.message || 'Что-то пошло не так');
        }
      }
    }
  };
  </script>
  