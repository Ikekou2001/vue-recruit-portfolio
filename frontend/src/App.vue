<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import Vw100Div from './components/Vw100Div.vue'
</script>

<template>
  <v-app>
    <HeaderComponent />

    <v-main>
      <vw100-div />
      <router-view />
    </v-main>

    <FooterComponent />
  </v-app>
</template>

<style scoped>
/* Smooth Transitions */
* {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
