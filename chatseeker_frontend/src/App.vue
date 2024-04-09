<!-- <template>
  <div
    style="display: flex; flex-direction: row; height: 100%; width: 100%; background-color: white; position: relative;">
    <router-view style="height: 100%; width: 100%;" />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
app-footer {
  position: fixed;
  bottom: 0;
  width: 80%;
  background-color: #f8f9fa;
}
</style> -->

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: white; /* 可以移动到这里来设置背景色 */
}
</style>