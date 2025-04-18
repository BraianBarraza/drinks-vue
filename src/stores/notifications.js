import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

export const useNotificationsStore
  = defineStore('notifications', () => {

  const text = ref('')
  const error = ref(false)
  const show = ref(false)

  watchEffect( ()=>{
    if (show.value){
      setTimeout(() => {
        text.value = ''
        error.value = false
        show.value = false
      }, 3000)
    }
  })

  return {
    text,
    error,
    show,
  }

})
