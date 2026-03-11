const sv = {
  translation: {
    // App loading states
    loading: 'Laddar kopplingsdata…',
    loadError: 'Fel vid laddning: {{error}}',

    // Nav labels
    nav: {
      circuits: 'Kretsar',
      wires: 'Kabelsök',
      components: 'Komponenter',
      earth: 'Jordpunkter',
      blog: 'Guider',
    },

    // Header
    header: {
      subtitle: '1976–1987 · Kopplingsschema',
      themeToLight: 'Byt till ljust läge',
      themeToDark: 'Byt till mörkt läge',
      themeLabel: 'Växla tema',
      switchLang: 'Switch to English',
    },

    // App / Sidebar
    circuitsSidebarTitle: 'Kretsar ({{count}})',

    // Welcome panel
    welcome: {
      heading: 'Välj en krets',
      body: 'Klicka på en krets i sidomenyn för att visa kopplingsschema och kabellista.',
    },

    // View headings
    views: {
      wires: 'Kabelsök',
      components: 'Komponentregister',
      earth: 'Jordpunkter',
    },

    // CircuitBrowser
    circuit: {
      noSelection: 'Välj en krets i sidomenyn.',
      rail: 'Skena',
      fuse: 'Säkring',
      diagram: 'Kopplingsschema',
      wiresInCircuit: 'Kablar i denna krets ({{count}})',
    },

    // WireTable
    wires: {
      searchPlaceholder: 'Sök kabel (ID, komponent, färg, beskrivning)…',
      allColours: 'Alla färger',
      allDimensions: 'Alla dimensioner',
      allCircuits: 'Alla kretsar',
      count: '{{count}} kablar',
      colFrom: 'Från',
      colTo: 'Till',
      colWire: 'Kabel',
      colCircuit: 'Krets',
      colDesc: 'Beskrivning',
    },

    // ComponentLookup
    components: {
      searchPlaceholder: 'Sök komponent (t.ex. "E22", "torkar", "horn")…',
      noResults: 'Inga träffar',
      wiresCount: '{{count}} kablar',
      track: 'Spår',
      circuits: 'Kretsar',
      connectedWires: 'Anslutna kablar ({{count}})',
      colFrom: 'Från',
      colTo: 'Till',
      colWire: 'Kabel',
      colCircuit: 'Krets',
    },

    // EarthPoints
    earth: {
      checklist: 'Kontrollista',
      colNr: 'Nr',
      colLocationEn: 'Placering (EN)',
      colLocationSv: 'Placering (SV)',
    },

    // Blog
    blog: {
      heading: 'Guider & felsökning',
      intro: 'Praktiska artiklar om vanliga elproblem på VW LT, baserade på Haynes verkstadsmanual och vår egen erfarenhet.',
      backToList: 'Tillbaka till artiklar',
    },

    // Footer
    footer: {
      createdBy: 'Skapad av {{name}}',
      aiTitle: 'Fråga AI om elsystemet',
      aiDesc: 'All data i denna manual finns som en MCP-server (Model Context Protocol). Koppla din AI-assistent för att fråga om kablar, komponenter, kretsar och felsöka elsystemet direkt i chatten.',
      aiUrl: 'MCP Server URL',
      aiClients: 'Koppla din AI-assistent',
      aiExamples: 'Prova att fråga',
      aiEx1: 'Vilka kablar sitter på torkaromkopplaren E22?',
      aiEx2: 'Vilken säkring skyddar bromsljusen?',
      aiEx3: 'Förklara färgkoden gn/ro',
      aiEx4: 'Spåra kabelvägen från tändningslåset till bränslepumpen',
      aiCopied: 'Kopierad!',
      aiCopy: 'Kopiera',
      aiDocsLink: 'Dokument',
      howClaude: 'Inställningar → Connectors → Lägg till anpassad connector → klistra in URL. Gratis: 1 connector. Pro/Max: obegränsat.',
      howChatGPT: 'Aktivera Developer Mode i Inställningar → Apps & Connectors → Lägg till connector → klistra in URL. Kräver Pro, Team eller Enterprise.',
      howGrok: 'Stödjer remote MCP-verktyg direkt. Se xAI-dokumentationen för konfiguration.',
      howCursor: 'Settings → Developer → Edit MCP Config → lägg till server med URL. Använd mcp-remote för HTTP-servrar.',
      howClaudeCode: 'Kör: claude mcp add vw-lt-wiring --transport http https://vw-lt-mcp.vercel.app/mcp',
    },
  },
} as const;

export default sv;
