<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '../store/auth';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const authStore = useAuthStore();
  const router = useRouter();
  
  const handleLogin = async () => {
    await authStore.login(email.value, password.value);
    if (authStore.user?.role === 'admin') router.push('/admin');
    else router.push('/user');
  };
  </script>