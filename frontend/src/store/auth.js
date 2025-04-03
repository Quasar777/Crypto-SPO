import { defineStore } from 'pinia';
import axios from 'axios';
import * as jwtDecode from 'jwt-decode';


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    async login(email, password) {
      try {
        const res = await axios.post('api/login', { email, password });
        this.accessToken = res.data.accessToken;
        this.user = { email, role: jwtDecode(this.accessToken).role };
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
      } catch (error) {
        console.error('Login failed', error);
      }
    },
    async register(email, password, role) {
      try {
        await axios.post('api/register', { email, password, role });
      } catch (error) {
        console.error('Registration failed', error);
      }
    },
    logout() {
      this.accessToken = null;
      this.user = null;
      delete axios.defaults.headers.common['Authorization'];
    },
  },
});