import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
    meta: {
      title: 'AiCopy - AI爆款内容生成器',
      description: 'AI帮你快速生成爆款内容，支持小红书标题生成、短视频口播文案、商品卖点文案',
      keywords: 'AI文案生成,小红书标题,短视频文案,商品卖点,内容创作,AI写作'
    }
  },
  {
    path: '/title',
    name: 'Title',
    component: () => import('../pages/Title.vue'),
    meta: {
      title: '小红书标题生成 - AiCopy',
      description: 'AI生成小红书爆款标题，输入产品主题和风格，一键生成20个爆款标题',
      keywords: '小红书标题,爆款标题,标题生成,AI标题,内容创作'
    }
  },
  {
    path: '/script',
    name: 'Script',
    component: () => import('../pages/Script.vue'),
    meta: {
      title: '短视频口播生成 - AiCopy',
      description: 'AI生成短视频口播文案，支持干货、搞笑、情绪、带货等多种类型',
      keywords: '短视频文案,口播文案,抖音文案,视频脚本,AI文案'
    }
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('../pages/Product.vue'),
    meta: {
      title: '商品卖点生成 - AiCopy',
      description: 'AI生成商品卖点文案和SEO描述，提升电商转化率',
      keywords: '商品卖点,电商文案,SEO描述,产品文案,AI写作'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const title = to.meta.title as string || 'AiCopy - AI爆款内容生成器'
  const description = to.meta.description as string || 'AI帮你快速生成爆款内容'
  
  document.title = title
  
  const descMeta = document.querySelector('meta[name="description"]')
  if (descMeta) {
    descMeta.setAttribute('content', description)
  }
  
  const keywordsMeta = document.querySelector('meta[name="keywords"]')
  if (keywordsMeta && to.meta.keywords) {
    keywordsMeta.setAttribute('content', to.meta.keywords as string)
  }
  
  next()
})

export default router
