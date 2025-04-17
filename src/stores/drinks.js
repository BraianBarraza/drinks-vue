import { defineStore } from 'pinia'
import { onMounted, reactive, ref } from 'vue'
import APIService from '@/services/APIService.js'
import { useModalStore } from '@/stores/modal.js'

export const useDrinksStore = defineStore('drinks', () => {
  const modal = useModalStore()
  const categories = ref([])
  const search = reactive({
    name: '',
    category: '',
  })
  const recipes = ref([])
  const recipe = ref({})

  onMounted(async function () {
    const {
      data: { drinks },
    } = await APIService.getCategories()
    categories.value = drinks
  })

  async function getRecipes() {
    const {
      data: { drinks },
    } = await APIService.searchRecipes(search)
    recipes.value = drinks
  }

  async function selectDrink(id) {
    const {
      data: { drinks },
    } = await APIService.getRecipe(id)
    recipe.value = drinks[0]

    modal.handleClickModal()
  }

  return {
    categories,
    search,
    recipes,
    recipe,
    getRecipes,
    selectDrink,
  }
})
