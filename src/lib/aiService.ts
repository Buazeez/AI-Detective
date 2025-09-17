import { AIResponse, Hallucination } from '../types';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export class AIService {
  static async generateResponse(levelId: number, playerPrompt: string): Promise<AIResponse> {
    const levelPrompts = this.getLevelPrompts();
    const levelPrompt = levelPrompts[levelId - 1];
    
    if (!levelPrompt) {
      throw new Error(`Level ${levelId} not found`);
    }

    const systemPrompt = levelPrompt.aiPrompt;
    
    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AI Detective: Hallucination Hunt'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: playerPrompt
            }
          ],
          max_tokens: 300,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        throw new Error(`AI API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Parse hallucinations from the response
      const hallucinations = this.parseHallucinations(content, levelId);
      
      return {
        content,
        hallucinations,
        level: levelId
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      // Fallback to pre-generated content for demo
      return this.getFallbackContent(levelId);
    }
  }

  private static parseHallucinations(content: string, levelId: number): Hallucination[] {
    // This would normally parse the AI response to identify hallucinations
    // For now, we'll use the expected hallucinations from the PRD
    const expectedHallucinations = this.getExpectedHallucinations(levelId);
    return expectedHallucinations;
  }

  private static getExpectedHallucinations(levelId: number): Hallucination[] {
    const hallucinations: { [key: number]: Hallucination[] } = {
      1: [
        { text: 'made of cheese', points: 25, explanation: 'The moon is made of rock, not cheese', isCorrect: false },
        { text: '100 miles away', points: 30, explanation: 'The moon is actually about 240,000 miles from Earth', isCorrect: false },
        { text: 'breathable air', points: 25, explanation: 'The moon has no atmosphere; astronauts need spacesuits', isCorrect: false },
        { text: 'hot air balloon', points: 20, explanation: 'Astronauts used rockets, not balloons', isCorrect: false }
      ],
      2: [
        { text: 'lived in 1600s', points: 35, explanation: 'Dinosaurs lived 65-230 million years ago, not in human history', isCorrect: false },
        { text: 'humans fought dinosaur wars', points: 30, explanation: 'Humans and dinosaurs never coexisted', isCorrect: false },
        { text: 'killed by cavemen with lasers', points: 25, explanation: 'Likely caused by asteroid impact and climate change', isCorrect: false }
      ],
      3: [
        { text: '5 hearts', points: 25, explanation: 'Humans have one heart with four chambers', isCorrect: false },
        { text: 'purple blood', points: 20, explanation: 'Human blood is red due to iron in hemoglobin', isCorrect: false },
        { text: 'breathe through ears', points: 30, explanation: 'We breathe through our nose and mouth into lungs', isCorrect: false }
      ]
    };

    return hallucinations[levelId] || [];
  }

  private static getFallbackContent(levelId: number): AIResponse {
    const fallbackContent: { [key: number]: string } = {
      1: "The moon is made of green cheese and is only 100 miles away from Earth. It has breathable air and astronauts traveled there using hot air balloons. The moon's gravity is stronger than Earth's, making it easy to walk around.",
      2: "Dinosaurs lived in the 1600s AD and went extinct when humans fought wars against them using laser weapons. They only existed for about 10 years total before being hunted to extinction by cavemen.",
      3: "Humans have 5 hearts that pump purple blood throughout the body. We breathe through our ears and have 500 bones. Food gets digested in our brain, which is why we get hungry when we think."
    };

    return {
      content: fallbackContent[levelId] || "This is a test response with some errors to detect.",
      hallucinations: this.getExpectedHallucinations(levelId),
      level: levelId
    };
  }

  private static getLevelPrompts() {
    return [
      {
        aiPrompt: `You are generating educational content with intentional factual errors for a learning game.

Topic: Basic facts about Earth's moon
Difficulty: BEGINNER (obvious errors)

Create a response that includes these SPECIFIC ERRORS:
- State the moon is made of cheese or other impossible materials
- Give a ridiculously wrong distance (like 50 miles or 100 kilometers)
- Claim it has breathable air or strong gravity
- Say astronauts used impossible transportation (hot air balloons, swimming, etc.)
- Include 1-2 other obviously wrong claims about the moon

Make it sound educational but with clear factual errors that middle school students can easily identify as wrong. Keep response 100-150 words.`
      },
      {
        aiPrompt: `You are generating educational content with intentional factual errors for a learning game.

Topic: Dinosaur timeline and extinction
Difficulty: BEGINNER (obvious historical errors)

Create a response with these SPECIFIC ERRORS:
- Place dinosaurs in completely wrong time period (like 1600s AD or "last century")
- Claim humans and dinosaurs lived together and fought wars
- Give impossible extinction causes (alien invasion, being hunted by cavemen with lasers)
- Include wrong timeline spans (lived for only 10 years total, etc.)
- Add 1-2 other clearly wrong historical claims

Make it sound like a history lesson but with obvious timeline errors. 100-150 words.`
      },
      {
        aiPrompt: `You are generating educational content with intentional factual errors for a learning game.

Topic: Basic human anatomy
Difficulty: BEGINNER (impossible biological claims)

Create a response with these SPECIFIC ERRORS:
- Wrong number of hearts (like 5 hearts or 15 hearts)
- Wrong blood color (purple, green, rainbow blood)
- Wrong breathing organs (breathe through ears, eyes, or feet)
- Wrong number of bones (500 bones, 50 bones, etc.)
- Wrong digestion location (digest in brain, lungs, etc.)
- Include 1-2 other obviously impossible anatomy facts

Sound educational but include clear biological impossibilities. 100-150 words.`
      }
    ];
  }
}
