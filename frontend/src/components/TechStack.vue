<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

type ProficiencyLevel = 'expert' | 'advanced' | 'intermediate' | 'beginner'

interface IconConfig {
  type: 'si' | 'bs'
  name: string
}

interface TechStack {
  name: string
  category: 'frontend' | 'backend' | 'devops' | 'tools' | 'iot' | 'certification' | 'competitive'
  icon: IconConfig
  color: string
  level: ProficiencyLevel
  description?: string
  years?: number
  url?: string
}

const techStacks: TechStack[] = [
  // Backend (Expert level - Python ecosystem)
  { name: 'Python', category: 'backend', icon: { type: 'si', name: 'python' }, color: '#3776ab', level: 'expert', description: '9年の経験', years: 9 },
  { name: 'PyTorch', category: 'backend', icon: { type: 'si', name: 'pytorch' }, color: '#ee4c2c', level: 'expert', description: '深層学習の研究', years: 4 },
  { name: 'PyG', category: 'backend', icon: { type: 'si', name: 'pyg' }, color: '#3C2179', level: 'intermediate', description: '研究で使用', years: 1 },
  { name: 'OpenCV', category: 'backend', icon: { type: 'si', name: 'opencv' }, color: '#5C3EE8', level: 'advanced', description: '画像処理', years: 7 },
  { name: 'Flask', category: 'backend', icon: { type: 'si', name: 'flask' }, color: '#000000', level: 'advanced', description: 'IoTデバイスのWebUI', years: 1 },
  { name: 'Ray', category: 'backend', icon: { type: 'si', name: 'ray' }, color: '#028CF0', level: 'intermediate', description: 'GPU分散処理', years: 1 },
  { name: 'Rust', category: 'backend', icon: { type: 'si', name: 'rust' }, color: '#000000', level: 'intermediate', description: '競技プログラミング', years: 2 },
  { name: 'C/C++', category: 'backend', icon: { type: 'si', name: 'cplusplus' }, color: '#00599C', level: 'intermediate', description: '競技プログラミング', years: 3 },
  
  // Frontend (Advanced/Intermediate)
  { name: 'HTML', category: 'frontend', icon: { type: 'si', name: 'html5' }, color: '#E34F26', level: 'advanced', description: 'フロントエンド三銃士　太郎', years: 3 },
  { name: 'CSS', category: 'frontend', icon: { type: 'si', name: 'css3' }, color: '#1572B6', level: 'intermediate', description: 'フロントエンド三銃士　次郎', years: 3 },
  { name: 'JavaScript', category: 'frontend', icon: { type: 'si', name: 'javascript' }, color: '#F7DF1E', level: 'advanced', description: 'フロントエンド三銃士　三郎', years: 3 },
  { name: 'TypeScript', category: 'frontend', icon: { type: 'si', name: 'typescript' }, color: '#3178c6', level: 'advanced', description: 'IDEフレンドリー', years: 1 },
  { name: 'Vue.js', category: 'frontend', icon: { type: 'si', name: 'vuedotjs' }, color: '#42b883', level: 'advanced', description: 'モダンフレームワーク　嫌い' },
  { name: 'Next.js', category: 'frontend', icon: { type: 'si', name: 'nextdotjs' }, color: '#000000', level: 'intermediate', description: 'モダンフレームワーク　好き' },
  { name: 'bootstrap', category: 'frontend', icon: { type: 'si', name: 'bootstrap' }, color: '#7952B3', level: 'intermediate', description: '初めて触ったWeb系フレームワーク', years: 2 },
  { name: 'Vuetify', category: 'frontend', icon: { type: 'si', name: 'vuetify' }, color: '#1867c0', level: 'intermediate', description: 'Vueについてきた' },
  { name: 'Vite', category: 'frontend', icon: { type: 'si', name: 'vite' }, color: '#646cff', level: 'intermediate', description: 'Vueについてきた' },
  
  // DevOps & Cloud
  { name: 'Docker', category: 'devops', icon: { type: 'si', name: 'docker' }, color: '#2496ed', level: 'advanced', description: '便利なサンドボックス' },
  { name: 'Git', category: 'devops', icon: { type: 'si', name: 'git' }, color: '#f05032', level: 'expert', description: 'もうインフラ' },
  { name: 'GitHub Actions', category: 'devops', icon: { type: 'si', name: 'githubactions' }, color: '#2088ff', level: 'intermediate', description: 'テスト自動化のお試し' },
  { name: 'Azure', category: 'devops', icon: { type: 'si', name: 'microsoftazure' }, color: '#0078d4', level: 'intermediate', description: 'AWS逆張り' },
  { name: 'Azure Functions', category: 'backend', icon: { type: 'si', name: 'azurefunctions' }, color: '#0078d4', level: 'intermediate', description: '一番簡単では' },
  { name: 'Ubuntu', category: 'devops', icon: { type: 'si', name: 'ubuntu' }, color: '#E95420', level: 'intermediate', description: 'コミュニティ活発' },
  { name: 'Bash', category: 'devops', icon: { type: 'si', name: 'gnubash' }, color: '#4EAA25', level: 'advanced', description: '基本スキル' },
  
  // IoT & Embedded
  { name: 'Raspberry Pi', category: 'iot', icon: { type: 'si', name: 'raspberrypi' }, color: '#A22846', level: 'advanced', description: 'SBC+IoT' },
  { name: 'ESP32', category: 'iot', icon: { type: 'si', name: 'espressif' }, color: '#E7352C', level: 'intermediate', description: 'マイコン' },
  { name: 'M5Stack', category: 'iot', icon: { type: 'bs', name: '5-square-fill' }, color: '#FF6600', level: 'intermediate', description: 'IoTデバイス' },
  { name: 'Node-RED', category: 'iot', icon: { type: 'si', name: 'nodered' }, color: '#8F0000', level: 'intermediate', description: 'ほとんどJSでロジック記述' },
  
  // Tools & Languages
  { name: 'Jupyter', category: 'tools', icon: { type: 'si', name: 'jupyter' }, color: '#F37626', level: 'intermediate', description: 'marimoを選べ', years: 3 },
  { name: 'JupyterLab', category: 'tools', icon: { type: 'si', name: 'jupyter' }, color: '#F37626', level: 'intermediate', description: 'marimo(ry', years: 3 },
  { name: 'Google Colab', category: 'tools', icon: { type: 'si', name: 'googlecolab' }, color: '#F9AB00', level: 'beginner', description: 'IDE嫌い' },
  { name: 'VS Code', category: 'tools', icon: { type: 'si', name: 'visualstudiocode' }, color: '#007acc', level: 'intermediate', description: 'API含む、TypeScript拡張開発' },
  { name: 'Node.js', category: 'backend', icon: { type: 'si', name: 'nodedotjs' }, color: '#339933', level: 'intermediate', description: '(Runtime)' },
  { name: 'pnpm', category: 'tools', icon: { type: 'si', name: 'pnpm' }, color: '#f9ad00', level: 'intermediate', description: 'Package Manager' },
  { name: 'uv', category: 'tools', icon: { type: 'si', name: 'python' }, color: '#3776ab', level: 'intermediate', description: '良い', years: 1 },
  { name: 'Anaconda', category: 'tools', icon: { type: 'si', name: 'anaconda' }, color: '#44A833', level: 'intermediate', description: '遅い' },
  { name: 'pyenv', category: 'tools', icon: { type: 'si', name: 'python' }, color: '#3776ab', level: 'intermediate', description: '昔使っていた', years: 3 },
  { name: 'Cargo', category: 'tools', icon: { type: 'si', name: 'rust' }, color: '#000000', level: 'intermediate', description: 'Rust必須級' },
  { name: 'PowerShell', category: 'tools', icon: { type: 'si', name: 'powershell' }, color: '#5391FE', level: 'intermediate', description: '基本スキル' },
  { name: 'pyright', category: 'tools', icon: { type: 'si', name: 'python' }, color: '#3776ab', level: 'advanced', description: 'Python型チェッカー (Pylance)', years: 4 },
  { name: 'pytest', category: 'tools', icon: { type: 'si', name: 'pytest' }, color: '#0A9EDC', level: 'advanced', description: 'Pythonテストフレームワーク' },
  { name: 'flake8', category: 'tools', icon: { type: 'si', name: 'python' }, color: '#3776ab', level: 'advanced', description: 'Pythonリンター' },
  { name: 'GitHub Copilot', category: 'tools', icon: { type: 'si', name: 'github' }, color: '#000000', level: 'expert', description: 'AIコード支援 (Claude Sonnet 4.5)' },
  { name: 'Excel VBA', category: 'tools', icon: { type: 'si', name: 'microsoftexcel' }, color: '#217346', level: 'intermediate', description: '初めてのPG-LANG', years: 1 },
  { name: 'Google Apps Script', category: 'tools', icon: { type: 'si', name: 'googleappsscript' }, color: '#4285F4', level: 'intermediate', description: '環境構築いらないし無料' },
  { name: 'Java', category: 'backend', icon: { type: 'si', name: 'oracle' }, color: '#007396', level: 'beginner', description: '授業　逆張りで嫌い' },
  
  // Competitive Programming
  { name: 'paiza', category: 'competitive', icon: { type: 'bs', name: 'code-slash' }, color: '#00A0E9', level: 'intermediate', description: '競技プログラミング', url: 'https://paiza.jp/users/plumiume' },
  { name: 'AtCoder', category: 'competitive', icon: { type: 'bs', name: 'code-slash' }, color: '#000000', level: 'intermediate', description: '競技プログラミング', url: 'https://atcoder.jp/users/ikekou' },
  
  // Certifications
  { name: 'MOS Word Expert', category: 'certification', icon: { type: 'si', name: 'microsoftword' }, color: '#2B579A', level: 'expert', description: 'Microsoft Office Specialist 2010' },
  { name: 'MOS Excel Expert', category: 'certification', icon: { type: 'si', name: 'microsoftexcel' }, color: '#217346', level: 'expert', description: 'Microsoft Office Specialist 2010' },
  { name: 'MOS PowerPoint', category: 'certification', icon: { type: 'si', name: 'microsoftpowerpoint' }, color: '#B7472A', level: 'expert', description: 'Microsoft Office Specialist 2010' },
  { name: 'MOS Access', category: 'certification', icon: { type: 'si', name: 'microsoftaccess' }, color: '#A4373A', level: 'expert', description: 'Microsoft Office Specialist 2010' },
]

