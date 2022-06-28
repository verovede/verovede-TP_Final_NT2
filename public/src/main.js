import Vue from 'vue'
import App from './App.vue'


//import Router
import { router } from './router'

//import estilos
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery'
import 'popper.js'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons'



//import form
import './form'

//import AXIOS
import './axios'

//import VUEX
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

