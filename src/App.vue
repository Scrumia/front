<template>
  <Header></Header>
  <div class="container">
    <div class="dashboard">
      <router-link class="routerLink" to="/">Requêtes</router-link>
      <router-link class="routerLink" to="/inventaire">Inventaire</router-link>
      <router-link class="routerLink" to="/aventurier">Aventurier</router-link>
      <router-link class="routerLink" to="/finances">Finances</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  components: { Header },
  name: "App",
  component: {
    Header,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  display: flex;
  margin: auto;
}
.dashboard {
  background-color: #c4c4c4;
  height: 100vh;
  width: 30vh;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

a {
  font-size: 24px;
  padding: 10px 40px;
  justify-content: center;
  text-decoration: none;
  display: flex;
  width: 100%;
  transition: all 0.8s ease;
}

a:hover {
  background: rgb(139, 136, 138);
}
</style>
