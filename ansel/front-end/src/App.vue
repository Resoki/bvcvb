<template>
  <SearchBar />
  <router-view />
</template>

<script>
import SearchBar from "../src/components/SearchBar.vue";
export default {
  name: "App",
  components: { SearchBar },
};
</script>

<style>
#app {
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
