import { openRouter } from '@/lib/ai.js'
import { streamText } from 'ai'


openRouter()

export default {
  async generateRecipe(prompt){
    const  result = streamText({
      model: openRouter('google/gemini-2.0-flash-exp:free'),
      system: 'you are a bartender, and people will ask you for drinks recommendations',
      prompt,
    })

    return result.textStream
  }
}
