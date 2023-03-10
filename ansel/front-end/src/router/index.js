import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage';
import RegisterPage from '../views/RegisterPage';
import ProfilPage from '../views/ProfilPage';
import ProfilOther from '../views/ProfilOther'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
  },
  {
    path: '/profil',
    name: 'ProfilPage',
    component: ProfilPage,
  },
  {
    path: '/seeprofil',
    name: 'ProfilOther',
    component: ProfilOther,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
