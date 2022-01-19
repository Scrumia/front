<template>
  <div class="super-block">
    <div class="block">
      <img class="logo" src=/assets/logo.svg alt="icon niveau" height="180" width="180"/>
      <div>
        <input type="text" v-model="model.email" placeholder="Email">
        <input type="password" v-model="model.password" placeholder="Mot de passe">
        <button v-on:click="login()">Se connecter</button>
      </div>
    </div>
  </div>
</template>

<script>
import {ElNotification} from "element-plus";

export default {
  name: "Connexion",
  el: '#App',
  data() {
    return {
      model: {
        email: "",
        password: ""
      },
      isAuth: false,
    };
  },
  created() {
    this.load();
  },
  methods: {
    async auth() {
      this.isAuth = true;
      console.log('auth is call');
    },
    async load() {
      window.localStorage.setItem('isAuth', 'false');
    },
    async login() {
      const body = {
        email: this.model.email,
        password: this.model.password
      }
      const response = await this.axios.post("https://api-capuche-dopale.herokuapp.com/login", body ).catch((err) => {
        ElNotification.error({
          title: 'Error',
          message: `Username or password is invalid ${err}`,
          offset: 100,
        })
      });
      if(response.status === 401){
        ElNotification.error({
          title: 'Error',
          message: 'Username or password is invalid',
          offset: 100,
        });
      }
      if (
          response.status === 200
      ) {
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('currentUser', response.data.user);
        window.localStorage.setItem('isAuth', 'true');
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        this.isAuth = true;
        await this.$router.push({name: "Home"});
      } else {
        ElNotification.error({
          title: 'Error',
          message: 'Username or password is invalid',
          offset: 100,
        });
      }
    }
  }
}
</script>

<style scoped>
.block {
  background-color: white;
  border-radius: 12px;
  border: none;
  box-shadow: 3px 5px 5px #b5b5b5;
  height: 30em;
  width: 30em;
  margin: 5em;
}
.super-block {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
input {
  background-color: white;
  border-radius: 12px;
  margin: 1.5em 3em 1.5em 3em;
  padding: 1em;
  width: 30em;
  border: 1px solid #b5b5b5;
  box-shadow: 3px 5px 5px #b5b5b5;
  flex-grow: 1;
}
button {
  background-color: #94ABDD;
  color: white;
  border-radius: 12px;
  margin: 1.5em 3em 1.5em 3em;
  padding: 1em;
  width: 30em;
  border-radius: 12px;
  border: none;
  margin: 1.5em 3em 1.5em 3em;
  padding: 1em;
  width: 29em;
  box-shadow: 3px 5px 5px #b5b5b5;
}
.logo {
  margin: 1.5em auto 0em auto;
}
</style>
