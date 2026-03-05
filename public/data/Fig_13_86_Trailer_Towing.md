# Fig 13.86 – Släpvagnsdragning (Trailer Towing), 1983–1985

**Källa:** VW LT Workshop Manual 1976–1987, sid 295

## Colour Code

| Kod | Färg | Kod | Färg |
|-----|------|-----|------|
| bl | Blue | gr | Grey |
| br | Brown | ro | Red |
| ge | Yellow | sw | Black |
| gn | Green | | |

## Komponentförteckning

| Bet. | Beskrivning | Strömspår |
|------|-------------|-----------|
| S14 | Säkring 8A | |
| S13 | Säkring 8A | |
| N24 | | |
| N23 | | |
| J2 | Nödljusrelä | |
| N22 | | |
| N25 | | |
| E1 | Ljusomkopplare | |
| E3 | Nödljusomkopplare | |
| K5 | Blinkervarningslampa | |
| K18 | Kontrolllampa | |
| F | Bromsljusomkopplare | |
| M1 | Sidoljus vänster (släp) | |
| E1 | Ljusomkopplare | |
| E3 | Nödljusomkopplare | |
| M5 | Blinker fram vänster (släp) | |
| M6 | Blinker bak vänster (släp) | |
| M4 | Blinker bak (släp) | |
| M16 | Backljus vänster (släp) | |
| X | Nummerskyltsljus | |
| U | Släpvagnskontaktdon | |
| M23 | Sidoljus (släp) | |
| M10 | Bromsljus (släp) | |
| M2 | Bakljus höger (släp) | |
| M8 | Blinker höger (släp) | |
| M24 | Sidoljus höger (släp) | |

## Kretsschema – Släpvagnsuttag

```mermaid
flowchart TD
    subgraph Matning["Matningsskenor"]
        B30["30 Batteri+"]
        B15["15 Tändning"]
        BX["X"]
        B31["31 Jord"]
    end

    S14["🔲 S14\n8A Säkring"]
    S13["🔲 S13\n8A Säkring"]
    B30 --> S14
    B30 --> S13

    subgraph BlinkRelä["Blink/nödljus"]
        N24["N24"]
        N23["N23"]
        J2["⬜ J2\nNödljusrelä"]
        N22["N22"]
        N25["N25"]
    end

    S14 --> J2
    S13 --> J2

    subgraph Fordonets_lampor["Fordonets lampor (matning)"]
        A6["A6\n1.0 sw/ws"]
        F19["F19\n1.0 sw/ws"]
        F20["F20\n1.0"]
        A9["A9\n0.5 gr/sw"]
        E1_sig["E1\n1.0"]
        D12["D12\n0.5"]
        E3_sig["E3\n1.0 sw/ws/gn"]
        D1["D1\n0.5 bl/ro"]
        D5["D5\n0.5 bl/ge"]
    end

    subgraph Släpkontakt["Släpvagnskontaktdon"]
        direction LR
        T2["T2\nKoppling, enkel\nbakom instrumentbräda"]
        T1["T1\nKoppling, enkel\ni motorrum"]
    end

    subgraph SläpLampor["Släpvagnslampor"]
        direction TB
        M23_s["💡 M23\nSidoljus vänster"]
        M5_s["💡 M5\nBlinker\nfram vänster"]
        M6_s["💡 M6\nBlinker\nbak vänster"]
        M1_s["💡 M1\nSidoljus"]
        E3_s["💡 E3"]
        K5_s["💡 K5"]
        M10_s["💡 M10\nBromsljus"]
        M4_s["💡 M4\nBakljus"]
        X_s["💡 X\nSkyltbelysning"]
        M16_s["💡 M16\nBackljus"]
        M2_s["💡 M2\nBakljus höger"]
        M8_s["💡 M8\nBlinker höger"]
        M24_s["💡 M24\nSidoljus höger"]
    end

    J2 --> M5_s
    J2 --> M6_s
    J2 --> M8_s
    E1_sig --> M23_s
    E1_sig --> M1_s
    E1_sig --> M24_s
    F20 --> M10_s

    subgraph T14_koppling["T14/4 Kontaktdon"]
        K18["💡 K18\nKontrolllampa"]
    end

    subgraph Jord["Jordpunkter"]
        GND18["⏚ 18"]
        GND19["⏚ 19"]
    end

    M23_s --> GND18
    M5_s --> GND18
    M24_s --> GND19
    M8_s --> GND19
```

## Funktionsbeskrivning

Släpvagnskopplingen matas via två separata 8A säkringar **S14** och **S13**. Blink- och nödljussignalerna går genom nödljusrelät **J2** och distribueras till släpvagnens blinkers. Sidoljusen styrs av ljusomkopplaren **E1**, bromsljusen av bromsljusomkopplaren **F**. Kontrolllampa **K18** indikerar släpvagnens anslutning. Jordning sker vid punkterna 18 (bakre sidolem vänster) och 19 (bakre sidolem höger).
