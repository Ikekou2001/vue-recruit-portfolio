import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const title_base = " - plumiume ポートフォリオ";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: 'ホーム' + title_base }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/views/Projects.vue'),
    meta: { title: 'プロジェクト' + title_base }
  },
  {
    path: '/skills',
    name: 'Skills',
    component: () => import('@/views/Skills.vue'),
    meta: { title: 'スキル' + title_base }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/Contact.vue'),
    meta: { title: 'お問い合わせ' + title_base }
  },
  {
    path: '/_test',
    name: 'Test',
    component: () => import('@/views/Test.vue'),
    meta: { title: 'VContainer fluid 検証' + title_base }
  },
  {
    path: '/_fluid_flexbox',
    name: 'FluidFlexbox',
    component: () => import('@/views/FluidFlexbox.vue'),
    meta: { title: 'Flexbox min-width 検証' + title_base }
  },
  {
    path: '/_negative_margin',
    name: 'NegativeMargin',
    component: () => import('@/views/NegativeMargin.vue'),
    meta: { title: 'v-row ネガティブマージン検証' + title_base }
  },
  {
    path: '/_verify_container',
    name: 'VerifyContainer',
    component: () => import('@/views/VerifyContainer.vue'),
    meta: { title: 'v-container 検証' + title_base }
  },
  {
    path: '/_verify_row',
    name: 'VerifyRow',
    component: () => import('@/views/VerifyRow.vue'),
    meta: { title: 'v-row 検証' + title_base }
  },
  {
    path: '/_verify_col',
    name: 'VerifyCol',
    component: () => import('@/views/VerifyCol.vue'),
    meta: { title: 'v-col 検証' + title_base }
  },
  {
    path: '/_verify_card',
    name: 'VerifyCard',
    component: () => import('@/views/VerifyCard.vue'),
    meta: { title: 'v-card 検証' + title_base }
  },
  {
    path: '/_verify_img',
    name: 'VerifyImg',
    component: () => import('@/views/VerifyImg.vue'),
    meta: { title: 'v-img 検証' + title_base }
  },
  {
    path: '/_verify_expansion_panels',
    name: 'VerifyExpansionPanels',
    component: () => import('@/views/VerifyExpansionPanels.vue'),
    meta: { title: 'v-expansion-panels 検証' + title_base }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Page title update
router.beforeEach((to, _from, next) => {
  document.title = (to.meta.title as string) || 'plumiume ポートフォリオ'
  next()
})

export default router
