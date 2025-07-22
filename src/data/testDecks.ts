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
  // Nieuwe grammatica kaarten
  createFlashCard(
    'Wat is een werkwoord?',
    'Een werkwoord is een woord dat een handeling, toestand of gebeurtenis uitdrukt. Bijvoorbeeld: rennen, zijn, gebeuren.',
    DifficultyLevel.EASY,
    'Nederlands',
    ['grammatica', 'woordsoorten', 'werkwoord']
  ),
  createFlashCard(
    'Wanneer schrijf je "hun" en wanneer "hen"?',
    '"Hun" is een bezittelijk voornaamwoord (hun auto). "Hen" is een persoonlijk voornaamwoord als lijdend voorwerp (ik zie hen).',
    DifficultyLevel.HARD,
    'Nederlands',
    ['voornaamwoorden', 'hun', 'hen']
  ),
  createFlashCard(
    'Wat zijn de 8 naamvallen in het Nederlands?',
    'Het Nederlands heeft geen naamvallen meer, maar in het Middelnederlands waren er nominatief, accusatief, datief en genitief.',
    DifficultyLevel.HARD,
    'Nederlands',
    ['grammatica', 'naamvallen', 'geschiedenis']
  ),
  createFlashCard(
    'Wanneer gebruik je "wordt" en wanneer "word"?',
    '"Wordt" bij hij/zij/het (hij wordt geholpen). "Word" bij je/jij in de gebiedende wijs (word wakker!).',
    DifficultyLevel.MEDIUM,
    'Nederlands',
    ['werkwoorden', 'wordt', 'word']
  ),
  createFlashCard(
    'Wat is het verschil tussen "als" en "dan"?',
    '"Als" bij gelijkheid (zo groot als). "Dan" bij vergelijking (groter dan). "Als" ook bij tijd (als ik kom).',
    DifficultyLevel.MEDIUM,
    'Nederlands',
    ['voegwoorden', 'als', 'dan']
  ),
  createFlashCard(
    'Wat is de tegenwoordige tijd van "hebben"?',
    'Ik heb, jij hebt, hij/zij/het heeft, wij hebben, jullie hebben, zij hebben.',
    DifficultyLevel.EASY,
    'Nederlands',
    ['werkwoorden', 'hebben', 'vervoeging']
  ),
  createFlashCard(
    'Wanneer gebruik je "geen" en wanneer "niet"?',
    '"Geen" bij zelfstandige naamwoorden (geen tijd). "Niet" bij werkwoorden en bijvoeglijke naamwoorden (niet mooi).',
    DifficultyLevel.MEDIUM,
    'Nederlands',
    ['ontkenning', 'geen', 'niet']
  ),
  createFlashCard(
    'Wat is de verleden tijd van "zijn"?',
    'Ik was, jij was, hij/zij/het was, wij waren, jullie waren, zij waren.',
    DifficultyLevel.EASY,
    'Nederlands',
    ['werkwoorden', 'zijn', 'verleden-tijd']
  ),
  createFlashCard(
    'Wanneer schrijf je een woord aan elkaar?',
    'Samenstellingen schrijf je meestal aan elkaar: koffiekopje, huisdeur. Bij twijfel: kun je er "en" tussen zetten?',
    DifficultyLevel.HARD,
    'Nederlands',
    ['spelling', 'samenstellingen', 'aaneenschrijven']
  ),
  createFlashCard(
    'Wat zijn voorzetsels?',
    'Voorzetsels zijn woorden die de verhouding tussen woorden aangeven: in, op, onder, naast, tussen, voor.',
    DifficultyLevel.EASY,
    'Nederlands',
    ['woordsoorten', 'voorzetsels', 'verhoudingen']
  ),
  createFlashCard(
    'Wanneer gebruik je "die" en wanneer "dat"?',
    '"Die" bij de-woorden en meervoud (de man die, de mensen die). "dat" bij het-woorden (het huis dat).',
    DifficultyLevel.MEDIUM,
    'Nederlands',
    ['betrekkelijke-voornaamwoorden', 'die', 'dat']
  ),
  createFlashCard(
    'Wat is de voltooide tijd?',
    'De voltooide tijd geeft aan dat iets in het verleden is afgerond: ik heb gelopen, hij was gekomen.',
    DifficultyLevel.MEDIUM,
    'Nederlands',
    ['werkwoorden', 'voltooide-tijd', 'vervoegingen']
  )
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
  // Nieuwe geschiedenis kaarten
  createFlashCard(
    'Wanneer werd Nederland bezet door de Duitsers?',
    'Nederland werd op 10 mei 1940 aangevallen en capituleerde op 15 mei 1940 na het bombardement op Rotterdam.',
    DifficultyLevel.EASY,
    'Geschiedenis',
    ['wo2', 'bezetting', '1940']
  ),
  createFlashCard(
    'Wat was de Beeldenstorm?',
    'De Beeldenstorm (1566) was een opstand waarbij protestantse menigtes katholieke kerken plunderden en religieuze beelden vernielden.',
    DifficultyLevel.MEDIUM,
    'Geschiedenis',
    ['beeldenstorm', '1566', 'reformatie']
  ),
  createFlashCard(
    'Wie was Michiel de Ruyter?',
    'Michiel de Ruyter (1607-1676) was de beroemdste Nederlandse zeeheld uit de Gouden Eeuw, bekend van de zeeoorlogen tegen Engeland.',
    DifficultyLevel.MEDIUM,
    'Geschiedenis',
    ['michiel-de-ruyter', 'zeeheld', 'zeeoorlog']
  ),
  createFlashCard(
    'Wat was de Rampjaar 1672?',
    'In 1672 werd Nederland tegelijk aangevallen door Frankrijk, Engeland, Münster en Keulen. Dit jaar wordt het Rampjaar genoemd.',
    DifficultyLevel.HARD,
    'Geschiedenis',
    ['rampjaar', '1672', 'oorlog']
  ),
  createFlashCard(
    'Wanneer werd de Republiek der Zeven Verenigde Nederlanden opgericht?',
    'De Republiek werd opgericht in 1581 met de Akte van Verlating, waarbij de noordelijke provinciën de Spaanse koning afzworen.',
    DifficultyLevel.MEDIUM,
    'Geschiedenis',
    ['republiek', '1581', 'akte-verlating']
  ),
  createFlashCard(
    'Wat was de WIC?',
    'De WIC (West-Indische Compagnie) was opgericht in 1621 voor handel in Amerika en Afrika, en had het monopolie op de slavenhandel.',
    DifficultyLevel.MEDIUM,
    'Geschiedenis',
    ['wic', 'west-indië', 'slavenhandel']
  ),
  createFlashCard(
    'Wie was Johan de Witt?',
    'Johan de Witt (1625-1672) was raadpensionaris van Holland tijdens het Eerste Stadhouderloze Tijdperk en werd vermoord tijdens het Rampjaar.',
    DifficultyLevel.HARD,
    'Geschiedenis',
    ['johan-de-witt', 'raadpensionaris', 'moord']
  ),
  createFlashCard(
    'Wat was de Hongerwinter?',
    'De Hongerwinter (1944-1945) was een periode van extreme voedselschaarste in West-Nederland tijdens de laatste maanden van WOII.',
    DifficultyLevel.MEDIUM,
    'Geschiedenis',
    ['hongerwinter', '1944-1945', 'voedselschaarste']
  ),
  createFlashCard(
    'Wanneer werd Nederland een koninkrijk?',
    'In 1815 werd het Koninkrijk der Nederlanden opgericht onder koning Willem I, na de val van Napoleon.',
    DifficultyLevel.MEDIUM,
    'Geschiedenis',
    ['koninkrijk', '1815', 'willem-i']
  ),
  createFlashCard(
    'Wat was de Belgische Opstand?',
    'In 1830 kwam België in opstand tegen de Nederlandse overheersing en werd onafhankelijk van het Verenigd Koninkrijk der Nederlanden.',
    DifficultyLevel.MEDIUM,
    'Geschiedenis',
    ['belgië', '1830', 'onafhankelijkheid']
  ),
  createFlashCard(
    'Wie was Pim Fortuyn?',
    'Pim Fortuyn (1948-2002) was een populistische politicus die 9 dagen voor de verkiezingen van 2002 werd vermoord door Volkert van der G.',
    DifficultyLevel.EASY,
    'Geschiedenis',
    ['pim-fortuyn', '2002', 'moord']
  ),
  createFlashCard(
    'Wat was de Tulpenmanie?',
    'De Tulpenmanie (1634-1637) was de eerste economische zeepbel ter wereld, waarbij tulpenbollen voor astronomische bedragen werden verkocht.',
    DifficultyLevel.MEDIUM,
    'Geschiedenis',
    ['tulpenmanie', '1637', 'economische-zeepbel']
  ),
  createFlashCard(
    'Wanneer werd vrouwenkiesrecht ingevoerd?',
    'In 1919 kregen vrouwen het actief kiesrecht en in 1922 het passief kiesrecht (het recht om gekozen te worden).',
    DifficultyLevel.MEDIUM,
    'Geschiedenis',
    ['vrouwenkiesrecht', '1919', 'emancipatie']
  )
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
  // Nieuwe geografie kaarten
  createFlashCard(
    'Hoeveel provincies heeft Nederland?',
    'Nederland heeft 12 provincies: Noord-Holland, Zuid-Holland, Utrecht, Gelderland, Overijssel, Flevoland, Noord-Brabant, Zeeland, Limburg, Friesland, Groningen en Drenthe.',
    DifficultyLevel.EASY,
    'Geografie',
    ['provincies', '12-provincies', 'nederland']
  ),
  createFlashCard(
    'Wat is de grootste stad van Nederland?',
    'Amsterdam is de grootste stad van Nederland met ongeveer 873.000 inwoners in de stad en 2,4 miljoen in de metropoolregio.',
    DifficultyLevel.EASY,
    'Geografie',
    ['amsterdam', 'grootste-stad', 'inwoners']
  ),
  createFlashCard(
    'Welke provincie grenst aan België en Duitsland?',
    'Limburg is de enige provincie die zowel aan België als aan Duitsland grenst.',
    DifficultyLevel.MEDIUM,
    'Geografie',
    ['limburg', 'belgië', 'duitsland']
  ),
  createFlashCard(
    'Wat is de Randstad?',
    'De Randstad is de conurbatie van Amsterdam, Den Haag, Rotterdam en Utrecht, waar ongeveer 7 miljoen mensen wonen.',
    DifficultyLevel.MEDIUM,
    'Geografie',
    ['randstad', 'conurbatie', 'steden']
  ),
  createFlashCard(
    'Welke zee ligt ten westen van Nederland?',
    'De Noordzee ligt ten westen van Nederland en vormt de westgrens van het land.',
    DifficultyLevel.EASY,
    'Geografie',
    ['noordzee', 'westen', 'grens']
  ),
  createFlashCard(
    'Wat is het laagste punt van Nederland?',
    'Het laagste punt is Nieuwerkerk aan den IJssel in Zuid-Holland, 6,76 meter onder NAP (Normaal Amsterdams Peil).',
    DifficultyLevel.HARD,
    'Geografie',
    ['nieuwerkerk', 'laagste-punt', 'nap']
  ),
  createFlashCard(
    'Welke grote havens heeft Nederland?',
    'De grootste havens zijn Rotterdam (grootste van Europa), Amsterdam, Vlissingen en Groningen.',
    DifficultyLevel.MEDIUM,
    'Geografie',
    ['havens', 'rotterdam', 'amsterdam']
  ),
  createFlashCard(
    'Wat zijn polders?',
    'Polders zijn drooggelegde gebieden die onder de zeespiegel liggen, zoals de Noordoostpolder en de Flevopolders.',
    DifficultyLevel.MEDIUM,
    'Geografie',
    ['polders', 'drooggelegd', 'zeespiegel']
  ),
  createFlashCard(
    'Welke grote meren liggen in Nederland?',
    'Het IJsselmeer (vroeger Zuiderzee), Markermeer, Ketelmeer en Veluwemeer zijn de grootste meren.',
    DifficultyLevel.MEDIUM,
    'Geografie',
    ['meren', 'ijsselmeer', 'markermeer']
  ),
  createFlashCard(
    'Wat zijn de Zeeuwse eilanden?',
    'Schouwen-Duiveland, Noord-Beveland, Walcheren, Zuid-Beveland en Tholen zijn de belangrijkste Zeeuwse eilanden.',
    DifficultyLevel.HARD,
    'Geografie',
    ['zeeland', 'eilanden', 'delta']
  ),
  createFlashCard(
    'Welke provincies hebben geen kustlijn?',
    'Utrecht, Gelderland, Overijssel, Drenthe, Noord-Brabant en Limburg hebben geen kustlijn aan zee.',
    DifficultyLevel.MEDIUM,
    'Geografie',
    ['binnenland', 'geen-kust', 'provincies']
  ),
  createFlashCard(
    'Wat is de Afsluitdijk?',
    'De Afsluitdijk (1932) is een 32 km lange dijk die de Zuiderzee afsloot en het IJsselmeer creëerde.',
    DifficultyLevel.MEDIUM,
    'Geografie',
    ['afsluitdijk', 'zuiderzee', 'ijsselmeer']
  ),
  createFlashCard(
    'Welke nationale parken heeft Nederland?',
    'Bekende nationale parken zijn: Hoge Veluwe, Kinderdijk, Biesbosch, Zaanse Schans en Keukenhof.',
    DifficultyLevel.MEDIUM,
    'Geografie',
    ['nationale-parken', 'hoge-veluwe', 'natuurgebieden']
  )
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
    'Typisch Nederlands eten omvat stroopwafels, bitterballen, erwtensoep, stamppot, haring en poffertjes.',
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
  // Nieuwe cultuur kaarten
  createFlashCard(
    'Wie was Vincent van Gogh?',
    'Vincent van Gogh (1853-1890) was een Nederlandse post-impressionistische schilder, beroemd om werken zoals "De Zonnebloemen" en "De Sterrennacht".',
    DifficultyLevel.EASY,
    'Cultuur',
    ['van-gogh', 'schilder', 'post-impressionisme']
  ),
  createFlashCard(
    'Wat is de Elfstedentocht?',
    'De Elfstedentocht is een 200 km lange schaatswedstrijd langs elf Friese steden, die alleen bij voldoende ijs kan worden gehouden.',
    DifficultyLevel.MEDIUM,
    'Cultuur',
    ['elfstedentocht', 'friesland', 'schaatsen']
  ),
  createFlashCard(
    'Wie componeerde "Aan de Amsterdamse grachten"?',
    'Pieter Goemans componeerde dit beroemde Nederlandse lied, dat vaak wordt gezongen op feestjes en bij het voetbal.',
    DifficultyLevel.HARD,
    'Cultuur',
    ['pieter-goemans', 'amsterdam', 'volkslied']
  ),
  createFlashCard(
    'Wat is het Concertgebouw?',
    'Het Concertgebouw in Amsterdam is een van de beste concertzalen ter wereld, beroemd om zijn perfecte akoestiek.',
    DifficultyLevel.MEDIUM,
    'Cultuur',
    ['concertgebouw', 'amsterdam', 'muziek']
  ),
  createFlashCard(
    'Wie was Johannes Vermeer?',
    'Johannes Vermeer (1632-1675) was een Nederlandse schilder uit Delft, beroemd om "Het Meisje met de Parel".',
    DifficultyLevel.MEDIUM,
    'Cultuur',
    ['vermeer', 'delft', 'meisje-parel']
  ),
  createFlashCard(
    'Wat is het traditionele Nederlandse ontbijt?',
    'Traditioneel Nederlands ontbijt bestaat uit brood met hagelslag, kaas, jam of pindakaas, en vaak een gekookt eitje.',
    DifficultyLevel.EASY,
    'Cultuur',
    ['ontbijt', 'hagelslag', 'brood']
  ),
  createFlashCard(
    'Wanneer is Sinterklaas?',
    'Sinterklaas wordt gevierd op 5 december (pakjesavond) en 6 december. Het is een traditioneel Nederlands kinderfeest.',
    DifficultyLevel.EASY,
    'Cultuur',
    ['sinterklaas', '5-december', 'pakjesavond']
  ),
  createFlashCard(
    'Wat zijn de nationale kleuren van Nederland?',
    'De nationale kleuren zijn rood, wit en blauw, zoals te zien in de Nederlandse vlag.',
    DifficultyLevel.EASY,
    'Cultuur',
    ['kleuren', 'rood-wit-blauw', 'vlag']
  ),
  createFlashCard(
    'Wie was Annie M.G. Schmidt?',
    'Annie M.G. Schmidt (1911-1995) was een beroemde Nederlandse schrijfster van kinderliedjes en -verhalen, zoals "Jip en Janneke".',
    DifficultyLevel.MEDIUM,
    'Cultuur',
    ['annie-schmidt', 'kinderliteratuur', 'jip-janneke']
  ),
  createFlashCard(
    'Wat is een Hollandse nieuwe?',
    'Hollandse nieuwe is jonge haring die rauw wordt gegeten met uitjes, een traditionele Nederlandse lekkernij.',
    DifficultyLevel.MEDIUM,
    'Cultuur',
    ['hollandse-nieuwe', 'haring', 'rauw']
  ),
  createFlashCard(
    'Welke Nederlandse band werd wereldberoemd in de jaren 70?',
    'Golden Earring werd wereldberoemd met hits zoals "Radar Love" en "Twilight Zone".',
    DifficultyLevel.MEDIUM,
    'Cultuur',
    ['golden-earring', 'radar-love', '70s']
  ),
  createFlashCard(
    'Wat is het Vondelpark?',
    'Het Vondelpark in Amsterdam is het bekendste park van Nederland, vernoemd naar dichter Joost van den Vondel.',
    DifficultyLevel.EASY,
    'Cultuur',
    ['vondelpark', 'amsterdam', 'joost-vondel']
  ),
  createFlashCard(
    'Wie was Carel Willink?',
    'Carel Willink (1900-1983) was een Nederlandse magisch-realistische schilder, bekend om zijn precisie en detail.',
    DifficultyLevel.HARD,
    'Cultuur',
    ['carel-willink', 'magisch-realisme', 'schilderkunst']
  ),
  createFlashCard(
    'Wat is een Nederlandse kaas die wereldberoemd is?',
    'Goudse kaas en Edammer kaas zijn wereldwijd bekend en worden geëxporteerd naar vele landen.',
    DifficultyLevel.EASY,
    'Cultuur',
    ['goudse-kaas', 'edammer', 'export']
  ),
  createFlashCard(
    'Welke Nederlandse voetballer wordt "De Vliegende Hollander" genoemd?',
    'Johan Cruijff werd "De Vliegende Hollander" genoemd en wordt beschouwd als een van de beste voetballers aller tijden.',
    DifficultyLevel.MEDIUM,
    'Cultuur',
    ['johan-cruijff', 'vliegende-hollander', 'voetbal']
  )
]

