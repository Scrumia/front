<template>
  <div>
    <router-link to="/">Requêtes</router-link>
    <router-link to="/inventaire">Inventaire</router-link>
    <router-link to="/aventurier">Aventurier</router-link>
    <router-link to="/finances">Finances</router-link>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style></style>
