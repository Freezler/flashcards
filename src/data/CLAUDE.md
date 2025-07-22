# Nederlandse Test Data Context

## Overzicht

Deze map bevat Nederlandse voorbeelddata voor ontwikkeling en testen. Alle data gebruikt de TypeScript interfaces gedefinieerd in `../types/`.

## Huidige Data Bestanden

### testDecks.ts

- **Doel**: Biedt realistische Nederlandse flashcard decks voor ontwikkeling en testen
- **Inhoud**: 4 uitgebreide decks over Nederlandse onderwerpen
- **Totaal Kaarten**: 20+ flashcards verdeeld over verschillende moeilijkheidsgraden

#### Beschikbare Decks:

1. **Nederlandse Grammatica** (6 kaarten)
   - Zelfstandige naamwoorden, lidwoorden, werkwoorden
   - Spelling regels, dt-regel, hoofdletters
   - Moeilijkheid: Makkelijk tot Moeilijk

2. **Geschiedenis van Nederland** (5 kaarten)
   - Gouden Eeuw, Willem van Oranje, VOC
   - Tweede Wereldoorlog, Watersnoodramp
   - Moeilijkheid: Makkelijk tot Moeilijk

3. **Nederlandse Geografie** (5 kaarten)
   - Hoofdstad, provincies, Waddeneilanden
   - Hoogste punt, rivieren
   - Moeilijkheid: Makkelijk tot Moeilijk

4. **Nederlandse Cultuur** (4 kaarten)
   - Rembrandt, typisch Nederlands eten
   - Koningsdag, nationale sport
   - Moeilijkheid: Makkelijk tot Moeilijk

## Geëxporteerde Functies

### Basis Data
- `testDecks`: Array van alle voorbeeld decks
- `nederlandseGrammaticaDeck`, `geschiedenisNederlandDeck`, etc.: Individuele decks

### Statistieken
- `getTestDeckStats()`: Retourneert dashboard statistieken object
- `getCardsByDifficulty(difficulty)`: Filter kaarten op moeilijkheidsgraad
- `getCardsByCategory(category)`: Filter kaarten op categorie

## Gebruik Voorbeelden

```typescript
import { testDecks, getTestDeckStats, getCardsByDifficulty } from '../data'

// Krijg alle decks
const alleDecks = testDecks

// Krijg dashboard stats
const stats = getTestDeckStats()

// Krijg alleen moeilijke kaarten
const moeilijkeKaarten = getCardsByDifficulty(DifficultyLevel.HARD)
```

## Data Kwaliteit

- Alle flashcards volgen juiste TypeScript interfaces
- Realistische Nederlandse educatieve inhoud
- Gebalanceerde moeilijkheidsverdeling
- Juiste categorisering en tagging
- Timestamps en metadata inbegrepen

## Toekomstige Verbeteringen

- [ ] Voeg meer diverse onderwerpen toe (wiskunde, natuurkunde, etc.)
- [ ] Inclusief multimedia inhoud (afbeeldingen, voorbeelden)
- [ ] Voeg spaced repetition planning data toe
- [ ] Inclusief gebruikersinteractie geschiedenis
- [ ] Voeg deck delen en community functies toe