import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../components/Home.vue'
import usersView from '../components/Users.vue'
import userView from '../components/User.vue'
import registerView from '../components/Register.vue'
import deleteView from '../components/Delete.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: homeView,
    },
    {
      path: '/users',
      component: usersView,
    },
    {
      path: '/users/register',
      component: registerView,
    },
    {
      path: '/users/delete',
      component: deleteView,
    },
    {
      path: '/user/:id',
      component: userView,
      props: true
    },
  ]
})

export default router