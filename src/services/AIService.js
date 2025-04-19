import { openRouter } from '@/lib/ai.js'
import { streamText } from 'ai'


openRouter()

export default {
  async generateRecipe(prompt){
    const  result = streamText({
      model: openRouter('google/gemini-2.0-flash-exp:free'),
      prompt
    })

    return result.textStream
  }
}
