/**
 * Test Deck Data
 * Nederlandse flashcard decks voor ontwikkeling en testen
 */

import { FlashCard, Deck, DifficultyLevel } from '../types'

// Utility function to generate UUIDs (simple version for testing)
const generateId = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

// Helper function to create a FlashCard
const createFlashCard = (
  front: string,
  back: string,
  difficulty: DifficultyLevel,
  category: string,
  tags: string[] = []
): FlashCard => ({
  id: generateId(),
  front,
  back,
  difficulty,
  category,
  tags,
  lastReviewed: null,
  nextReview: null,
  timesReviewed: 0,
  correctCount: 0,
  incorrectCount: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
})

// Nederlandse Grammatica Deck
const nederlandseGrammaticaCards: FlashCard[] = [
  createFlashCard(
    'Wat is een zelfstandig naamwoord?',
    'Een zelfstandig naamwoord is een woord dat een persoon, dier, ding of begrip benoemt. Bijvoorbeeld: hond, tafel, liefde, Maria.',
    DifficultyLevel.EASY,
    'Nederlands',
    ['grammatica', 'woordsoorten', 'basis']
  ),
  createFlashCard(
    'Wat is het verschil tussen "de" en "het"?',
    '"De" wordt gebruikt bij mannelijke en vrouwelijke woorden, "het" bij onzijdige woorden. Bijvoorbeeld: de man, de vrouw, het huis.',
    DifficultyLevel.MEDIUM,
    'Nederlands',
    ['lidwoorden', 'de', 'het']
  ),
  createFlashCard(
    'Wanneer gebruik je "dt" bij werkwoorden?',
    'Je gebruikt "dt" bij de 2e en 3e persoon enkelvoud als de stam eindigt op een t-klank: jij werkt, hij/zij werkt.',
    DifficultyLevel.HARD,
    'Nederlands',
    ['spelling', 'werkwoorden', 'dt']
  ),
  createFlashCard(
    'Wat is een bijvoeglijk naamwoord?',
    'Een bijvoeglijk naamwoord beschrijft eigenschappen van een zelfstandig naamwoord. Bijvoorbeeld: groot, mooi, interessant.',
    DifficultyLevel.EASY,
    'Nederlands',
    ['woordsoorten', 'bijvoeglijk', 'eigenschappen']
  ),
  createFlashCard(
    'Wanneer gebruik je een hoofdletter?',
    'Gebruik een hoofdletter aan het begin van een zin, bij eigennamen, aan het begin van directe rede, en bij de aanhef van een brief.',
    DifficultyLevel.MEDIUM,
    'Nederlands',
    ['spelling', 'hoofdletters', 'regels']
  ),
  createFlashCard(
    'Wat is de verleden tijd van "lopen"?',
    'De verleden tijd van "lopen" is "liep" (enkelvoud) en "liepen" (meervoud). Voltooid deelwoord: gelopen.',
    DifficultyLevel.MEDIUM,
    'Nederlands',
    ['werkwoorden', 'verleden-tijd', 'vervoeging']
  ),
]

// Geschiedenis van Nederland Deck
const geschiedenisNederlandCards: FlashCard[] = [
  createFlashCard(
    'Wanneer begon de Gouden Eeuw?',
    'De Gouden Eeuw begon rond 1600 en duurde tot ongeveer 1700. Dit was de bloeitijd van de Nederlandse Republiek.',
    DifficultyLevel.EASY,
    'Geschiedenis',
    ['gouden-eeuw', '17e-eeuw', 'bloei']
  ),
  createFlashCard(
    'Wie was Willem van Oranje?',
    'Willem van Oranje (1533-1584) was een Nederlandse edelman die leidde in de opstand tegen de Spaanse overheersing. Hij wordt ook wel "Vader des Vaderlands" genoemd.',
    DifficultyLevel.MEDIUM,
    'Geschiedenis',
    ['willem-oranje', 'opstand', 'vader-vaderland']
  ),
  createFlashCard(
    'Wat was de VOC?',
    'De VOC (Vereenigde Oost-Indische Compagnie) was een handelscompagnie opgericht in 1602 die handel dreef met Azië en een belangrijke rol speelde in de Gouden Eeuw.',
    DifficultyLevel.MEDIUM,
    'Geschiedenis',
    ['voc', 'handel', 'oost-indië']
  ),
  createFlashCard(
    'Wanneer werd Nederland bevrijd in de Tweede Wereldoorlog?',
    'Nederland werd grotendeels bevrijd op 5 mei 1945. Deze datum wordt jaarlijks gevierd als Bevrijdingsdag.',
    DifficultyLevel.EASY,
    'Geschiedenis',
    ['bevrijding', 'wo2', '5-mei']
  ),
  createFlashCard(
    'Wat was de Watersnoodramp?',
    'De Watersnoodramp vond plaats op 1 februari 1953 toen dijken in Zeeland, Zuid-Holland en Noord-Brabant doorbraken. Dit leidde tot de Deltawerken.',
    DifficultyLevel.HARD,
    'Geschiedenis',
    ['watersnood', '1953', 'deltawerken']
  ),
]

