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
      aiTitle: 'Fraga AI om elsystemet',
      aiDesc: 'All data i denna manual finns som en MCP-server (Model Context Protocol). Koppla din AI-assistent for att fraga om kablar, komponenter, kretsar och felsoka elsystemet direkt i chatten.',
      aiUrl: 'MCP Server URL',
      aiHowTo: 'Koppla din AI-assistent',
      aiStep1: 'Kopiera MCP-URL:en ovan',
      aiStep2: 'Oppna din AI-assistent och ga till installningar/integrationer',
      aiStep3: 'Lagg till en ny MCP-server och klistra in URL:en',
      aiStep4: 'Starta en ny konversation och fraga om VW LT elsystemet',
      aiClients: 'Stods av',
      aiExamples: 'Prova att fraga',
      aiEx1: 'Vilka kablar sitter pa torkaromkopplaren E22?',
      aiEx2: 'Vilken sakring skyddar bromsljusen?',
      aiEx3: 'Forklara fargkoden gn/ro',
      aiEx4: 'Spara kabelvaegen fran tandningslaset till branslepumpen',
      aiCopied: 'Kopierad!',
      aiCopy: 'Kopiera',
      aiDocsLink: 'Installningsguide',
    },
  },
} as const;

export default sv;