// Nederlandse Literatuur Deck
const nederlandseLiteratuurCards: FlashCard[] = [
  createFlashCard(
    'Wie schreef "Max Havelaar"?',
    'Eduard Douwes Dekker schreef "Max Havelaar" (1860) onder het pseudoniem Multatuli. Het boek klaagt misstanden in Nederlands-Indië aan.',
    DifficultyLevel.MEDIUM,
    'Literatuur',
    ['multatuli', 'max-havelaar', 'nederlands-indië']
  ),
  createFlashCard(
    'Wie was Joost van den Vondel?',
    'Joost van den Vondel (1587-1679) was de grootste Nederlandse dichter van de Gouden Eeuw, bekend van "Gijsbrecht van Aemstel".',
    DifficultyLevel.MEDIUM,
    'Literatuur',
    ['vondel', 'gouden-eeuw', 'gijsbrecht']
  ),
  createFlashCard(
    'Wie schreef "Het Achterhuis"?',
    'Anne Frank schreef "Het Achterhuis" (dagboek) tijdens de Tweede Wereldoorlog terwijl ze ondergedoken zat in Amsterdam.',
    DifficultyLevel.EASY,
    'Literatuur',
    ['anne-frank', 'achterhuis', 'wo2']
  ),
  createFlashCard(
    'Wie was Harry Mulisch?',
    'Harry Mulisch (1927-2010) was een Nederlandse schrijver, bekend van "De Aanslag", "De Ontdekking van de Hemel" en "Het Stenen Bruidsbed".',
    DifficultyLevel.MEDIUM,
    'Literatuur',
    ['mulisch', 'aanslag', 'ontdekking-hemel']
  ),
  createFlashCard(
    'Wat is "De Avonden"?',
    '"De Avonden" (1947) door Gerard Reve is een van de belangrijkste Nederlandse romans, over Frits van Egters in het naoorlogse Amsterdam.',
    DifficultyLevel.MEDIUM,
    'Literatuur',
    ['gerard-reve', 'avonden', 'frits-egters']
  ),
  createFlashCard(
    'Wie schreef "Turks Fruit"?',
    'Jan Wolkers schreef "Turks Fruit" (1969), dat later werd verfilmd en geldt als een van de beste Nederlandse romans.',
    DifficultyLevel.EASY,
    'Literatuur',
    ['jan-wolkers', 'turks-fruit', 'roman']
  ),
  createFlashCard(
    'Wie was Cees Nooteboom?',
    'Cees Nooteboom (1933-) is een Nederlandse schrijver en dichter, winnaar van vele internationale prijzen, bekend van "Rituelen".',
    DifficultyLevel.MEDIUM,
    'Literatuur',
    ['nooteboom', 'rituelen', 'internationale-prijzen']
  ),
  createFlashCard(
    'Wat is de Gouden Griffel?',
    'De Gouden Griffel is een Nederlandse prijs voor het beste kinderboek, uitgereikt door de Griffeljury sinds 1971.',
    DifficultyLevel.MEDIUM,
    'Literatuur',
    ['gouden-griffel', 'kinderboek', 'prijs']
  ),
  createFlashCard(
    'Wie schreef "Het Bureau"?',
    'J.J. Voskuil schreef de roman-cyclus "Het Bureau" (7 delen), een van de langste Nederlandse romans ooit.',
    DifficultyLevel.HARD,
    'Literatuur',
    ['voskuil', 'het-bureau', 'lange-roman']
  ),
  createFlashCard(
    'Wie was Hella Haasse?',
    'Hella Haasse (1918-2011) was een Nederlandse schrijfster, bekend van historische romans zoals "Het Woud der Verwachting".',
    DifficultyLevel.MEDIUM,
    'Literatuur',
    ['hella-haasse', 'historische-romans', 'woud-verwachting']
  )
]

