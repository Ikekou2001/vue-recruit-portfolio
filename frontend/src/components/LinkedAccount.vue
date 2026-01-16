<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface AccountLink {
  name: string
  username: string
  url: string
  icon: string
  color: string
  description?: string
}

const accounts: AccountLink[] = [
  {
    name: 'GitHub',
    username: 'plumiume',
    url: 'https://github.com/plumiume',
    icon: 'github',
    color: '#ffffff',
    description: 'Source code and projects'
  },
  {
    name: 'Docker Hub',
    username: 'plumiume',
    url: 'https://hub.docker.com/u/plumiume',
    icon: 'docker',
    color: '#ffffff',
    description: 'Container images'
  },
  {
    name: 'X (Twitter)',
    username: '@plumiiume',
    url: 'https://x.com/plumiiume',
    icon: 'x',
    color: '#ffffff',
    description: 'Social updates'
  },
  {
    name: 'Mail',
    username: 'contact@plumiume.com',
    url: 'mailto:contact@plumiume.com',
    icon: 'gmail',
    color: '#ffffff',
    description: 'Contact via email'
  },
  {
    name: 'Google',
    username: 'plumiiume@gmail.com',
    url: 'https://mail.google.com/mail/?view=cm&fs=1&to=plumiiume@gmail.com',
    icon: 'google',
    color: '#ffffff',
    description: 'Google Account'
  }
]

interface Props {
  variant?: 'default' | 'compact' | 'icons-only'
  columns?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  columns: 2
})

const getColSize = () => {
  if (props.variant === 'icons-only') return 'auto'
  return 12 / props.columns
}
</script>

<template>
  <div class="linked-accounts">
    <!-- Default variant: Card grid -->
    <v-row v-if="variant === 'default'">
      <v-col
        v-for="account in accounts"
        :key="account.name"
        :cols="12"
        :md="getColSize()"
      >
        <v-card
          :href="account.url"
          target="_blank"
          class="account-card"
          elevation="2"
          hover
          rounded="lg"
        >
          <v-card-text class="d-flex align-center pa-4">
            <v-avatar
              :color="account.color"
              size="56"
              class="mr-4"
            >
              <Icon :icon="`simple-icons:${account.icon}`" width="32" height="32" style="color: white;" />
            </v-avatar>
            <div class="flex-grow-1">
              <div class="text-h6 font-weight-bold mb-1">
                {{ account.name }}
              </div>
              <div class="text-body-2 text-medium-emphasis mb-1">
                {{ account.username }}
              </div>
              <div v-if="account.description" class="text-caption text-medium-emphasis">
                {{ account.description }}
              </div>
            </div>
            <Icon icon="mdi:open-in-new" width="20" height="20" style="margin-left: 8px;" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Compact variant: List items -->
    <v-list v-else-if="variant === 'compact'" bg-color="transparent">
      <v-list-item
        v-for="account in accounts"
        :key="account.name"
        :href="account.url"
        target="_blank"
        class="account-list-item rounded-lg mb-2"
        :prepend-icon="account.icon"
        :title="account.name"
        :subtitle="account.username"
      >
        <template v-slot:prepend>
          <v-avatar :color="account.color" size="40">
            <Icon :icon="`simple-icons:${account.icon}`" width="20" height="20" style="color: white;" />
          </v-avatar>
        </template>
        <template v-slot:append>
          <Icon icon="mdi:open-in-new" width="20" height="20" />
        </template>
      </v-list-item>
    </v-list>

    <!-- Icons only variant: Horizontal icon buttons -->
    <div v-else-if="variant === 'icons-only'" class="d-flex gap-3 justify-center flex-wrap">
      <v-tooltip
        v-for="account in accounts"
        :key="account.name"
        location="top"
      >
        <template v-slot:activator="{ props: tooltipProps }">
          <v-btn
            :href="account.url"
            target="_blank"
            variant="text"
            size="large"
            v-bind="tooltipProps"
            icon
          >
            <Icon :icon="`simple-icons:${account.icon}`" width="32" height="32" style="color: white;" />
          </v-btn>
        </template>
        <span>{{ account.name }}: {{ account.username }}</span>
      </v-tooltip>
    </div>
  </div>
</template>

<style scoped>
.account-card {
  border-radius: 16px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
}

.account-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15) !important;
}

.account-list-item {
  transition: all 0.2s ease;
}

.account-list-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.08);
}
</style>
