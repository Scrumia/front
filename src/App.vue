<template>
  <Header v-if="seeNavbar"></Header>
  <div class="container">
    <div class="dashboard" v-if="seeNavbar">
      <router-link class="routerLink" to="/">Requêtes</router-link>
      <router-link class="routerLink" to="/aventurier">Aventurier</router-link>
    </div>
    <div class="content-app">
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
  async beforeMount() {
    const token = localStorage["token"];
    if (token !== undefined && token !== null) {
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else await this.$router.push({name: "Connexion"});
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
  margin-top: 2.5em;
  background: #e3eeff;
  height: 20vh;
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
  min-width: 157vh;
  min-height: 87vh;
  height: auto;
  padding-bottom: 2em;
  width: max-content;
  margin-right: 2em;
  border-radius: 30px;
  background: #fdfdfd;
}
</style>
