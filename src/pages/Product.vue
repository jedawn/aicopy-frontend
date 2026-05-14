<template>
  <div class="min-h-screen py-12 px-4">
    <div class="max-w-3xl mx-auto">
      <header class="text-center mb-10">
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
          </div>
          <h1 class="text-3xl font-bold gradient-text">商品卖点生成</h1>
        </div>
        <p class="text-gray-400">输入商品信息，AI帮你生成卖点文案和SEO描述</p>
      </header>

      <div class="glass-card rounded-2xl p-8 mb-8">
        <div class="space-y-6">
          <div>
            <label class="block text-white font-medium mb-2">商品名称</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="例如：筋膜枪、护肤品、智能手表"
              class="input-field w-full px-4 py-3 rounded-xl text-white placeholder-gray-500"
            />
          </div>
          <div>
            <label class="block text-white font-medium mb-2">商品特点</label>
            <textarea
              v-model="form.features"
              placeholder="例如：静音、便携、续航长、材质环保"
              rows="4"
              class="input-field w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 resize-none"
            ></textarea>
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

      <div v-if="result" class="space-y-6">
        <div class="glass-card rounded-2xl p-8">
          <h2 class="text-xl font-semibold text-white mb-6">商品卖点</h2>
          <div class="space-y-3">
            <div
              v-for="(point, index) in result.selling_points"
              :key="index"
              class="flex items-start gap-3 p-4 bg-white/5 rounded-xl"
            >
              <span class="text-primary font-medium shrink-0">{{ index + 1 }}.</span>
              <span class="text-gray-300">{{ point }}</span>
            </div>
          </div>
        </div>

        <div class="glass-card rounded-2xl p-8">
          <h2 class="text-xl font-semibold text-white mb-4">广告文案</h2>
          <div class="bg-white/5 rounded-xl p-4">
            <p class="text-gray-300 whitespace-pre-wrap">{{ result.ad_copy }}</p>
          </div>
        </div>

        <div class="glass-card rounded-2xl p-8">
          <h2 class="text-xl font-semibold text-white mb-4">SEO描述</h2>
          <div class="bg-white/5 rounded-xl p-4">
            <p class="text-gray-300">{{ result.seo_description }}</p>
          </div>
        </div>

        <button
          @click="copyAll"
          class="btn-primary w-full text-white py-3 rounded-xl font-medium"
        >
          复制全部内容
        </button>
      </div>

      <div v-if="error" class="glass-card rounded-2xl p-6 bg-red-500/10 border border-red-500/30">
        <p class="text-red-400">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { generateProduct, type ProductRequest, type ProductResponse } from '../api'

const form = reactive<ProductRequest>({
  name: '',
  features: ''
})

const result = ref<ProductResponse['data'] | null>(null)
const isLoading = ref(false)
const error = ref('')

async function handleGenerate() {
  if (!form.name.trim()) {
    error.value = '请输入商品名称'
    return
  }

  error.value = ''
  result.value = null
  isLoading.value = true

  try {
    const response = await generateProduct({
      name: form.name,
      features: form.features
    })
    if (response.success) {
      result.value = response.data
    }
  } catch (err) {
    error.value = '生成失败，请稍后重试'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

function copyAll() {
  if (!result.value) return
  
  const allContent = [
    '商品卖点:',
    ...result.value.selling_points.map((p: string, i: number) => `${i + 1}. ${p}`),
    '',
    '广告文案:',
    result.value.ad_copy,
    '',
    'SEO描述:',
    result.value.seo_description
  ].join('\n')
  
  navigator.clipboard.writeText(allContent)
}
</script>
