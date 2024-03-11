import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import user from '../views/User.vue'
import mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Main',
    // component: AboutView
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    redirect:"/home",
    children: [
      // { path: '/home',name: 'home',component: HomeView},
      // { path: '/user',name: 'user',component: user},
      // { path: '/mall',name: 'mall',component: mall},
      // { path: '/Page1',name: 'page1',component: PageOne},
      // { path: '/Page2',name: 'page2',component: PageTwo}
    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/403',
    name:'403',
    component: () => import('../views/403.vue')
  },
]

const router = new VueRouter({
  routes
})

// 导航守卫
router.beforeEach((to,from,next)=>{
  console.log("===========username",sessionStorage.getItem('username'))
  const username=sessionStorage.getItem('username');
  const token=sessionStorage.getItem("token")
  if(!token && to.name!=='login'){
    console.log("===========222")
    next({name:'login'})
  }else if(token && to.name==='login'){
    console.log("===========333")
    next({name:'home'})
  // }else if(token && username==='user' && (to.name=='user' || to.name.indexOf('page')!=-1)){
  //   next({name:'403'})
  }else{
    next();
  }
})

export default router
