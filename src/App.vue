<template>
  <div id="app">

    <TopMenu />

    <div class="content-wrapper">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import TopMenu from './components/TopMenu.vue'

export default {
  name: "App",
  components: {
    TopMenu
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=PT+Sans&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  padding: 24px;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  background-color: #dadada;
}

.content-wrapper {
  padding-top: 50px;
}

* {
  box-sizing: border-box;
}
</style>
