<template>
  <div class="container">
    <img src="../assets/logo.png" />
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
}

img {
  height: 60px;
}
</style>
