<template>
  <router-view />
</template>
<script>
import { core } from "./config/pluginInit";

export default {
  name: "App",
  components: {},
  mounted() {
    //core.mainIndex();
  }
};
</script>
