<script setup lang="ts">
import { ref, computed } from 'vue'

interface SlideCard {
  id: number
  title: string
  subtitle: string
  icon: string
  iconColor: string
  content: string[]
  backgroundImage?: string
  category: 'intro' | 'tech' | 'experience' | 'vision' | 'company' | 'questions'
}

const slides = ref<SlideCard[]>([
  {
    id: 1,
    title: '自己紹介',
    subtitle: 'SELF INTRODUCTION',
    icon: '👤',
    iconColor: '#42A5F5',
    category: 'intro',
    backgroundImage: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80',
    content: [
      '📍 出身地: 愛知県',
      '🎓 卒業年度: 2027卒',
      '🏫 豊田工業高等専門学校 情報工学科 (7年間)',
      '🏫 名古屋工業大学大学院 工学研究科',
      '💻 Python経験: 9年以上',
      '🎯 志望職種: インフラエンジニア、データサイエンティスト、バックエンドエンジニア、機械学習エンジニア、SRE',
      '✨ 特徴: 周囲を見て動ける理解型サポーター'
    ]
  },
  {
    id: 2,
    title: '技術スタック - 言語',
    subtitle: 'PROGRAMMING LANGUAGES',
    icon: '💻',
    iconColor: '#66BB6A',
    category: 'tech',
    backgroundImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    content: [
      '🐍 Python（研究メイン）',
      '⚡ TypeScript',
      '🎨 HTML/CSS',
      '🦀 Rust',
      '⚙️ C/C++',
      '💎 (C#)',
      '🔌 VHDL'
    ]
  },
  {
    id: 3,
    title: '技術スタック - フレームワーク',
    subtitle: 'FRAMEWORKS & LIBRARIES',
    icon: '📦',
    iconColor: '#AB47BC',
    category: 'tech',
    backgroundImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    content: [
      '🔥 PyTorch',
      '⚡ Ray',
      '🚂 Express',
      '💚 Vue.js',
      '▲ Next.js',
      '📘 jQuery',
      '🅱️ Bootstrap'
    ]
  },
  {
    id: 4,
    title: '技術スタック - DB & ツール',
    subtitle: 'DATABASE & TOOLS',
    icon: '🗄️',
    iconColor: '#FF7043',
    category: 'tech',
    backgroundImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    content: [
      '🐬 MySQL',
      '📊 NoSQL',
      '🐘 PostgreSQL',
      '📁 Access',
      '💙 VSCode',
      '🚀 Antigravity',
      '☁️ Azure',
      '☁️ AWS'
    ]
  },
  {
    id: 5,
    title: '学生時代の開発経験',
    subtitle: 'DEVELOPMENT EXPERIENCE',
    icon: '🎓',
    iconColor: '#FFA726',
    category: 'experience',
    backgroundImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    content: [
      '📚 授業: 製造機械のパトランプの外部読み取りデバイス設計',
      '🔬 cslrtools - 連続手話認識ツールキット（PyTorch, 深層学習）',
      '🔬 python-clipar - 型安全CLIパーサー（dataclassベース）',
      '🔬 docker-pytorch - PyTorch開発環境（Docker再現性）',
      '🎓 IoTデバイスとセンサー統合',
      '🎓 Attentionマスク生成、CTC復号化、WER計算'
    ]
  },
  {
    id: 6,
    title: 'なりたいITエンジニア像',
    subtitle: 'FUTURE VISION',
    icon: '🎯',
    iconColor: '#EF5350',
    category: 'vision',
    backgroundImage: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&q=80',
    content: [
      '🎯 業務を理解し、技術で支えるエンジニア',
      '📊 入社後3〜5年後に担当業務の流れや背景を理解',
      '💡 技術を使って現場の課題解決に貢献',
      '🤝 周囲の状況を見て自発的にサポート',
      '🔍 分からないことをそのままにせず仕組みを理解',
      '✨ 「なぜこのシステムが必要なのか」を考える姿勢',
      '🚀 チームや顧客にとって最適な提案ができるエンジニア'
    ]
  },
  {
    id: 7,
    title: 'こんな会社で働きたい',
    subtitle: 'TOWARD MY VISION',
    icon: '🏢',
    iconColor: '#26A69A',
    category: 'company',
    backgroundImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    content: [
      '💼 業務理解から関われる会社',
      '→ 要件定義や業務整理など前段階から関与できる',
      '🌱 若手のうちから現場経験を積める会社',
      '→ 実務を通して試行錯誤しながら成長できる',
      '🤝 チームで価値を出すことを重視する会社',
      '→ チーム全体で成果を出す文化',
      '→ 周囲を見て支える姿勢が評価される'
    ]
  },
  {
    id: 8,
    title: '企業に聞きたいこと',
    subtitle: 'QUESTIONS',
    icon: '❓',
    iconColor: '#5C6BC0',
    category: 'questions',
    backgroundImage: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80',
    content: [
      '❓ 入社後3〜5年目までで最も成長を実感した経験は？',
      '❓ 文系・未経験入社の方がつまずきやすい点と乗り越え方は？',
      '❓ 業務内容を深く理解することで提案や開発の質が変わった場面は？',
      '❓ 若手エンジニアに特に求められている役割や姿勢は？',
      '❓ 業務改善や提案にも関われるエンジニアになるために今から意識すべきことは？'
    ]
  }
])

