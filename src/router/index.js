import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/auth/login.vue';
import Register from '../views/auth/register.vue';
import UserDashboard from '../views/user/userDashboard.vue';
import AdminDashboard from '../views/admin/adminDashboard.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/user', component: UserDashboard, meta: { requiresAuth: true, role: 'user' } },
  { path: '/admin', component: AdminDashboard, meta: { requiresAuth: true, role: 'admin' } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');
  if (to.meta.requiresAuth) {
    if (!token) {
      return next('/login');
    }

    const user = JSON.parse(atob(token.split('.')[1])); // Раскодируем JWT
    if (to.meta.role && user.role !== to.meta.role) {
      return next('/login'); // Запрещаем доступ к чужим разделам
    }
  }
  next();
});

export default router;
