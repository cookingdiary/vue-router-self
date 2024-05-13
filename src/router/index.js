import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '@/vue-router'
import HomeView from '../views/HomeView.vue'

// Vue.use放入一个函数会默认执行，当放一个类时候会报错，所以会在类上加install方法。
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'a',
        component: {
          render: (h) => <h1>a</h1>
        },
        children: [{
          path: 'child',
          component: {
            render: (h) => <h1>about</h1>
          },

        }]
      },
      {
        path: 'b',
        component: {
          render: (h) => <h1>b</h1>
        }
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((from, to, next) => {
  console.log('123 beforeEach');
  next();
})

//测试api addRoutes to routes
router.matcher.addRoutes([
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    children: [{
      path: 'd',
      component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')

    }]
  }
])

//导航路由守卫 beforeRouteLeave, beforeEach


export default router
