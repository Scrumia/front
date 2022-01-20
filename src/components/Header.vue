<template>
<div class="contenu">
  <div class="container">
    <div class="home-logo">
      <img src="../assets/logo-monochrome.svg" />
    </div>
    <div v-if="isAuth" class="auth">

    </div>
    <div v-else class="auth">
      <a href="" class="signin">
        <img src="../assets/logo-monochrome.svg" alt="">
      </a>
    </div>
  </div>
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
  width: 95%;
  justify-content: space-between;
  align-items: center;
  background: #e3eeff;
}

img {
  height: 5em;
  width: 5em;
  margin-left: 10px;
}
.contenu {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  
}

</style>
