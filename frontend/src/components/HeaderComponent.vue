<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useTheme } from 'vuetify'
import { computed, ref } from 'vue'
import plumiumeIcon from '@/assets/plumiume-icon.jpg'

const theme = useTheme()
const drawer = ref(false)

// 現在のテーマがダークモードかどうかを判定
const isDark = computed(() => theme.global.current.value.dark)

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}

const navItems = [
  { name: 'ホーム', route: 'Home', icon: 'mdi:home' },
  { name: 'プロジェクト', route: 'Projects', icon: 'mdi:folder-multiple' },
  { name: 'スキル', route: 'Skills', icon: 'mdi:trophy' },
  { name: 'お問い合わせ', route: 'Contact', icon: 'mdi:email' }
]
</script>

<template>
  <v-app-bar
    :elevation="2"
    class="px-0"
    color="surface"
    prominent
    flat
  >
    <v-container class="d-flex align-center px-4">
      <!-- Logo (always visible - high priority) -->
      <v-app-bar-title class="text-h5 font-weight-bold">
        <router-link to="/" class="logo-link d-flex align-center" style="text-decoration: none; color: inherit;">
          <v-avatar size="40" class="mr-3">
            <v-img :src="plumiumeIcon" alt="plumiume icon" cover></v-img>
          </v-avatar>
          <span class="d-none d-sm-inline">plumiume.com</span>
        </router-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- Desktop Navigation (hidden on mobile) -->
      <div class="d-none d-md-flex align-center">
        <v-btn
          v-for="item in navItems"
          :key="item.route"
          variant="text"
          :to="{ name: item.route }"
        >
          {{ item.name }}
        </v-btn>

        <v-btn
          @click="toggleTheme"
          variant="text"
          icon
        >
          <Icon :icon="isDark ? 'mdi:moon-waning-crescent' : 'mdi:white-balance-sunny'" width="24" height="24" />
        </v-btn>
      </div>

      <!-- Mobile Navigation (hamburger menu) -->
      <div class="d-flex d-md-none align-center">
        <v-btn
          @click="toggleTheme"
          variant="text"
          icon
        >
          <Icon :icon="isDark ? 'mdi:moon-waning-crescent' : 'mdi:white-balance-sunny'" width="24" height="24" />
        </v-btn>
        <v-btn
          @click="drawer = !drawer"
          variant="text"
          icon
        >
          <Icon icon="mdi:menu" width="24" height="24" />
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="right"
    class="mobile-nav-drawer"
  >
    <v-list nav>
      <v-list-item
        v-for="item in navItems"
        :key="item.route"
        :to="{ name: item.route }"
        @click="drawer = false"
      >
        <template v-slot:prepend>
          <Icon :icon="item.icon" width="24" height="24" />
        </template>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.logo-link {
  transition: opacity 0.2s ease;
}

.logo-link:hover {
  opacity: 0.8;
}

.mobile-nav-drawer {
  padding-top: 16px;
}
</style>
