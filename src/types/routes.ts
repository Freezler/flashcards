export interface Route {
  name: string
  path: string
}

export const routes: Route[] = [
  { name: 'Home / Dashboard', path: '/' },
  { name: 'Mijn Decks', path: '/decks' },
  { name: 'Nieuw Deck', path: '/decks/new' },
  { name: 'Deck Detail', path: '/decks/:deckId' },
  { name: 'Bewerk Deck', path: '/decks/:deckId/edit' },
  { name: 'Leersessie', path: '/decks/:deckId/learn' },
  { name: 'Nieuwe Kaart', path: '/decks/:deckId/cards/new' },
  { name: 'Bewerk Kaart', path: '/decks/:deckId/cards/:cardId/edit' },
  { name: 'Voortgang / Analyse', path: '/progress' },
  { name: 'Instellingen', path: '/settings' },
  { name: 'Inloggen', path: '/login' },
  { name: 'Registreren', path: '/register' },
]
