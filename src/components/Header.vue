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
  border-bottom: 2px rgb(194, 192, 192) solid;
}

img {
  height: 80px;
  margin-left: 10px;
}
</style>
