<template>
    <div id="app">
      <router-view />  <!-- Это место, где будут отображаться все страницы в зависимости от маршрута -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'app',
  };
  </script>
  
  <style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background: #f5f5f5;
  }
  </style>
  