// Nederlandse Geografie Deck
const geografieNederlandCards: FlashCard[] = [
  createFlashCard(
    'Wat is de hoofdstad van Nederland?',
    'Amsterdam is de hoofdstad van Nederland, maar Den Haag is de regeringszetel waar het parlement en de regering zetelen.',
    DifficultyLevel.EASY,
    'Geografie',
    ['hoofdstad', 'amsterdam', 'den-haag']
  ),
  createFlashCard(
    'Welke provincies grenzen aan Duitsland?',
    'De provincies die grenzen aan Duitsland zijn: Groningen, Drenthe, Overijssel, Gelderland en Limburg.',
    DifficultyLevel.MEDIUM,
    'Geografie',
    ['provincies', 'duitsland', 'grenzen']
  ),
  createFlashCard(
    'Wat zijn de Waddeneilanden?',
    'De Waddeneilanden zijn een keten van eilanden in de Waddenzee: Texel, Vlieland, Terschelling, Ameland en Schiermonnikoog.',
    DifficultyLevel.MEDIUM,
    'Geografie',
    ['waddeneilanden', 'waddenzee', 'eilanden']
  ),
  createFlashCard(
    'Wat is het hoogste punt van Nederland?',
    'De Vaalserberg in Limburg is met 322,7 meter het hoogste punt van Nederland. Het ligt in de Drielandenpunt.',
    DifficultyLevel.HARD,
    'Geografie',
    ['vaalserberg', 'hoogste-punt', 'limburg']
  ),
  createFlashCard(
    'Welke rivieren stromen door Nederland?',
    'De belangrijkste rivieren zijn de Rijn, Maas, IJssel en Schelde. Deze rivieren vormen de Nederlandse delta.',
    DifficultyLevel.MEDIUM,
    'Geografie',
    ['rivieren', 'rijn', 'maas', 'ijssel']
  ),
]

// Nederlandse Cultuur Deck
const cultuurNederlandCards: FlashCard[] = [
  createFlashCard(
    'Wie schilderde "De Nachtwacht"?',
    'Rembrandt van Rijn schilderde "De Nachtwacht" in 1642. Het schilderij hangt in het Rijksmuseum in Amsterdam.',
    DifficultyLevel.EASY,
    'Cultuur',
    ['rembrandt', 'nachtwacht', 'schilderkunst']
  ),
  createFlashCard(
    'Wat is typisch Nederlands eten?',
    'Typisch Nederlands eten includes stroopwafels, bitterballen, erwtensoep, stamppot, haring en poffertjes.',
    DifficultyLevel.EASY,
    'Cultuur',
    ['eten', 'stroopwafels', 'bitterballen']
  ),
  createFlashCard(
    'Wanneer is Koningsdag?',
    'Koningsdag wordt gevierd op 27 april, de verjaardag van Koning Willem-Alexander. Het was voorheen Koninginnedag op 30 april.',
    DifficultyLevel.MEDIUM,
    'Cultuur',
    ['koningsdag', '27-april', 'feestdag']
  ),
  createFlashCard(
    'Wat is de nationale sport van Nederland?',
    'Voetbal is de meest populaire sport, maar schaatsen wordt vaak gezien als de nationale sport vanwege de Elfstedentocht.',
    DifficultyLevel.MEDIUM,
    'Cultuur',
    ['sport', 'voetbal', 'schaatsen']
  ),
]

// Create deck helper function
const createDeck = (
  name: string,
  description: string,
  cards: FlashCard[]
): Deck => ({
  id: generateId(),
  name,
  description,
  cards,
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
  totalCards: cards.length,
  reviewedCards: 0,
})

// Export test decks with consistent IDs
export const testDecks: Deck[] = [
  {
    ...createDeck(
      'Nederlandse Grammatica',
      'Essentiële grammaticaregels en spelling voor correct Nederlands',
      nederlandseGrammaticaCards
    ),
    id: 'nederlandse-grammatica',
  },
  {
    ...createDeck(
      'Geschiedenis van Nederland',
      'Belangrijke gebeurtenissen en figuren uit de Nederlandse geschiedenis',
      geschiedenisNederlandCards
    ),
    id: 'geschiedenis-nederland',
  },
  {
    ...createDeck(
      'Nederlandse Geografie',
      'Kennis over de geografie, provincies en steden van Nederland',
      geografieNederlandCards
    ),
    id: 'geografie-nederland',
  },
  {
    ...createDeck(
      'Nederlandse Cultuur',
      'Cultuur, tradities en typisch Nederlandse gewoonten',
      cultuurNederlandCards
    ),
    id: 'cultuur-nederland',
  },
]

// Export individual decks for convenience
export const [
  nederlandseGrammaticaDeck,
  geschiedenisNederlandDeck,
  geografieNederlandDeck,
  cultuurNederlandDeck,
] = testDecks

// Export statistics for dashboard
export const getTestDeckStats = () => ({
  totalDecks: testDecks.length,
  totalCards: testDecks.reduce((sum, deck) => sum + deck.totalCards, 0),
  studyStreak: 0,
  cardsToReview: testDecks.reduce((sum, deck) => sum + deck.totalCards, 0),
})

// Export cards by difficulty for testing
export const getCardsByDifficulty = (
  difficulty: DifficultyLevel
): FlashCard[] => {
  return testDecks
    .flatMap(deck => deck.cards)
    .filter(card => card.difficulty === difficulty)
}

// Export cards by category
export const getCardsByCategory = (category: string): FlashCard[] => {
  return testDecks
    .flatMap(deck => deck.cards)
    .filter(card => card.category === category)
}