import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store/index'


const BlankLayout = () => import('../layouts/BlankLayout')

const UserList = () => import('../views/admin/users/List')
const UserCreate = () => import('../views/admin/users/Create')
const UserEdit = () => import('../views/admin/users/Edit')


Vue.use(VueRouter)

const host = window.location.host;
const parts = host.split('.');
var routes = null;

const websiteRoutes = (prop) => [
  {
    path: '/',
    name: prop + '.users.list',
    meta: { auth: true, name: 'List', layout: 'website' },
    component: UserList
  },
  {
    path: 'users/create',
    name: prop + '.users.create',
    meta: { auth: true, name: 'Create User', layout: 'website' },
    component: UserCreate
  },
  {
    path: 'users/:id/edit',
    name: prop + '.users.edit',
    meta: { auth: true, name: 'Edit User', layout: 'website' },
    component: UserEdit
  }
]

routes = [
  {
    path: '/',
    name: 'website.list',
    component: BlankLayout,
    meta: { auth: false },
    children: websiteRoutes('website')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.MIX_SENTRY_DSN_INDEX,
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router