import { Level } from '../types';

export const levels: Level[] = [
  {
    id: 1,
    title: "Moon Madness Mystery",
    difficulty: "beginner",
    taskBrief: "Your mission: Ask the AI to explain basic facts about Earth's moon. You're investigating claims made by a 'space expert' who seems suspicious.",
    expectedPrompt: "Tell me the basic facts about Earth's moon - how far away it is, what it's made of, whether it has air to breathe, and how the first astronauts traveled there.",
    aiPrompt: `You are generating educational content with intentional factual errors for a learning game.

Topic: Basic facts about Earth's moon
Difficulty: BEGINNER (obvious errors)

Create a response that includes these SPECIFIC ERRORS:
- State the moon is made of cheese or other impossible materials
- Give a ridiculously wrong distance (like 50 miles or 100 kilometers)
- Claim it has breathable air or strong gravity
- Say astronauts used impossible transportation (hot air balloons, swimming, etc.)
- Include 1-2 other obviously wrong claims about the moon

Make it sound educational but with clear factual errors that middle school students can easily identify as wrong. Keep response 100-150 words.`,
    maxScore: 100
  },
  {
    id: 2,
    title: "Dinosaur Detective Case",
    difficulty: "beginner",
    taskBrief: "A time-traveling 'paleontologist' claims to have witnessed dinosaurs. Ask the AI when dinosaurs lived and what caused their extinction.",
    expectedPrompt: "Explain when dinosaurs lived on Earth, when and why they went extinct, and whether humans ever lived alongside dinosaurs.",
    aiPrompt: `You are generating educational content with intentional factual errors for a learning game.

Topic: Dinosaur timeline and extinction
Difficulty: BEGINNER (obvious historical errors)

Create a response with these SPECIFIC ERRORS:
- Place dinosaurs in completely wrong time period (like 1600s AD or "last century")
- Claim humans and dinosaurs lived together and fought wars
- Give impossible extinction causes (alien invasion, being hunted by cavemen with lasers)
- Include wrong timeline spans (lived for only 10 years total, etc.)
- Add 1-2 other clearly wrong historical claims

Make it sound like a history lesson but with obvious timeline errors. 100-150 words.`,
    maxScore: 110
  },
  {
    id: 3,
    title: "Body Biology Blunders",
    difficulty: "beginner",
    taskBrief: "A 'medical student' made some wild claims about human anatomy. Ask the AI to explain how the human body works - hearts, blood, breathing, and bones.",
    expectedPrompt: "Explain basic human anatomy - how many hearts we have, what color our blood is, how we breathe, how many bones we have, and where we digest food.",
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

Sound educational but include clear biological impossibilities. 100-150 words.`,
    maxScore: 130
  },
  {
    id: 4,
    title: "Geography Gone Wrong",
    difficulty: "beginner",
    taskBrief: "An exchange student claims to know world capitals and geography. Ask the AI about major countries, their capitals, and where they're located.",
    expectedPrompt: "Tell me the capital cities of France, Germany, Australia, and China, plus which continents they're on and their approximate populations.",
    aiPrompt: `You are generating educational content with intentional factual errors for a learning game.

Topic: World geography - capitals, continents, populations
Difficulty: BEGINNER (obviously wrong geography)

Create a response with these SPECIFIC ERRORS:
- Mix up major capitals completely (France's capital is Tokyo, Germany's is Sydney, etc.)
- Put countries on wrong continents (Australia in Europe, China in Africa)
- Give impossible population numbers (China has 100 people, or 50 billion people)
- Mix up country sizes completely (Vatican City is largest country)
- Include 1-2 other clearly wrong geographic facts

Sound like a geography lesson with obvious location errors. 100-150 words.`,
    maxScore: 115
  },
  {
    id: 5,
    title: "Animal Kingdom Confusion",
    difficulty: "beginner",
    taskBrief: "A zookeeper made some incredible claims about animal abilities. Ask the AI about what different animals can do and how long they live.",
    expectedPrompt: "Tell me about animal abilities and lifespans - can elephants fly, how long do goldfish live, where do penguins live, and what do different animals eat.",
    aiPrompt: `You are generating educational content with intentional factual errors for a learning game.

Topic: Animal abilities, lifespans, and habitats
Difficulty: BEGINNER (impossible animal claims)

Create a response with these SPECIFIC ERRORS:
- Give animals impossible abilities (elephants fly, goldfish do math, etc.)
- Wrong lifespans (goldfish live 500 years, elephants live 2 years)
- Wrong diets (lions are vegetarian, rabbits eat meat)
- Wrong habitats (penguins in deserts, polar bears in tropics)
- Include 1-2 other obviously wrong animal facts

Sound educational but include clear biological impossibilities. 100-150 words.`,
    maxScore: 125
  },
  {
    id: 6,
    title: "Technology Timeline Trouble",
    difficulty: "beginner",
    taskBrief: "A 'tech historian' claims to know when major technologies were invented. Ask the AI about when the internet, smartphones, and computers were created.",
    expectedPrompt: "Tell me when major technologies were invented - the internet, first computers, and smartphones. Who invented them and in what years?",
    aiPrompt: `You are generating educational content with intentional factual errors for a learning game.

Topic: Technology invention dates and inventors
Difficulty: BEGINNER (obviously wrong historical dates)

Create a response with these SPECIFIC ERRORS:
- Put internet invention in impossible times (1800s, ancient Egypt, etc.)
- Wrong inventors (Abraham Lincoln invented computers, cavemen had smartphones)
- Impossible timelines (smartphones existed 1000 years ago)
- Mix up different technologies completely
- Include 1-2 other clearly wrong tech history facts

Sound like tech history but with obvious timeline errors. 100-150 words.`,
    maxScore: 130
  },
  {
    id: 7,
    title: "Math Madness",
    difficulty: "beginner",
    taskBrief: "A 'math tutor' gave some strange answers to basic math questions. Ask the AI about simple math facts, calculations, and number systems.",
    expectedPrompt: "Give me basic math facts - what does 2+2 equal, what is pi, how many days in a year, and are there infinitely many numbers?",
    aiPrompt: `You are generating educational content with intentional factual errors for a learning game.

Topic: Basic mathematics and number facts
Difficulty: BEGINNER (obviously wrong math)

Create a response with these SPECIFIC ERRORS:
- Wrong basic arithmetic (2+2=5, 3x3=12, etc.)
- Wrong mathematical constants (pi equals exactly 3 or 4)
- Wrong calendar facts (13 months per year, 400 days per year)
- Claims about "highest possible number" or math limits
- Include 1-2 other clearly wrong basic math facts

Sound educational but include obvious mathematical errors. 100-150 words.`,
    maxScore: 110
  },
  {
    id: 8,
    title: "Weather Weirdness",
    difficulty: "beginner",
    taskBrief: "A 'meteorologist' made some wild weather predictions. Ask the AI about how weather works, where different weather happens, and what causes weather patterns.",
    expectedPrompt: "Explain weather patterns - where does it snow, what causes rain and lightning, do deserts get rain, and how do hurricanes form?",
    aiPrompt: `You are generating educational content with intentional factual errors for a learning game.

Topic: Weather patterns and climate facts
Difficulty: BEGINNER (impossible weather claims)

Create a response with these SPECIFIC ERRORS:
- Wrong weather locations (snow in hottest deserts regularly)
- Impossible weather causes (rain falls upward, lightning made of candy)
- Wrong weather patterns (hurricanes happen on the moon)
- Impossible weather materials (hail made of diamonds)
- Include 1-2 other clearly wrong weather facts

Sound like weather education with obvious impossibilities. 100-150 words.`,
    maxScore: 115
  },
  {
    id: 9,
    title: "Statistics Stumbles",
    difficulty: "intermediate",
    taskBrief: "A 'health researcher' published statistics that seem suspicious. Ask the AI about human brain usage, handedness percentages, sleep requirements, and body weight averages.",
    expectedPrompt: "Give me statistics about humans - what percentage of our brain we use, how many people are left-handed, how much sleep we need daily, and average body weight.",
    aiPrompt: `You are generating educational content with intentional factual errors for a learning game.

Topic: Human health and body statistics
Difficulty: INTERMEDIATE (subtly wrong percentages)

Create a response with these SPECIFIC ERRORS:
- Wrong brain usage percentage (humans only use 2% or 95% of brain)
- Wrong handedness statistics (95% of people are left-handed)
- Wrong sleep requirements (need 20 hours or 1 hour of sleep daily)
- Wrong average weights (average person weighs 500 pounds or 20 pounds)
- Wrong body composition facts
- Make errors less obvious than beginner level but still clearly wrong

Sound scientifically credible but include statistical inaccuracies. 150-200 words.`,
    maxScore: 120
  },
  {
    id: 10,
    title: "History Mix-ups",
    difficulty: "intermediate",
    taskBrief: "A 'history professor' seems to have mixed up major historical events. Ask the AI about World War II dates, who was involved, major events, and how it ended.",
    expectedPrompt: "Tell me about World War II - when it happened, which countries fought on which sides, major events during the war, and how it ended.",
    aiPrompt: `You are generating educational content with intentional factual errors for a learning game.

Topic: World War II historical facts
Difficulty: INTERMEDIATE (plausible but wrong historical details)

Create a response with these SPECIFIC ERRORS:
- Wrong but believable dates (1975-1980 instead of 1939-1945)
- Mix up countries and sides (wrong alliances)
- Wrong casualty numbers (only 100 people died, or 50 billion died)
- Wrong ending details (ended due to alien intervention)
- Wrong major events and battles
- Make it sound historically plausible but factually incorrect

Sound like a history textbook with subtle errors. 150-200 words.`,
    maxScore: 150
  }
];

export const getLevelById = (id: number): Level | undefined => {
  return levels.find(level => level.id === id);
};

export const getLevelsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): Level[] => {
  return levels.filter(level => level.difficulty === difficulty);
};
