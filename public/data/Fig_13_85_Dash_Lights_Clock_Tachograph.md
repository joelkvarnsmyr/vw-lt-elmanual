# Fig 13.85 – Säkring instrumentbelysning med klocka och färdskrivare, 1985 on

**Källa:** VW LT Workshop Manual 1976–1987, sid 294

## Colour Code

| Kod | Färg | Kod | Färg |
|-----|------|-----|------|
| bl | Blue | gr | Grey |
| br | Brown | ro | Red |
| ge | Yellow | sw | Black |
| gn | Green | ws | White |

## Komponentförteckning (Key to Fig 13.85)

| Bet. | Beskrivning | Strömspår |
|------|-------------|-----------|
| E3 | Nödljusomkopplare | 1, 12 |
| E20 | Instrument/instrumentpanelbelysning | 7 |
| F | Bromsljusomkopplare | 5 |
| G24 | Färdskrivare (tachograph) | 4–6 |
| L8 | Klockglödlampa | 9 |
| L10 | Instrumentpanelinsats glödlampa | 10–13 |
| L16 | Friskluftreglage glödlampa | 14 |
| L28 | Cigarettändare glödlampa | 8 |
| L39 | Bakruteuppvärmning omkopplarglödlampa | 15 |
| R | Radioanslutning | 3, 7 |
| S6 | Säkring i säkringsdosa | |
| S50 | Säkring på reläadapter | |
| T1 | Koppling, enkel, bakom instrumentbräda | |
| T1a | Koppling, enkel, bakom instrumentbräda | |
| T2 | Koppling, 2-pin, bakom instrumentbräda | |
| T2a | Koppling, 2-pin, bakom instrumentbräda | |
| T2b | Koppling, 2-pin, bakom instrumentbräda | |
| T14/ | Koppling, 14-pin, bakom instrumentbräda | |
| U1 | Cigarettändare | 2 |
| Y | Klocka | 1 |

| Jord | Plats |
|------|-------|
| 10 | Jordpunkt bakom instrumentbräda |

## Kretsschema

```mermaid
flowchart TD
    subgraph Matning["Matningsskenor"]
        B30["30"]
        B15["15"]
        BX["X"]
        B31["31"]
    end

    S6["🔲 S6\n10A Säkring"]
    B30 --> S6

    S6 --> D21["D21\n1.5 ro/ge"]
    S6 --> A14["A14\n1.0 ro/ge"]
    S6 --> C19["C19\n0.5 ro"]
    S6 --> A5["A5\n0.5 ro"]
    S6 --> D15["D15"]

    subgraph Färdskrivare["Färdskrivare"]
        G24["📊 G24\nFärdskrivare\n(tachograph)"]
    end

    A14 --> G24

    subgraph Belysning["Instrumentbelysning"]
        E20["E20\nBelysningsreglage"]
    end

    E20 --> S50["🔲 S50\n10A Säkring\npå reläadapter"]

    subgraph Kopplingar_T["Via T-kopplingar"]
        T1["T1"]
        T1a["T1a"]
        T2b_L["T2b"]
        T2b_R["T2b"]
    end

    S50 -->|"0.5 gr/bl"| T2a_L["T2a vänster"]
    S50 -->|"0.5 gr/bl"| T2a_R["T2a höger"]

    subgraph Glödlampor["Glödlampor"]
        L8["💡 L8\nKlocka"]
        L10_1["💡 L10"]
        L10_2["💡 L10"]
        L10_3["💡 L10"]
        L16["💡 L16\nFriskluft"]
        L28["💡 L28\nCigarettändare"]
        L39["💡 L39\nBakrute-\nuppvärmning"]
    end

    T2a_L --> L8
    T2a_L --> L10_1
    T2a_L --> L10_2
    T2a_R --> L10_3
    T2a_R --> L28
    T2a_R --> L16
    T2a_R --> L39

    subgraph Radio["Radio"]
        R["📻 R\nRadio"]
    end

    S50 --> R

    subgraph Övriga["Övriga"]
        U1["🔌 U1\nCigarettändare"]
        Y["🕐 Y\nKlocka"]
    end

    D15 --> U1
    E3["E3\nNödljus-\nomkopplare"] --> Y

    L8 --> GND10["⏚ 10"]
    L10_1 --> GND10
    L10_2 --> GND10
    L10_3 --> GND10
    L16 --> GND10
    L28 --> GND10
    L39 --> GND10
```

## Funktionsbeskrivning

Denna variant gäller fordon med **färdskrivare (G24)** istället för varvräknare. Kretsen är i övrigt snarlik Fig 13.84. Färdskrivaren ansluts via A14 (röd/gul, 1.0 mm²). Klockan **Y** matas separat via nödljusomkopplaren **E3**. All instrumentbelysning går via **S50** på reläadaptern och jordas vid punkt 10.
