<template>
  <div>
    <Header v-if="seeNavbar"></Header>
    <div class="container">
      <div class="dashboard" v-if="seeNavbar">
        <router-link class="routerLink" to="/">Requêtes</router-link>
        <router-link class="routerLink" to="/inventaire">Inventaire</router-link>
        <router-link class="routerLink" to="/aventurier">Aventurier</router-link>
        <router-link class="routerLink" to="/finances">Finances</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  components: {Header},
  name: "App",
  computed: {
    seeNavbar() {
      return this.$route?.name !== "Connexion";
    }
  },
};
</script>

<style>
body {
  background-color: #F6F2ED;
}
/* router-link est pris par vue comme la balise a */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  display: flex;
  width: 100%;
  margin: auto;
}
.dashboard {
  background-color: #c4c4c4;
  height: 100vh;
  width: 30vh;
  padding: 5px;
  display: flex;
  flex-direction: column;
}

a {
  font-size: 24px;
  padding: 10px 15px;
  justify-content: flex-start;
  text-decoration: none;
  color: black;
  display: flex;
  width: 100%;
  transition: all 0.8s ease;
}

a:hover {
  background: rgb(139, 136, 138);
}
a:active {
  background: #806969;
  color: #7c7878;
}
a:visited {
  background: #7c7878;
  color: none;
}
</style>
