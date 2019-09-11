import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCbFIjwaXxY0YLXkVbPcj0GYFjFKGq-FQM",
  authDomain: "gf-todo-app-4da87.firebaseapp.com",
  databaseURL: "https://gf-todo-app-4da87.firebaseio.com",
  projectId: "gf-todo-app-4da87",
  storageBucket: "",
  messagingSenderId: "152161177550",
  appId: "1:152161177550:web:9c6fc3fb7597a40314259f"
};

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
