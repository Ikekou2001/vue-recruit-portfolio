<script setup lang="ts">
import { Icon } from '@iconify/vue'
import TechStack from '@/components/TechStack.vue'
import { ref } from 'vue'

const otherSkillsPanel = ref<number[]>([])

// 主要スキル（6個を厳選）
const mainSkills = [
  { name: 'Python', category: 'backend', icon: 'python', color: '#3776ab' },
  { name: 'PyTorch', category: 'backend', icon: 'pytorch', color: '#ee4c2c' },
  { name: 'TypeScript', category: 'frontend', icon: 'typescript', color: '#3178c6' },
  { name: 'Docker', category: 'devops', icon: 'docker', color: '#2496ed' },
  { name: 'Rust', category: 'backend', icon: 'rust', color: '#000000' },
  { name: 'GitHub Copilot', category: 'tools', icon: 'github', color: '#000000' }
]
</script>

<template>
  <v-container fluid class="py-16 px-4 px-md-8">
    <v-row class="mb-12">
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 font-weight-bold mb-3">
          スキル・技術
        </h1>
        <p class="text-h6 text-medium-emphasis">
          習熟度順に表示（上級 → 中級 → 初級 → 入門）
        </p>
      </v-col>
    </v-row>

    <!-- 主要スキル（6個） -->
    <v-row class="mb-8">
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold mb-4">主要スキル</h2>
        <v-row>
          <v-col
            v-for="skill in mainSkills"
            :key="skill.name"
            cols="6"
            sm="4"
            md="2"
          >
            <v-card
              class="text-center pa-4"
              elevation="2"
              rounded="lg"
            >
              <Icon :icon="`simple-icons:${skill.icon}`" width="48" height="48" :style="{ color: skill.color }" class="mb-2" />
              <div class="text-subtitle-1 font-weight-bold">{{ skill.name }}</div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- 他スキル（折り畳み） -->
    <v-row class="mb-8">
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold mb-4">他スキル</h2>
        <v-expansion-panels v-model="otherSkillsPanel">
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <Icon icon="mdi:dots-horizontal" width="24" height="24" class="mr-3" />
                <span class="text-h6 font-weight-bold">すべての他スキルを表示</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <TechStack variant="grid" filter="all" :sort-by-level="true" />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <!-- カテゴリ別スキル -->
    <v-row class="mb-8">
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold mb-6">カテゴリ別スキル</h2>
      </v-col>
    </v-row>

    <!-- バックエンド -->
    <v-row class="mb-8">
      <v-col cols="12" md="6">
        <div class="d-flex align-center mb-4">
          <Icon icon="mdi:server" width="24" height="24" class="mr-3" />
          <h3 class="text-h5 font-weight-bold">バックエンド</h3>
        </div>
        <TechStack variant="list" filter="backend" :sort-by-level="true" />
      </v-col>

      <!-- フロントエンド -->
      <v-col cols="12" md="6">
        <div class="d-flex align-center mb-4">
          <Icon icon="mdi:monitor" width="24" height="24" class="mr-3" />
          <h3 class="text-h5 font-weight-bold">フロントエンド</h3>
        </div>
        <TechStack variant="list" filter="frontend" :sort-by-level="true" />
      </v-col>
    </v-row>

    <!-- DevOps & IoT -->
    <v-row class="mb-8">
      <v-col cols="12" md="6">
        <div class="d-flex align-center mb-4">
          <Icon icon="mdi:infinity" width="24" height="24" class="mr-3" />
          <h3 class="text-h5 font-weight-bold">DevOps</h3>
        </div>
        <TechStack variant="list" filter="devops" :sort-by-level="true" />
      </v-col>

      <v-col cols="12" md="6">
        <div class="d-flex align-center mb-4">
          <Icon icon="mdi:chip" width="24" height="24" class="mr-3" />
          <h3 class="text-h5 font-weight-bold">IoT・組み込み</h3>
        </div>
        <TechStack variant="list" filter="iot" :sort-by-level="true" />
      </v-col>
    </v-row>

    <!-- 開発ツール -->
    <v-row class="mb-8">
      <v-col cols="12">
        <div class="d-flex align-center mb-4">
          <Icon icon="mdi:tools" width="24" height="24" class="mr-3" />
          <h3 class="text-h5 font-weight-bold">開発ツール</h3>
        </div>
        <TechStack variant="compact" filter="tools" :sort-by-level="true" />
      </v-col>
    </v-row>

    <!-- 資格・認定 -->
    <v-row class="mb-8">
      <v-col cols="12">
        <div class="d-flex align-center mb-4">
          <Icon icon="mdi:certificate" width="24" height="24" class="mr-3" />
          <h3 class="text-h5 font-weight-bold">資格・認定</h3>
        </div>
        <TechStack variant="compact" filter="certification" :sort-by-level="true" />
      </v-col>
    </v-row>

    <!-- 競技プログラミング -->
    <v-row class="mb-8">
      <v-col cols="12">
        <div class="d-flex align-center mb-4">
          <Icon icon="mdi:code-braces" width="24" height="24" class="mr-3" />
          <h3 class="text-h5 font-weight-bold">競技プログラミング</h3>
        </div>
        <TechStack variant="compact" filter="competitive" :sort-by-level="true" />
      </v-col>
    </v-row>

    <!-- 習熟度の説明 -->
    <v-row class="mt-12">
      <v-col cols="12" md="8" offset-md="2">
        <v-alert
          type="info"
          variant="tonal"
          prominent
          border="start"
          class="modern-alert"
        >
          <template v-slot:prepend>
            <Icon icon="mdi:information" width="32" height="32" />
          </template>
          <v-alert-title class="text-h6 font-weight-bold mb-2">
            習熟度について
          </v-alert-title>
          <div class="text-body-1">
            <ul class="ml-4">
              <li><strong>上級 (Expert)</strong>: 実務で頻繁に使用、深い理解と応用力あり</li>
              <li><strong>中級 (Advanced)</strong>: 実務経験あり、基本的な機能を活用可能</li>
              <li><strong>初級 (Intermediate)</strong>: 基本操作が可能、学習中</li>
              <li><strong>入門 (Beginner)</strong>: 基礎知識あり</li>
            </ul>
          </div>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.modern-alert {
  border-radius: 16px !important;
}
</style>
