# Fig 13.84 – Säkring instrumentbelysning med varvräknare, 1985 on

**Källa:** VW LT Workshop Manual 1976–1987, sid 293

## Colour Code

| Kod | Färg | Kod | Färg |
|-----|------|-----|------|
| bl | Blue | gr | Grey |
| br | Brown | ro | Red |
| ge | Yellow | sw | Black |
| gn | Green | ws | White |

## Komponentförteckning (Key to Fig 13.84)

| Bet. | Beskrivning | Strömspår |
|------|-------------|-----------|
| C | Alternator (enbart diesel) | 6 |
| D | Tändning/startomkopplare | 6 |
| E3 | Nödljusomkopplare | 2, 12 |
| E20 | Instrument/instrumentpanelbelysning | 11 |
| F | Bromsljusomkopplare | 1 |
| G5 | Varvräknare | 5 |
| L8 | Klockglödlampa | 7 |
| L10 | Instrumentpanelinsats glödlampa | 8–11 |
| L16 | Friskluftreglage glödlampa | 13 |
| L28 | Cigarettändare glödlampa | 11 |
| L39 | Bakruteuppvärmning omkopplarglödlampa | 14 |
| N | Tändspole (enbart bensinmotor) | 7 |
| R | Radioanslutning | 4, 10 |
| S6 | Säkring i säkringsdosa | |
| S50 | Säkring på reläadapter | |
| T1 | Koppling, enkel, bakom instrumentbräda | |
| T1a | Koppling, enkel, bakom instrumentbräda | |
| T1b | Koppling, enkel, bakom instrumentbräda | |
| T1c | Koppling, enkel, bakom instrumentbräda | |
| T2a | Koppling, 2-pin, bakom instrumentbräda | |
| T2b | Koppling, 2-pin, bakom instrumentbräda | |
| T14/ | Koppling, 14-pin, bakom instrumentbräda | |
| U1 | Cigarettändare | 3 |

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

    S6 --> A14["A14\n1.0 ro/ge"]
    S6 --> D21["D21\n1.5 ro/ge"]
    S6 --> A5["A5\n0.5 ro"]
    S6 --> D15["D15\n1.0 sw"]
    S6 --> C19["C19\n0.5 ro/sw"]

    subgraph Instrument["Instrumentbelysning"]
        E20["E20\nInstrument-\nbelysning"]
        G5["G5\nVarvräknare"]
        L8["💡 L8\nKlocka"]
        L10a["💡 L10\nInstrumentpanel\nglödlampa"]
        L10b["💡 L10\nInstrumentpanel\nglödlampa"]
        L16["💡 L16\nFriskluft-\nreglage"]
        L28["💡 L28\nCigarettändare"]
        L39["💡 L39\nBakrute-\nuppvärmning"]
    end

    S50["🔲 S50\n10A Säkring\npå reläadapter"]
    E20 --> S50

    S50 -->|"0.5 gr/bl"| T2a_L["T2a"]
    S50 -->|"0.5 gr/bl"| T2a_R["T2a"]

    T2a_L --> L10a
    T2a_L --> L8
    T2a_R --> L10b
    T2a_R --> L28
    T2a_R --> L16
    T2a_R --> L39

    subgraph RadioKrets["Radio"]
        R["📻 R\nRadio"]
    end

    S50 --> R

    subgraph Kopplingar["T14/ Kontaktdon"]
        T14["T14/\n14-pin kontakt\npå instrumentbräda"]
    end

    subgraph Övriga["Övriga anslutningar"]
        U1["🔌 U1\nCigarettändare"]
        T1["T1 Koppling"]
    end

    D15 --> U1
    A14 --> G5

    G5 --> GND10["⏚ 10\nBakom instrumentbräda"]
    L8 --> GND10
    L10a --> GND10
    L10b --> GND10
```

## Funktionsbeskrivning

Instrumentbelysningen på 1985+ modeller med varvräknare matas via säkring **S6** (10A). Huvudbelysningsreglaget **E20** styr belysningsnivån till instrumentpanelen. Säkring **S50** på reläadaptern skyddar instrumentglödlamporna **L10**, klockbelysningen **L8**, cigarettändarbelysningen **L28** och friskluftreglagebelysningen **L16**. Alla jordas vid punkt 10 bakom instrumentbrädan. Varvräknaren **G5** ansluts via A14 (röd/gul kabel, 1.0 mm²).
