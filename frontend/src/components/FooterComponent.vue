<script setup lang="ts">
import LinkedAccount from './LinkedAccount.vue'
</script>

<template>
  <v-footer class="footer-gradient text-center py-8">
    <v-container class="px-4 px-md-8">
      <v-row>
        <v-col cols="12">
          <div class="mb-6">
            <LinkedAccount variant="icons-only" />
          </div>
          <p class="text-white text-body-1 mb-0">
            © {{ new Date().getFullYear() }} <strong>plumiume.com</strong> — Material Kit Design をベースに構築
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
/* Footer Gradient */
.footer-gradient {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%);
}
</style>
