/*jshint esversion: 6 */

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
import VueSocketio from 'vue-socket.io';
import Auth from './auth.js';

export const getHeader = function(){
   const headers = {
     'Accept' : 'application/jason',
     'Authorization': 'Bearer ' + localStorage.getItem("token")
   }
   return headers
}

Vue.use(VueRouter);
Vue.use(Auth);
Vue.use(VueSocketio, 'http://192.168.10.10:8080');
//Vue.use(VueSocketio, 'http://192.168.10.1:8080');

const user = Vue.component('user', require('./components/user.vue'));
const userEdit = Vue.component('userEdit', require('./components/userEdit.vue'));
const singleplayer_game = Vue.component('singlegame', require('./components/singleplayer_tictactoe.vue'));
const multiplayerGame = Vue.component('multiplayergame', require('./components/multiplayer_tictactoe.vue'));
const index = Vue.component('index', require('./components/index.vue'));
const createUser = Vue.component('createUser', require('./components/createUser.vue'));
const login = Vue.component('login', require('./components/login.vue'));
const mainPage = Vue.component('mainPage', require('./components/mainPage.vue'));
const admin = Vue.component('admin', require('./components/admin.vue'));
const changePassword = Vue.component('changePassword', require('./components/changePassword.vue'));
const changePlatformEmail = Vue.component('changePlatformEmail', require('./components/changePlatformEmail.vue'));
const changeAdminEmail = Vue.component('changeAdminEmail', require('./components/changeAdminEmail.vue'));
const image = Vue.component('image', require('./components/image.vue'));
const imageList = Vue.component('imageList', require('./components/imageList.vue'));
const uploadImage = Vue.component('uploadImage', require('./components/uploadImage.vue'));

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/index' },
    { path: '/users', component: user },
    { path: '/userEdit', component: userEdit },
    { path: '/createUser', component: createUser, meta:{forVisitors: true} },
    { path: '/singletictactoe', component: singleplayer_game },
    { path: '/multitictactoe', component: multiplayerGame },
    { path: '/index', component: index },
    { path: '/login', component: login, meta:{forVisitors: true}},
    { path: '/mainPage', component: mainPage, meta:{forAuth: true}},
    { path: '/admin', component: admin, meta:{forAuth: true}},
    { path: '/changePassword', component: changePassword },
    { path: '/changePlatformEmail', component: changePlatformEmail },
    { path: '/changeAdminEmail', component: changeAdminEmail },
    { path: '/images', component: image },
    { path: '/imageList', component: imageList },
    { path: '/uploadImage', component: uploadImage }
  ]
});
router.beforeEach(
  (to,from,next)=>{
    if(to.matched.some(record => record.meta.forVisitors)){
      if(Vue.auth.isAuthenticated()){
        /*if (Vue.auth.isAdmin()) {
          next({
            path: '/admin'
          })
        }else */
        next({
          path: '/mainPage'
        })
      }else next()
    }
    else if(to.matched.some(record => record.meta.forAuth)){
      if(!Vue.auth.isAuthenticated()){
        next({
          path: '/index'
        })
      }else next()
    }else next() 
  }  
)
export default router
const app = new Vue({
  router,
  data:{
    player1:undefined,
    player2: undefined,
  }
}).$mount('#app');