const selectedCategory = ref<string>('all')
const searchQuery = ref('')

const categories = [
  { value: 'all', label: 'すべて', icon: '📋', color: '#757575' },
  { value: 'intro', label: '自己紹介', icon: '👤', color: '#42A5F5' },
  { value: 'tech', label: '技術', icon: '💻', color: '#66BB6A' },
  { value: 'experience', label: '経験', icon: '🎓', color: '#FFA726' },
  { value: 'vision', label: '将来像', icon: '🎯', color: '#EF5350' },
  { value: 'company', label: '会社選び', icon: '🏢', color: '#26A69A' },
  { value: 'questions', label: '質問', icon: '❓', color: '#5C6BC0' }
]

const filteredSlides = computed(() => {
  let result = slides.value

  // カテゴリフィルター
  if (selectedCategory.value !== 'all') {
    result = result.filter(slide => slide.category === selectedCategory.value)
  }

  // 検索フィルター
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(slide => 
      slide.title.toLowerCase().includes(query) ||
      slide.subtitle.toLowerCase().includes(query) ||
      slide.content.some(item => item.toLowerCase().includes(query))
    )
  }

  return result
})
</script>

<template>
  <div class="slides-container">
    <!-- ヘッダー -->
    <div class="header">
      <h1 class="title">プレゼンテーション</h1>
      <p class="subtitle">池田康希 - ポートフォリオ</p>
    </div>

    <!-- 検索バー -->
    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="🔍 スライドを検索"
        class="search-input"
      />
    </div>

    <!-- カテゴリフィルター -->
    <div class="categories">
      <button
        v-for="cat in categories"
        :key="cat.value"
        :class="['category-chip', { active: selectedCategory === cat.value }]"
        :style="{ 
          backgroundColor: selectedCategory === cat.value ? cat.color : 'transparent',
          borderColor: cat.color,
          color: selectedCategory === cat.value ? 'white' : cat.color
        }"
        @click="selectedCategory = cat.value"
      >
        <span class="category-icon">{{ cat.icon }}</span>
        {{ cat.label }}
      </button>
    </div>

    <!-- 結果数表示 -->
    <div v-if="searchQuery || selectedCategory !== 'all'" class="results-count">
      {{ filteredSlides.length }} 件のスライド
    </div>

    <!-- スライドカード -->
    <div class="cards-grid">
      <div
        v-for="slide in filteredSlides"
        :key="slide.id"
        class="slide-card"
      >
        <!-- カード背景画像 -->
        <div
          v-if="slide.backgroundImage"
          class="card-background"
          :style="{ backgroundImage: `url(${slide.backgroundImage})` }"
        >
          <div class="overlay"></div>
        </div>

        <!-- カードヘッダー -->
        <div class="card-header">
          <div class="header-content">
            <div
              class="icon-wrapper"
              :style="{ backgroundColor: slide.iconColor }"
            >
              <span class="icon-emoji">{{ slide.icon }}</span>
            </div>
            <div class="header-text">
              <div class="card-title">{{ slide.title }}</div>
              <div class="card-subtitle">{{ slide.subtitle }}</div>
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <!-- カードコンテンツ -->
        <div class="card-content">
          <div class="content-list">
            <div
              v-for="(item, idx) in slide.content"
              :key="idx"
              class="content-item"
            >
              <span class="bullet" :style="{ color: slide.iconColor }">▸</span>
              <span class="content-text">{{ item }}</span>
            </div>
          </div>
        </div>

        <!-- カードフッター -->
        <div class="card-footer">
          <span
            class="footer-chip"
            :style="{ backgroundColor: slide.iconColor + '20', color: slide.iconColor }"
          >
            <span class="footer-icon">{{ slide.icon }}</span>
            {{ categories.find(c => c.value === slide.category)?.label }}
          </span>
          <span class="slide-number">#{{ slide.id }}</span>
        </div>
      </div>
    </div>

    <!-- 結果がない場合 -->
    <div v-if="filteredSlides.length === 0" class="no-results">
      <div class="no-results-icon">🔍</div>
      <div class="no-results-text">該当するスライドが見つかりませんでした</div>
      <button
        class="reset-button"
        @click="searchQuery = ''; selectedCategory = 'all'"
      >
        フィルターをリセット
      </button>
    </div>

    <!-- フッター情報 -->
    <div class="info-box">
      <div class="info-icon">ℹ️</div>
      <div class="info-content">
        <div class="info-title">このページについて</div>
        <div class="info-text">
          Slidevで作成したプレゼンテーション資料をカードスタイルで表示しています。
          カテゴリや検索機能を使って、興味のあるコンテンツを素早く見つけることができます。
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slides-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.subtitle {
  font-size: 1.25rem;
  color: #666;
}

