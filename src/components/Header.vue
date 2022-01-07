<template>
  <div class="container">
    <img src="../assets/logo.png" />
    <!-- dans l'attente de la route de sortie il pointe vers google -->
    <a href="http://www.google.com"
      ><font-awesome-icon icon="sign-out-alt" class="icone-sortir"
    /></a>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 2px rgb(194, 192, 192) solid;
}

img {
  height: 80px;
  margin-left: 10px;
}
.icone-sortir {
  width: 45px;
  height: 45px;
  margin: auto;
  margin-right: 5px;
}
a {
  width: 70px;
}
</style>