interface Props {
  variant?: 'grid' | 'list' | 'compact'
  filter?: 'frontend' | 'backend' | 'devops' | 'tools' | 'iot' | 'certification' | 'competitive' | 'all'
  showDescription?: boolean
  sortByLevel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'grid',
  filter: 'all',
  showDescription: true,
  sortByLevel: true
})

const levelOrder: Record<ProficiencyLevel, number> = {
  expert: 0,
  advanced: 1,
  intermediate: 2,
  beginner: 3
}

const getLevelOpacity = (level: ProficiencyLevel): number => {
  const opacities: Record<ProficiencyLevel, number> = {
    expert: 1.0,
    advanced: 0.85,
    intermediate: 0.7,
    beginner: 0.55
  }
  return opacities[level]
}

const getLevelLabel = (level: ProficiencyLevel): string => {
  const labels: Record<ProficiencyLevel, string> = {
    expert: '上級',
    advanced: '中級',
    intermediate: '初級',
    beginner: '入門'
  }
  return labels[level]
}

const getLevelColor = (level: ProficiencyLevel): string => {
  const colors: Record<ProficiencyLevel, string> = {
    expert: '#F44336',      // Red - 上級
    advanced: '#FF9800',    // Orange - 中級
    intermediate: '#4CAF50', // Green - 初級
    beginner: '#2196F3'     // Blue - 入門
  }
  return colors[level]
}

