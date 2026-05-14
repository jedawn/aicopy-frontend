<template>
  <div class="min-h-screen py-12 px-4">
    <div class="max-w-3xl mx-auto">
      <header class="text-center mb-10">
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </div>
          <h1 class="text-3xl font-bold gradient-text">小红书标题生成</h1>
        </div>
        <p class="text-gray-400">输入产品主题和风格，AI帮你生成20个爆款标题</p>
      </header>

      <div class="glass-card rounded-2xl p-8 mb-8">
        <div class="space-y-6">
          <div>
            <label class="block text-white font-medium mb-2">产品/主题</label>
            <input
              v-model="form.topic"
              type="text"
              placeholder="例如：减肥、护肤、副业"
              class="input-field w-full px-4 py-3 rounded-xl text-white placeholder-gray-500"
            />
          </div>
          <div>
            <label class="block text-white font-medium mb-2">行业</label>
            <input
              v-model="form.industry"
              type="text"
              placeholder="例如：美妆、电商、职场"
              class="input-field w-full px-4 py-3 rounded-xl text-white placeholder-gray-500"
            />
          </div>
          <div>
            <label class="block text-white font-medium mb-2">风格</label>
            <select
              v-model="form.style"
              class="input-field w-full px-4 py-3 rounded-xl text-white bg-inherit"
            >
              <option value="爆款风">爆款风</option>
              <option value="情绪风">情绪风</option>
              <option value="高级感">高级感</option>
              <option value="反差感">反差感</option>
              <option value="种草风">种草风</option>
            </select>
          </div>
          <button
            @click="handleGenerate"
            :disabled="isLoading"
            class="btn-primary w-full text-white py-4 rounded-xl font-medium text-lg loading-animation"
          >
            <span v-if="isLoading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              AI 正在生成中...
            </span>
            <span v-else>开始生成</span>
          </button>
        </div>
      </div>

      <div v-if="titles.length > 0" class="glass-card rounded-2xl p-8">
        <h2 class="text-xl font-semibold text-white mb-6">生成结果</h2>
        <div class="space-y-3">
          <div
            v-for="(title, index) in titles"
            :key="index"
            class="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
          >
            <span class="text-primary font-medium shrink-0">{{ index + 1 }}.</span>
            <span class="text-gray-300 flex-1">{{ title }}</span>
            <button
              @click="copyTitle(title)"
              class="opacity-0 group-hover:opacity-100 text-primary hover:text-purple-400 transition-opacity"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-if="error" class="glass-card rounded-2xl p-6 bg-red-500/10 border border-red-500/30">
        <p class="text-red-400">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { generateTitle, type TitleRequest } from '../api'

const form = reactive<TitleRequest>({
  topic: '',
  industry: '',
  style: '爆款风'
})

const titles = ref<string[]>([])
const isLoading = ref(false)
const error = ref('')

async function handleGenerate() {
  if (!form.topic.trim()) {
    error.value = '请输入产品/主题'
    return
  }

  error.value = ''
  titles.value = []
  isLoading.value = true

  try {
    const response = await generateTitle({
      topic: form.topic,
      industry: form.industry,
      style: form.style
    })
    if (response.success) {
      titles.value = response.data
    }
  } catch (err) {
    error.value = '生成失败，请稍后重试'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

function copyTitle(title: string) {
  navigator.clipboard.writeText(title)
}
</script>
