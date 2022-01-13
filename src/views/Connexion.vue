<template>
  <div class="block">
    <img class="logo" src=/assets/logo.svg alt="icon niveau" height="10em" width="10em"/>
    <div>
      <input type="text" v-model="model.email" placeholder="Email">
      <input type="password" v-model="model.password" placeholder="Mot de passe">
      <button v-on:click="login()">Se connecter</button>
    </div>
  </div>
</template>

<script>
import {ElNotification} from "element-plus";

export default {
  name: "Connexion",
  data() {
    return {
      validCredentials: {
        email: "admin@scrumia.com",
        password: "admin44"
      },
      model: {
        email: "",
        password: ""
      },
      loading: false,
    };
  },
  methods: {
    async login() {
      console.log('login');
      this.loading = true;
      const body = {
        email: this.model.email,
        password: this.model.password
      }
      const response = await this.axios.post("https://api-capuche-dopale.herokuapp.com/login", body ).catch((err) => {
        this.loading= false;
        ElNotification.error({
          title: 'Error',
          message: `Username or password is invalid ${err}`,
          offset: 100,
        })
      });
      console.log(response)
      if(response.status === 401){
        this.loading = false;
        ElNotification.error({
          title: 'Error',
          message: 'Username or password is invalid',
          offset: 100,
        });
      }
      if (
          response.status === 201
      ) {
        console.log('response : ', response);
        window.localStorage.setItem('token', response.data.token);
        this.loading = false;
        ElNotification.success({
          title: 'Success',
          message: 'Login successful',
          offset: 100,
        });
        await this.$router.push({name: "ConfigGame"});
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
input {
  background-color: white;
  border-radius: 12px;
  margin: 1.5em 3em 1.5em 3em;
  padding: 1em;
  width: 27em;
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
  width: 27em;
  border-radius: 12px;
  border: none;
  margin: 1.5em 3em 1.5em 3em;
  padding: 1em;
  width: 29em;
  box-shadow: 3px 5px 5px #b5b5b5;
}
</style>
