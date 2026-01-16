<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import Tweet from 'vue-tweet'
// import plumiumeHeader from '@/assets/plumiume-header.png'

const theme = useTheme()
const tweetTheme = computed(() => theme.global.current.value.dark ? 'dark' : 'light')

const features = [
  {
    icon: 'simple-icons:pytorch',
    title: 'PyTorch × 深層学習',
    description: '9年のPython経験とPyTorch専門知識で、学習から実装まで一貫した機械学習ソリューションを提供。'
  },
  {
    icon: 'mdi:code-braces',
    title: 'Full-Stack 開発',
    description: 'Python/TypeScript を軸に、バックエンドAPIからフロントエンドUIまで幅広く対応。実践的なソフトウェア設計力。'
  },
  {
    icon: 'mdi:chip',
    title: 'IoT × 組み込み',
    description: 'Raspberry Pi、ESP32、M5Stack を活用したハードウェア連携。ソフトウェアとハードウェアの橋渡し。'
  }
]

</script>

<template>
  <section class="hero-section">
    <v-container fluid class="hero-container" >
      <v-row align="center" justify="center" class="fill-height">
        <v-col cols="12" class="text-center">
          <h1 class="text-h2 font-weight-bold mb-5">
            ようこそ、<wbr><span class="brand-name">plumiume.com</span><wbr> ポートフォリオへ
          </h1>
          <div class="d-flex flex-wrap gap-3 mb-6 justify-center align-center">
            <v-tooltip text="Windows" location="bottom">
              <template v-slot:activator="{ props }">
                <div class="tech-icon-badge" v-bind="props">
                  <Icon icon="simple-icons:windows" width="28" height="28" />
                </div>
              </template>
            </v-tooltip>
            <v-tooltip text="pnpm" location="bottom">
              <template v-slot:activator="{ props }">
                <div class="tech-icon-badge" v-bind="props">
                  <Icon icon="simple-icons:pnpm" width="28" height="28" />
                </div>
              </template>
            </v-tooltip>
            <v-tooltip text="TypeScript" location="bottom">
              <template v-slot:activator="{ props }">
                <div class="tech-icon-badge" v-bind="props">
                  <Icon icon="simple-icons:typescript" width="28" height="28" />
                </div>
              </template>
            </v-tooltip>
            <v-tooltip text="Vue.js" location="bottom">
              <template v-slot:activator="{ props }">
                <div class="tech-icon-badge" v-bind="props">
                  <Icon icon="simple-icons:vuedotjs" width="28" height="28" />
                </div>
              </template>
            </v-tooltip>
            <v-tooltip text="Vite" location="bottom">
              <template v-slot:activator="{ props }">
                <div class="tech-icon-badge" v-bind="props">
                  <Icon icon="simple-icons:vite" width="28" height="28" />
                </div>
              </template>
            </v-tooltip>
            <v-tooltip text="Vuetify" location="bottom">
              <template v-slot:activator="{ props }">
                <div class="tech-icon-badge" v-bind="props">
                  <Icon icon="simple-icons:vuetify" width="28" height="28" />
                </div>
              </template>
            </v-tooltip>
            <v-tooltip text="Azure Functions" location="bottom">
              <template v-slot:activator="{ props }">
                <div class="tech-icon-badge" v-bind="props">
                  <Icon icon="simple-icons:microsoftazure" width="28" height="28" />
                </div>
              </template>
            </v-tooltip>
          </div>
          <div class="d-flex gap-3 justify-center">
            <v-btn
              size="large"
              color="primary"
              elevation="4"
              rounded="lg"
              :to="{ name: 'Projects' }"
            >
              プロジェクトを見る
              <Icon icon="mdi:arrow-right" width="20" height="20" style="margin-left: 8px;" />
            </v-btn>
            <v-btn
              size="large"
              variant="outlined"
              color="primary"
              rounded="lg"
              :to="{ name: 'Skills' }"
              class="learn-more-btn"
            >
              詳しく見る
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <!-- Features Section -->
  <v-container fluid class="py-16 px-4 px-md-8">
    <v-row class="mb-12">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-3">
          私の強み
        </h2>
        <p class="text-h6 text-medium-emphasis">
          技術力と実装力で価値を創造
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="(feature, index) in features"
        :key="index"
        cols="12"
        md="4"
      >
        <v-card
          class="feature-card pa-6"
          elevation="0"
          :ripple="false"
          hover
        >
          <div class="d-flex flex-column align-center text-center">
            <v-avatar
              size="80"
              class="mb-4 icon-avatar"
              color="primary"
            >
              <Icon :icon="feature.icon" width="40" height="40" color="white" />
            </v-avatar>
            <h3 class="text-h5 font-weight-bold mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-body-1 text-medium-emphasis">
              {{ feature.description }}
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- X.com Tweet Embed -->
    <v-row class="mt-12">
      <v-col cols="12" class="text-center">
        <h2 class="text-h4 font-weight-bold mb-6">
          最新の投稿
        </h2>
      </v-col>
      <v-col cols="12" md="8" offset-md="2" lg="6" offset-lg="3">
        <v-card elevation="2" rounded="lg" class="pa-4">
          <div class="tweet-container">
            <!-- ツイートIDを指定してください -->
            <Tweet tweet-id="2012144255079522690" :theme="tweetTheme" />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Hero Section with Background Image */
.hero-section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('@/assets/plumiume-header.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  position: relative;
  overflow: hidden;
  /* width: 100%; */
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-container {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 32px 16px;
}

.learn-more-btn {
  background-color: rgba(255, 255, 255, 0.75) !important;
}

.brand-name {
  font-family: 'Courier New', 'Consolas', monospace;
  font-weight: 700;
  text-shadow: 
    1px -1px 0 rgba(255, 255, 255, 0.75),
    2px -2px 0 rgba(255, 255, 255, 0.75),
    -1px 1px 0 rgba(0, 0, 0, 0.75),
    -2px 2px 0 rgba(0, 0, 0, 0.75);
  letter-spacing: 1px;
}

.tech-icon-badge {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 10px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tech-icon-badge:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.text-gradient {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Floating Animation */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.floating-icon {
  animation: float 3s ease-in-out infinite;
}

.floating-image {
  animation: float 3s ease-in-out infinite;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
  border-radius: 16px;
}

/* Feature Cards */
.feature-card {
  border-radius: 16px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
  background: rgb(var(--v-theme-surface));
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(var(--v-theme-primary), 0.2) !important;
}

.icon-avatar {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%) !important;
  box-shadow: 0 8px 24px rgba(var(--v-theme-primary), 0.3);
}

.tweet-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}
</style>
