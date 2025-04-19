import { defineStore } from 'pinia'
import { ref } from 'vue'
import AIService from '@/services/AIService.js'

export const useAIStore
  = defineStore('ai', () => {
  const prompt = ref('')
  const answer = ref('')
  const loading = ref(false)

  async function generateRecipe() {
    answer.value = ''
    loading.value = true
    const result = await AIService.generateRecipe(prompt.value)
    for await(const text of result) {
      answer.value += text
    }
    loading.value = false
  }

  return {
    prompt,
    answer,
    loading,
    generateRecipe
  }
})
