<template>
  <div class="wrapper">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "EmptyPage",
  props: {
    message: {
      type: String,
      default: "Пустая страница"
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 450px;
}

.wrapper p {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 22px;
}
</style>