const filteredStacks = computed(() => {
  let stacks = props.filter === 'all' 
    ? techStacks 
    : techStacks.filter(stack => stack.category === props.filter)
  
  // 習熟度順にソート
  if (props.sortByLevel) {
    stacks = [...stacks].sort((a, b) => {
      const levelDiff = levelOrder[a.level] - levelOrder[b.level]
      if (levelDiff !== 0) return levelDiff
      // 同じレベルの場合は経験年数でソート
      if (a.years && b.years) return b.years - a.years
      return 0
    })
  }
  
  return stacks
})

const getIconName = (icon: IconConfig): string => {
  if (icon.type === 'si') {
    return `simple-icons:${icon.name}`
  } else if (icon.type === 'bs') {
    return `bi:${icon.name}`
  }
  return icon.name
}

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    frontend: 'フロントエンド',
    backend: 'バックエンド',
    devops: 'DevOps',
    tools: 'ツール',
    iot: 'IoT',
    certification: '資格',
    competitive: '競技プログラミング'
  }
  return labels[category] || category
}
</script>

<template>
  <div class="tech-stack">
    <!-- Grid variant -->
    <v-row v-if="variant === 'grid'">
      <v-col
        v-for="tech in filteredStacks"
        :key="tech.name"
        cols="6"
        sm="4"
        md="3"
        lg="2"
      >
        <v-card
          class="tech-card pa-4 text-center"
          elevation="2"
          hover
          rounded="lg"
          :href="tech.url"
          :target="tech.url ? '_blank' : undefined"
          :style="{ 
            backgroundColor: `rgba(${parseInt(tech.color.slice(1,3), 16)}, ${parseInt(tech.color.slice(3,5), 16)}, ${parseInt(tech.color.slice(5,7), 16)}, ${getLevelOpacity(tech.level) * 0.1})`,
            borderLeft: `4px solid ${tech.color}`,
            cursor: tech.url ? 'pointer' : 'default'
          }"
        >
          <div class="d-flex justify-end mb-2">
            <v-chip
              size="x-small"
              :color="getLevelColor(tech.level)"
              variant="flat"
            >
              {{ getLevelLabel(tech.level) }}
            </v-chip>
          </div>
          <Icon
            :icon="getIconName(tech.icon)"
            width="48"
            height="48"
            :style="{ color: tech.color, opacity: getLevelOpacity(tech.level) }"
          />
          <div class="text-subtitle-2 font-weight-bold mb-1 mt-3">
            {{ tech.name }}
            <span v-if="tech.years" class="text-caption text-medium-emphasis"> ({{ tech.years }}年)</span>
            <Icon v-if="tech.url" icon="mdi:open-in-new" width="14" height="14" class="ml-1" />
          </div>
          <div v-if="showDescription && tech.description" class="text-caption text-medium-emphasis">
            {{ tech.description }}
          </div>
          <v-chip
            size="x-small"
            class="mt-2"
            :color="tech.color"
            variant="tonal"
          >
            {{ getCategoryLabel(tech.category) }}
          </v-chip>
        </v-card>
      </v-col>
    </v-row>

    <!-- List variant -->
    <v-list v-else-if="variant === 'list'" bg-color="transparent">
      <v-list-item
        v-for="tech in filteredStacks"
        :key="tech.name"
        class="tech-list-item rounded-lg mb-2"
        :href="tech.url"
        :target="tech.url ? '_blank' : undefined"
        :style="{ 
          borderLeft: `4px solid ${tech.color}`,
          opacity: getLevelOpacity(tech.level),
          cursor: tech.url ? 'pointer' : 'default'
        }"
      >
        <template v-slot:prepend>
          <Icon
            :icon="getIconName(tech.icon)"
            width="32"
            height="32"
            :style="{ color: tech.color, marginRight: '16px' }"
          />
        </template>
        <v-list-item-title class="font-weight-bold">
          {{ tech.name }}
          <span v-if="tech.years" class="text-caption text-medium-emphasis"> ({{ tech.years }}年)</span>
          <Icon v-if="tech.url" icon="mdi:open-in-new" width="14" height="14" class="ml-1" />
        </v-list-item-title>
        <v-list-item-subtitle v-if="showDescription && tech.description">
          {{ tech.description }}
        </v-list-item-subtitle>
        <template v-slot:append>
          <v-chip size="small" :color="getLevelColor(tech.level)" variant="flat" class="mr-2">
            {{ getLevelLabel(tech.level) }}
          </v-chip>
          <v-chip size="small" :color="tech.color" variant="tonal">
            {{ getCategoryLabel(tech.category) }}
          </v-chip>
        </template>
      </v-list-item>
    </v-list>

    <!-- Compact variant (chips) -->
    <div v-else-if="variant === 'compact'" class="d-flex flex-wrap gap-2">
      <v-chip
        v-for="tech in filteredStacks"
        :key="tech.name"
        :color="tech.color"
        variant="tonal"
        size="large"
        :href="tech.url"
        :target="tech.url ? '_blank' : undefined"
        :style="{ 
          opacity: getLevelOpacity(tech.level),
          cursor: tech.url ? 'pointer' : 'default'
        }"
      >
        <template v-slot:prepend>
          <Icon :icon="getIconName(tech.icon)" width="20" height="20" />
        </template>
        {{ tech.name }}
        <span v-if="tech.years" class="ml-1 text-caption">({{ tech.years }}年)</span>
        <template v-if="tech.url" v-slot:append>
          <Icon icon="mdi:open-in-new" width="14" height="14" class="ml-1" />
        </template>
      </v-chip>
    </div>
  </div>
</template>

<style scoped>
.tech-card {
  border-radius: 16px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
}

.tech-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15) !important;
}

.tech-list-item {
  transition: all 0.2s ease;
  padding: 12px 16px;
}

.tech-list-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.08);
}
</style>
