<template>
  <div class="min-h-screen py-12 px-4">
    <div class="max-w-3xl mx-auto">
      <header class="text-center mb-10">
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h1 class="text-3xl font-bold gradient-text">短视频口播生成</h1>
        </div>
        <p class="text-gray-400">输入视频主题和时长，AI帮你生成完整口播文案</p>
      </header>

      <div class="glass-card rounded-2xl p-8 mb-8">
        <div class="space-y-6">
          <div>
            <label class="block text-white font-medium mb-2">视频主题</label>
            <input
              v-model="form.topic"
              type="text"
              placeholder="例如：副业、美食、旅行"
              class="input-field w-full px-4 py-3 rounded-xl text-white placeholder-gray-500"
            />
          </div>
          <div>
            <label class="block text-white font-medium mb-2">视频类型</label>
            <select
              v-model="form.type"
              class="input-field w-full px-4 py-3 rounded-xl text-white bg-inherit"
            >
              <option value="干货">干货</option>
              <option value="搞笑">搞笑</option>
              <option value="情绪">情绪</option>
              <option value="带货">带货</option>
              <option value="知识分享">知识分享</option>
            </select>
          </div>
          <div>
            <label class="block text-white font-medium mb-2">时长</label>
            <select
              v-model="form.duration"
              class="input-field w-full px-4 py-3 rounded-xl text-white bg-inherit"
            >
              <option value="30秒">30秒</option>
              <option value="60秒">60秒</option>
              <option value="90秒">90秒</option>
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

      <div v-if="script" class="glass-card rounded-2xl p-8">
        <h2 class="text-xl font-semibold text-white mb-6">生成结果</h2>
        <div class="space-y-6">
          <div v-for="section in parsedScript" :key="section.title">
            <h3 class="text-primary font-medium mb-3">{{ section.title }}</h3>
            <div class="bg-white/5 rounded-xl p-4">
              <p class="text-gray-300 whitespace-pre-wrap">{{ section.content }}</p>
            </div>
          </div>
        </div>
        <button
          @click="copyScript"
          class="mt-6 btn-primary w-full text-white py-3 rounded-xl font-medium"
        >
          复制全部文案
        </button>
      </div>

      <div v-if="error" class="glass-card rounded-2xl p-6 bg-red-500/10 border border-red-500/30">
        <p class="text-red-400">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { generateScript, type ScriptRequest } from '../api'

const form = reactive<ScriptRequest>({
  topic: '',
  type: '干货',
  duration: '60秒'
})

const script = ref('')
const isLoading = ref(false)
const error = ref('')

interface ScriptSection {
  title: string
  content: string
}

const parsedScript = computed<ScriptSection[]>(() => {
  if (!script.value) return []
  
  const sections: ScriptSection[] = []
  const parts = script.value.split(/【(.+?)】/g)
  
  for (let i = 1; i < parts.length; i += 2) {
    sections.push({
      title: `【${parts[i]}】`,
      content: parts[i + 1]?.trim() || ''
    })
  }
  
  if (sections.length === 0) {
    sections.push({
      title: '口播文案',
      content: script.value
    })
  }
  
  return sections
})

async function handleGenerate() {
  if (!form.topic.trim()) {
    error.value = '请输入视频主题'
    return
  }

  error.value = ''
  script.value = ''
  isLoading.value = true

  try {
    const response = await generateScript({
      topic: form.topic,
      type: form.type,
      duration: form.duration
    })
    if (response.success) {
      script.value = response.data
    }
  } catch (err) {
    error.value = '生成失败，请稍后重试'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

function copyScript() {
  navigator.clipboard.writeText(script.value)
}
</script>