// Nederlandse Sport Deck
const nederlandseSportCards: FlashCard[] = [
  createFlashCard(
    'Hoeveel keer won Nederland het EK voetbal?',
    'Nederland won het EK voetbal één keer, in 1988 in Duitsland onder bondscoach Rinus Michels.',
    DifficultyLevel.EASY,
    'Sport',
    ['ek-voetbal', '1988', 'rinus-michels']
  ),
  createFlashCard(
    'Wie is de succesvolste Nederlandse tennisser?',
    'Richard Krajicek won Wimbledon in 1996 en is de enige Nederlandse man die een Grand Slam won.',
    DifficultyLevel.MEDIUM,
    'Sport',
    ['krajicek', 'wimbledon', '1996']
  ),
  createFlashCard(
    'Wat is de traditionele Nederlandse wielerwedstrijd?',
    'De Amstel Gold Race is de belangrijkste Nederlandse eendagswielerwedstrijd, onderdeel van de World Tour.',
    DifficultyLevel.MEDIUM,
    'Sport',
    ['amstel-gold-race', 'wielrennen', 'eendagskoers']
  ),
  createFlashCard(
    'Hoeveel gouden medailles won Nederland op de Olympische Spelen 2021?',
    'Nederland won 10 gouden medailles op de Olympische Spelen van Tokio 2021, waarvan 5 bij het roeien.',
    DifficultyLevel.MEDIUM,
    'Sport',
    ['olympische-spelen', '2021', '10-goud']
  ),
  createFlashCard(
    'Wie is de beste Nederlandse schaatser aller tijden?',
    'Sven Kramer wordt vaak gezien als de beste, met 4 olympische titels en 9 wereldtitels op de 5000m en 10000m.',
    DifficultyLevel.EASY,
    'Sport',
    ['sven-kramer', 'schaatsen', 'olympisch-kampioen']
  ),
  createFlashCard(
    'Wat is het Nederlands Elftal bekend van?',
    'Het Nederlands Elftal staat bekend om het "Totaalvoetbal" en hun oranje shirts. Ze werden 3x tweede op het WK.',
    DifficultyLevel.EASY,
    'Sport',
    ['nederlands-elftal', 'totaalvoetbal', 'oranje']
  ),
  createFlashCard(
    'Wie was Fanny Blankers-Koen?',
    'Fanny Blankers-Koen won 4 gouden medailles bij de Olympische Spelen van 1948 en wordt "De Vliegende Huisvrouw" genoemd.',
    DifficultyLevel.MEDIUM,
    'Sport',
    ['fanny-blankers-koen', '1948', 'vliegende-huisvrouw']
  ),
  createFlashCard(
    'Welke Nederlandse honkbalclub speelt in de hoofdklasse?',
    'De Nederlandse honkbalcompetitie heeft clubs zoals L&D Amsterdam Pirates, Neptunus Rotterdam en HCAW.',
    DifficultyLevel.HARD,
    'Sport',
    ['honkbal', 'pirates', 'neptunus']
  ),
  createFlashCard(
    'Wat is de Nederlandse hockeyploeg bekend van?',
    'De Nederlandse hockeyploegen (mannen en vrouwen) behoren tot de wereldtop en hebben meerdere olympische titels gewonnen.',
    DifficultyLevel.MEDIUM,
    'Sport',
    ['hockey', 'wereldtop', 'olympisch']
  ),
  createFlashCard(
    'Wie won de eerste Nederlandse Grand Prix Formule 1?',
    'Max Verstappen won de eerste Nederlandse Grand Prix sinds 1985 in 2021 op Circuit Zandvoort.',
    DifficultyLevel.EASY,
    'Sport',
    ['max-verstappen', 'zandvoort', 'formule-1']
  )
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
  {
    ...createDeck(
      'Nederlandse Literatuur',
      'Belangrijke Nederlandse schrijvers en literaire werken',
      nederlandseLiteratuurCards
    ),
    id: 'literatuur-nederland',
  },
  {
    ...createDeck(
      'Nederlandse Sport',
      'Nederlandse sporters, prestaties en sportgeschiedenis',
      nederlandseSportCards
    ),
    id: 'sport-nederland',
  },
]

// Export individual decks for convenience
export const [
  nederlandseGrammaticaDeck,
  geschiedenisNederlandDeck,
  geografieNederlandDeck,
  cultuurNederlandDeck,
  literatuurNederlandDeck,
  sportNederlandDeck,
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