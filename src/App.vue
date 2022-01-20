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
  font-family: Montserrat;
}
.container {
  display: flex;
  width: 100%;
  margin: auto;
}
.dashboard {
  background: #e3eeff;
  height: 40vh;
  width: 20vh;
  padding: 5px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
}

.routerLink {
  font-size: 20px;
  padding: 10px 15px;
  justify-content: flex-start;
  text-decoration: none;
  font-family: Montserrat;
  font-weight: bold;
  color: #000000;
  display: flex;
  width: 100%;
  transition: all 0.8s ease;
  margin: 1px;
}

.routerLink:hover {
  background: #ffffff;
  border-radius: 15px;
}

.content-app {
  display: flex;
  height: 87vh;
  width: 157vh;
  border-radius: 30px;
  background: #fdfdfd;
}
</style>