.search-container {
  max-width: 600px;
  margin: 0 auto 2rem;
}

.search-input {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #42A5F5;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.category-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: 2px solid;
  border-radius: 24px;
  background: transparent;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s;
}

.category-chip:hover {
  transform: scale(1.05);
}

.category-chip.active {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.category-icon {
  font-size: 1.2rem;
}

.results-count {
  text-align: center;
  padding: 0.75rem 1.5rem;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 24px;
  display: inline-block;
  margin: 0 auto 2rem;
  width: fit-content;
  display: block;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.slide-card {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.slide-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
}

.card-header {
  position: relative;
  z-index: 1;
  padding: 2rem 1.5rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.icon-emoji {
  font-size: 2rem;
}

.header-text {
  flex: 1;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.card-subtitle {
  font-size: 0.75rem;
  opacity: 0.9;
}

.divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
}

.card-content {
  padding: 1.5rem;
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}

.card-content::-webkit-scrollbar {
  width: 6px;
}

.card-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.card-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.content-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.content-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.content-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.bullet {
  font-size: 1.25rem;
  font-weight: bold;
  flex-shrink: 0;
}

.content-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #333;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.footer-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 500;
}

.footer-icon {
  font-size: 1rem;
}

.slide-number {
  color: #999;
  font-size: 0.85rem;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.no-results-text {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
}

.reset-button {
  padding: 0.75rem 2rem;
  background: #42A5F5;
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.reset-button:hover {
  background: #1976d2;
  transform: scale(1.05);
}

.info-box {
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  background: #e3f2fd;
  border-left: 4px solid #42A5F5;
  border-radius: 16px;
  margin-top: 3rem;
}

.info-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.info-content {
  flex: 1;
}

.info-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1976d2;
}

.info-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .categories {
    justify-content: flex-start;
  }

  .info-box {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
