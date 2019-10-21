<template>
  <main id="app">
    <FriendsList />
    <Chatbox />
  </main>
</template>

<script>
// components
// import HelloWorld from './components/HelloWorld.vue'
import FriendsList from "./components/FriendsList.vue";
import Chatbox from "./components/Chatbox.vue";

// scss
import "./assets/scss/common.scss";

export default {
  name: "app",
  components: {
    FriendsList,
    Chatbox
  }
};
</script>

<style lang="scss">
#app {
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
