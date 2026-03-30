# Contact onder spanning

**Serious game voor MBO-begeleiders in de gehandicaptenzorg**

Een mobiel speelbare serious game (PWA) waarmee begeleiders oefenen met de-escalatie bij een cliënt met LVB en sociaal-emotioneel niveau 2–3 jaar.

## Wat doet de game?

De speler speelt een scenario waarbij cliënt Milan (24 jaar, LVB) gefrustreerd raakt tijdens een contactmoment. In 5 fasen maak je keuzes die de stress- en vertrouwensmeter beïnvloeden:

1. **Observeren** — signalen herkennen
2. **Spanningsopbouw** — overgang aankondigen
3. **Escalatiepunt** — omgaan met agressie
4. **De-escalatie** — veiligheid & prikkelreductie
5. **Herstel** — regulatie en vervolg

Na afloop: eindrapport, reflectievragen (PEARLS-model) en mogelijkheid om opnieuw te spelen.

## Tech stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- PWA (vite-plugin-pwa + Workbox)
- Lokale state (geen backend)
- Alle content in `src/data/scenario.ts`

## Installeren

```bash
npm install
```

## Starten (development)

```bash
npm run dev
```

Open http://localhost:5173 in je browser.

## Testen op telefoon

1. Start de dev server: `npm run dev -- --host`
2. Zoek je lokale IP-adres (bijv. `192.168.1.x`)
3. Open `http://<jouw-ip>:5173` op je telefoon
4. Of: bouw voor productie en deploy naar een HTTPS-host voor volledige PWA-functionaliteit

## Bouwen voor productie

```bash
npm run build
npm run preview
```

De output staat in `dist/`.

## Scenario-content aanpassen

Alle game-inhoud staat in `src/data/scenario.ts`. De datastructuur:

```typescript
interface Scene {
  id: string;
  phase: number;
  title: string;
  narrative: string;        // Beschrijving van de situatie
  clientBehavior: string;   // Gedrag van Milan
  choices: Choice[];        // 3 keuzemogelijkheden per scène
}

interface Choice {
  id: string;
  label: string;            // Knoptekst
  responseText: string;     // Wat de speler zegt/doet
  stressDelta: number;      // Effect op stress (-15 tot +30)
  trustDelta: number;       // Effect op vertrouwen (-20 tot +20)
  feedback: string;         // Uitleg na de keuze
  nextSceneId: string;      // Volgende scène
  tags: string[];           // Categorisering
}
```

Om scènes toe te voegen of te wijzigen, bewerk je het `scenes`-array in `scenario.ts`. Het scenario wordt automatisch bijgewerkt.

## Projectstructuur

```
src/
  components/     # Herbruikbare UI-componenten
    ButtonChoice.tsx
    StressBar.tsx
    TrustBar.tsx
    ScenarioCard.tsx
    FeedbackPanel.tsx
    EndReportCard.tsx
    ProgressBar.tsx
    Disclaimer.tsx
  data/
    scenario.ts   # Alle game-content en datastructuren
  hooks/
    useGameState.ts  # Game state management
  pages/          # Schermen
    StartScreen.tsx
    GoalsScreen.tsx
    IntroScreen.tsx
    SceneScreen.tsx
    FeedbackScreen.tsx
    ResultScreen.tsx
    ReflectionScreen.tsx
    ReviewScreen.tsx
  App.tsx          # Hoofdcomponent met routing
  main.tsx         # Entry point
  index.css        # Tailwind + custom theme
```

## Disclaimer

- Deze casus is volledig fictief.
- Alle inhoud is uitsluitend bedoeld voor educatieve doeleinden.
- Dit is geen medisch of juridisch advies.
