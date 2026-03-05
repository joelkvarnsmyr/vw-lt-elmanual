# Fig 13.83 – Dubbelkretsbromsar och handbromsvarningslampa, 1980 on

**Källa:** VW LT Workshop Manual 1976–1987, sid 292

## Colour Code

| Kod | Färg | Kod | Färg |
|-----|------|-----|------|
| bl | Blue | ro | Red |
| br | Brown | sw | Black |
| ge | Yellow | | |
| gn | Green | | |

## Komponentförteckning (Key to Fig 13.83)

| Bet. | Beskrivning | Strömspår |
|------|-------------|-----------|
| F | Bromsljusomkopplare | 2–4 |
| F1 | Oljetrycksomkopplare | 8 |
| F9 | Handbromsvarningsomkopplare | 6 |
| K7 | Dubbelkrets broms- och handbromsvarningslampa | 5–7 |
| M9 | Bromsljus vänster | 1 |
| M10 | Bromsljus höger | 2 |
| S6 | Säkring i säkringsdosa | |
| T1 | Koppling, enkel | |

| Jord | Plats |
|------|-------|
| 11 | Jordpunkt bakom instrumentbräda |

## Kretsschema

```mermaid
flowchart TD
    subgraph Matning["Matningsskenor"]
        B30["30 Batteri+"]
        B15["15 Tändning"]
        BX["X"]
        B31["31 Jord"]
    end

    S6["🔲 S6\nSäkring i\nsäkringsdosa"]
    B30 --> S6

    subgraph Bromskrets["Bromsljuskrets"]
        F["⚡ F\nBromsljus-\nomkopplare"]
        M9["💡 M9\nBromsljus\nvänster"]
        M10["💡 M10\nBromsljus\nhöger"]
    end

    S6 -->|"F20"| F
    S6 -->|"A16"| BromsVarning
    S6 -->|"A2"| BromsVarning

    F --> M9
    F --> M10

    subgraph BromsVarning["Varningskrets"]
        K7["💡 K7\nDubbelkrets\nbroms- och\nhandbroms-\nvarningslampa"]
        F9["⚡ F9\nHandbroms-\nvarningsomkopplare"]
        F1["⚡ F1\nOljetrycks-\nomkopplare"]
    end

    S6 -->|"A14"| K7
    F9 --> K7
    F1 --> K7

    subgraph Kopplingar["Ledningsfärger"]
        direction LR
        L1["br/ro = brun/röd"]
        L2["ro/sw = röd/svart"]
        L3["bl/br = blå/brun"]
        L4["ro/ge = röd/gul"]
    end

    M9 --> GND["⏚ Jord"]
    M10 --> GND
    K7 --> GND11["⏚ 11\nBakom instrumentbräda"]

    subgraph OvrigKoppling["Övriga kopplingar"]
        G3["G3"]
        D4["D4"]
        G9["G9"]
        C12["C12"]
    end
```

## Funktionsbeskrivning

Bromsljusen **M9** (vänster) och **M10** (höger) aktiveras av bromsljusomkopplaren **F** som matas via säkring **S6**. Varningslampan **K7** visar dubbelkretsbromsfel och handbroms. Den aktiveras antingen av handbromsvarningsomkopplaren **F9** (när handbromsen är dragen) eller av oljetrycksomkopplaren **F1** (vid bromsvätskefel). Jordpunkt 11 sitter bakom instrumentbrädan.
