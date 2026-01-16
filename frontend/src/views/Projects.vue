<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  demo?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'cslrtools',
    description: 'Pythonによる光学シミュレーションライブラリ。回折計算、レンズ設計など光学系の設計・解析に利用できるツール群を提供。',
    image: 'https://opengraph.githubassets.com/1/plumiume/cslrtools',
    tags: ['Python', 'Optics', 'Simulation', 'NumPy'],
    github: 'https://github.com/plumiume/cslrtools'
  },
  {
    id: 2,
    title: 'python-clipar',
    description: 'コマンドライン引数をシンプルに解析するPythonライブラリ。直感的なAPIで引数のパースと検証を実現。',
    image: 'https://opengraph.githubassets.com/1/plumiume/python-clipar',
    tags: ['Python', 'CLI', 'Library'],
    github: 'https://github.com/plumiume/python-clipar'
  },
  {
    id: 3,
    title: 'docker-pytorch',
    description: 'PyTorch開発環境用Dockerイメージ。GPU対応、Jupyter Notebook統合、開発に必要な各種ライブラリをプリインストール。',
    image: 'https://opengraph.githubassets.com/1/plumiume/docker-pytorch',
    tags: ['Docker', 'PyTorch', 'GPU', 'Jupyter'],
    github: 'https://github.com/plumiume/docker-pytorch'
  }
]
</script>

<template>
  <v-container fluid class="py-16 px-4 px-md-8">
    <v-row class="mb-12">
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 font-weight-bold mb-3">
          プロジェクト
        </h1>
        <p class="text-h6 text-medium-emphasis">
          最近の作品と個人開発プロジェクトをご覧ください
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="project in projects"
        :key="project.id"
        cols="12"
        md="4"
      >
        <v-card
          class="modern-card"
          elevation="2"
          hover
          rounded="lg"
        >
          <v-img
            :src="project.image"
            height="200"
            max-height="200"
            contain
            class="card-image"
          >
            <div class="card-overlay">
              <v-chip color="primary" label>
                <Icon icon="mdi:star" width="16" height="16" style="margin-right: 8px;" />
                Featured
              </v-chip>
            </div>
          </v-img>
          
          <v-card-title class="text-h6 font-weight-bold pt-4">
            {{ project.title }}
          </v-card-title>
          
          <v-card-text class="text-body-1">
            {{ project.description }}
          </v-card-text>

          <v-card-text>
            <v-chip
              v-for="tag in project.tags"
              :key="tag"
              class="mr-2 mb-2"
              size="small"
              color="primary"
              variant="outlined"
            >
              {{ tag }}
            </v-chip>
          </v-card-text>
          
          <v-card-actions class="px-4 pb-4">
            <v-btn
              color="primary"
              variant="text"
              rounded="lg"
              :href="project.github"
              target="_blank"
            >
              <Icon icon="mdi:github" width="20" height="20" style="margin-right: 8px;" />
              GitHub
            </v-btn>
            <v-btn
              v-if="project.demo"
              color="primary"
              variant="outlined"
              rounded="lg"
              :href="project.demo"
              target="_blank"
            >
              <Icon icon="mdi:open-in-new" width="20" height="20" style="margin-right: 8px;" />
              Demo
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              variant="text"
              icon
              :href="project.github"
              target="_blank"
            >
              <Icon icon="mdi:star" width="20" height="20" />
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- その他 -->
    <v-row class="mt-12">
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold mb-6">
          その他
        </h2>
      </v-col>
      <v-col cols="12" md="6">
        <v-card
          class="modern-card"
          elevation="2"
          hover
          rounded="lg"
          href="https://github.com/plumiume?tab=repositories"
          target="_blank"
        >
          <v-card-text class="pa-8 text-center">
            <Icon icon="mdi:github" width="64" height="64" class="mb-4" />
            <v-card-title class="text-h5 font-weight-bold mb-2">
              GitHub リポジトリ一覧
            </v-card-title>
            <v-card-text class="text-body-1">
              すべてのプロジェクトと実験的なコードをGitHubで公開しています
            </v-card-text>
          </v-card-text>
          <v-card-actions class="justify-center pb-6">
            <v-btn
              color="primary"
              variant="outlined"
              rounded="lg"
              size="large"
            >
              <Icon icon="mdi:open-in-new" width="20" height="20" style="margin-right: 8px;" />
              View All Repositories
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Modern Cards */
.modern-card {
  border-radius: 16px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.modern-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
}

.card-image {
  transition: transform 0.3s ease;
}

.modern-card:hover .card-image {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>
