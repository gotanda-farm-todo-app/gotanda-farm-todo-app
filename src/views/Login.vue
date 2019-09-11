<template>
  <div>
    <h3>Googleアカウントでログインしてください</h3>
    <button type="button" v-on:click="login">Login</button>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  methods: {
    login: function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.$router.push("/")
      })
    }
  }
}
</script>