<template>
  <div class="min-h-screen py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <header class="text-center mb-16">
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <h1 class="text-4xl font-bold gradient-text" itemprop="name">AiCopy</h1>
        </div>
        <p class="text-xl text-gray-300" itemprop="description">AI 帮你快速生成爆款内容</p>
      </header>

      <main>
        <section aria-labelledby="features-title">
          <h2 id="features-title" class="sr-only">核心功能</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <article 
              class="glass-card rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-primary/50 group"
              @click="navigateTo('/title')"
              itemscope itemtype="https://schema.org/Feature"
            >
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white mb-2" itemprop="name">小红书标题生成</h3>
              <p class="text-gray-400 mb-6" itemprop="description">输入产品主题和风格，AI帮你生成20个爆款标题</p>
              <button class="btn-primary text-white px-6 py-3 rounded-xl font-medium">
                立即体验
              </button>
            </article>

            <article 
              class="glass-card rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-primary/50 group"
              @click="navigateTo('/script')"
              itemscope itemtype="https://schema.org/Feature"
            >
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white mb-2" itemprop="name">短视频口播生成</h3>
              <p class="text-gray-400 mb-6" itemprop="description">输入视频主题和时长，AI帮你生成完整口播文案</p>
              <button class="btn-primary text-white px-6 py-3 rounded-xl font-medium">
                立即体验
              </button>
            </article>

            <article 
              class="glass-card rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-primary/50 group"
              @click="navigateTo('/product')"
              itemscope itemtype="https://schema.org/Feature"
            >
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white mb-2" itemprop="name">商品卖点生成</h3>
              <p class="text-gray-400 mb-6" itemprop="description">输入商品信息，AI帮你生成卖点文案和SEO描述</p>
              <button class="btn-primary text-white px-6 py-3 rounded-xl font-medium">
                立即体验
              </button>
            </article>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateTo(path: string) {
  router.push(path)
}
</script>
