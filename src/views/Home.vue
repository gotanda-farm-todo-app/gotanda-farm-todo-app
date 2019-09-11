<template>
  <div class="todo-container">
    <div class="todo-form">
      <label>
        New Todo:
        <input type="text" v-model="newTodo" placeholder="add todo">
        <button v-on:click="addTodo">add</button>
      </label>
    </div>
    <ul class="todo-task" v-for="todo in todos">
      <li>
        <label>
          <input type="checkbox" v-on:change="stateTodo(todo)" v-model="todo.done">
          {{ todo.text }}
          <button v-on:click="deleteTodo(todo)">×</button>
        </label>
      </li>
    </ul>
    <div class="logout">
      <button v-on:click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { db } from '../main.js'

export default {
  name: 'home',
  data() {
    return {
      newTodo: "",
      todos: [],
      authUser: {}
    }
  },
  methods: {
    addTodo: function(){
      db.collection("users").doc(this.authUser.uid).collection("todos").add({
        text: this.newTodo, // テキスト
        done: false, // 完了・未完了
        createdAt: new Date() // 登録した日付
      })
      .then((docRef) => {
        db.collection("users").doc(this.authUser.uid).collection("todos").doc(docRef.id).update({
          id: docRef.id // IDを追加
        })
      })
      this.newTodo = ""
    },
    getTodo: function() {
      db.collection("users").doc(this.authUser.uid).collection("todos").onSnapshot((querySnapShot) => {
        const allTodos = [];
        querySnapShot.forEach(doc => {
          allTodos.push(doc.data())
        });
        this.todos = allTodos;
      })
    },
    stateTodo: function(todo) {
      db.collection("users").doc(this.authUser.uid).collection("todos").doc(todo.id).update(todo)
    },
    deleteTodo: function(todo) {
      db.collection("users").doc(this.authUser.uid).collection("todos").doc(todo.id).delete()
    },
    logout: function() {
      firebase.auth().signOut()
    }
  },
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authUser = user;
        this.getTodo()
      }
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next() // ユーザーログインが完了していたらコンポーネントの作成へ
        } else {
          vm.$router.push("/login") // ログインしていない場合はログイン画面へ
        }
      })
    })
  }
}
</script>