import api from '../lib/axios.js'

export default {
  getCategories() {
    return api.get('/list.php?c=list')
  },
  searchRecipes({category, name}) {
    return api.get(`/filter.php?c=${category}&i=${name}`)
  },
  getRecipe(id){
    return api.get(`/lookup.php?i=${id}`)
  }
}
