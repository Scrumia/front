<template>
  <div class="contenu">
    <div class="container">
      <div class="home-logo">
        <img src="../assets/logo-monochrome.svg" />
      </div>
      <label>{{ this.utilisateurNom }}</label>
      <div class="auth">
        <a href="">
          <img src="../assets/logo-monochrome.svg" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      utilisateurNom: "",
    };
  },
  beforeMount() {
    const user = localStorage.getItem("currentUserName");
    if (user !== null && user !== undefined) this.utilisateurNom = user;
  },
};
</script>

<style scoped>
.container {
  display: flex;
  width: 95%;
  justify-content: space-between;
  align-items: center;
  background: #e3eeff;
}

img {
  height: 8vh;
}
.contenu {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
}
label {
  font-size: 25px;
  font-weight: bold;
}
</style>
