<template>
  <div id="app">
    <MainPage />
  </div>
</template>

<script>
  import MainPage from './views/MainPage.vue';
  export default {
    name: 'app',
    components: {
      MainPage,
    },
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #F3F3F3;
  }
</style>
