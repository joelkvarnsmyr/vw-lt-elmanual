const en = {
    translation: {
        // App loading states
        loading: 'Loading wiring data…',
        loadError: 'Error loading data: {{error}}',

        // Nav labels
        nav: {
            circuits: 'Circuits',
            wires: 'Wire Search',
            components: 'Components',
            earth: 'Earth Points',
            blog: 'Guides',
        },

        // Header
        header: {
            subtitle: '1976–1987 · Wiring Diagrams',
            themeToLight: 'Switch to light mode',
            themeToDark: 'Switch to dark mode',
            themeLabel: 'Toggle theme',
            switchLang: 'Byt till svenska',
        },

        // App / Sidebar
        circuitsSidebarTitle: 'Circuits ({{count}})',

        // Welcome panel
        welcome: {
            heading: 'Select a circuit',
            body: 'Click a circuit in the sidebar to view its wiring diagram and wire list.',
        },

        // View headings
        views: {
            wires: 'Wire Search',
            components: 'Component Register',
            earth: 'Earth Points',
        },

        // CircuitBrowser
        circuit: {
            noSelection: 'Select a circuit in the sidebar.',
            rail: 'Rail',
            fuse: 'Fuse',
            diagram: 'Wiring Diagram',
            wiresInCircuit: 'Wires in this circuit ({{count}})',
        },

        // WireTable
        wires: {
            searchPlaceholder: 'Search wire (ID, component, colour, description)…',
            allColours: 'All colours',
            allDimensions: 'All dimensions',
            allCircuits: 'All circuits',
            count: '{{count}} wires',
            colFrom: 'From',
            colTo: 'To',
            colWire: 'Wire',
            colCircuit: 'Circuit',
            colDesc: 'Description',
        },

        // ComponentLookup
        components: {
            searchPlaceholder: 'Search component (e.g. "E22", "wiper", "horn")…',
            noResults: 'No results',
            wiresCount: '{{count}} wires',
            track: 'Track',
            circuits: 'Circuits',
            connectedWires: 'Connected wires ({{count}})',
            colFrom: 'From',
            colTo: 'To',
            colWire: 'Wire',
            colCircuit: 'Circuit',
        },

        // EarthPoints
        earth: {
            checklist: 'Checklist',
            colNr: 'No.',
            colLocationEn: 'Location (EN)',
            colLocationSv: 'Location (SV)',
        },

        // Blog
        blog: {
            heading: 'Guides & Troubleshooting',
            intro: 'Practical articles about common electrical problems on the VW LT, based on the Haynes workshop manual and our own experience.',
            backToList: 'Back to articles',
        },

        // Footer
        footer: {
            createdBy: 'Created by {{name}}',
            aiTitle: 'Ask AI about the electrical system',
            aiDesc: 'All data in this manual is available as an MCP server (Model Context Protocol). Connect your AI assistant to ask about wires, components, circuits, and troubleshoot the electrical system directly in chat.',
            aiUrl: 'MCP Server URL',
            aiHowTo: 'Connect your AI assistant',
            aiStep1: 'Copy the MCP URL above',
            aiStep2: 'Open your AI assistant and go to settings/integrations',
            aiStep3: 'Add a new MCP server and paste the URL',
            aiStep4: 'Start a new conversation and ask about the VW LT electrical system',
            aiClients: 'Supported by',
            aiExamples: 'Try asking',
            aiEx1: 'What wires are connected to wiper switch E22?',
            aiEx2: 'Which fuse protects the brake lights?',
            aiEx3: 'Explain the colour code gn/ro',
            aiEx4: 'Trace the cable path from ignition switch to fuel pump',
            aiCopied: 'Copied!',
            aiCopy: 'Copy',
            aiDocsLink: 'Setup guide',
        },
    },
} as const;

export default en;
