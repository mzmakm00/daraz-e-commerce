<template>
  <div id="app">
    <Navbar  />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/TheNavbar.vue";
import { LocalStorageMixin } from "./mixins/mixins";
export default {
  mixins : [LocalStorageMixin],
  components: {
    Navbar,
  },
  created(){
    this.setItemInLocalStorage("isActive", false)
  }
};
</script>

<style></style>
