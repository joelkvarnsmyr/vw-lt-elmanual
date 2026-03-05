# VW LT Wiring Database – Komplett digital dokumentation

> **Källa:** Volkswagen LT Workshop Manual 1976–1987
> **Genererad:** 2026-03-04, uppdaterad 2026-03-05 (v0.2 diagram refactor)
> **Omfattning:** Alla generiska/modell-oberoende kopplingsscheman + referensdata

---

## Filstruktur

### Databaser (JSON)
| Fil | Innehåll | Syfte |
|-----|----------|-------|
| `vw_lt_complete_wiring_database.json` | 119 KB – Alla 9 diagram, 167 komponenter, 304 kablar, 7 referenssektioner | Master-databas, komplett |
| `vw_lt_wire_lookup.json` | Flat wire table + circuits index | **AI-optimerad sökbar kabeltabell** |
| `vw_lt_reference_data.json` | Färgkoder, säkringsvärden, terminaldef, jordpunkter, felsökning | Referensdata |
| `vw_lt_fig10_34_35.json` | Fig 10.34/10.35 specifik data | Tidiga modeller |
| `vw_lt_generic_wiring.json` | Generisk kabeldata | Modell-oberoende |

### Mermaid-diagram (.mermaid) – 16 st
| Fil | Innehåll | Källa |
|-----|----------|-------|
| `00_system_overview.mermaid` | Systemöversikt – alla kretsar och matningsskenor | Alla figurer |
| `01_power_distribution.mermaid` | Strömförsörjning: batteri → tändningslås → säkringar | Fig 10.34 |
| `02_lighting_circuit.mermaid` | Belysning: helljus, halvljus, sido/bakljus, panelbelysning | Fig 10.34 |
| `03_wiper_washer.mermaid` | Torkare/spolare inkl. strålkastartvätt (W001-W027) | Fig 13.80/10.35 |
| `04_turn_signals.mermaid` | Blinkers och varningsblinkers, M6/M7 jordpunkter | Fig 10.34 |
| `05_instruments.mermaid` | Instrument: bränsle, temp, oljetryck, varningslampor, T10 | Fig 10.34 |
| `06_foglight.mermaid` | Dimljus fram/bak, J5 relä-terminaler (1981-85 + 1986+) | Fig 13.81/82 |
| `07_trailer_towing.mermaid` | Släpvagnskoppling med 7-stifts uttag, S13/S14 | Fig 13.86 |
| `08_brake_circuit.mermaid` | Bromskrets med wire IDs F20/A16/A2/A14/G3/D4 | Fig 13.83 |
| `09_supplementary.mermaid` | Bakruteuppvärmning, 3-stegsfläkt, innerbelysning, tuta | Fig 10.34 |
| `10_gnd_triggered.mermaid` | Konceptdiagram: jordkopplade kretsar (undervisning) | Princip |
| `11_starter_circuit.mermaid` | Startmotor, jordband ⏚1/⏚2/⏚3, C1 regulator | Fig 10.34 |
| `12_fuel_pump.mermaid` | Bränslepump V14, C15 kabel, T1 koppling | Fig 10.34 |
| `13_dash_lights_rev_counter.mermaid` | Instrumentbelysning med varvräknare G5, S50 kedja | Fig 13.84 |
| `14_dash_lights_clock_tacho.mermaid` | Instrumentbelysning med klocka Y / färdskrivare G24 | Fig 13.85 |
| `15_charging_circuit.mermaid` | Laddningskrets: C generator, C1 regulator, K2 varning | Fig 10.34 |

### Dokumentation (Markdown)
| Fil | Innehåll |
|-----|----------|
| `README.md` | Denna fil – index och guide |
| `00_INDEX.md` | Figurmappning och innehållsförteckning |
| `COMPONENT_INDEX.md` | Alla komponenter A-Z med korsreferenser (308 rader) |
| `EARTH_POINTS.md` | Alla jordpunkter med placering |
| `SYSTEM_DESCRIPTIONS.md` | Funktionsbeskrivningar per krets |
| `WORKPLAN.md` | Projektplan och fasstatus |
| `Fig_13_80_Headlight_Washers.md` | Strålkastartvätt detaljerat |
| `Fig_13_81_Foglights_1981_1985.md` | Dimljus 1981-85 detaljerat |
| `Fig_13_82_Foglights_1986_on.md` | Dimljus 1986+ detaljerat |
| `Fig_13_83_Dual_Circuit_Brakes.md` | Dubbelkretsbromsar detaljerat |
| `Fig_13_84_Dash_Lights_Rev_Counter.md` | Instrumentbelysning m varvräknare |
| `Fig_13_85_Dash_Lights_Clock_Tachograph.md` | Instrumentbelysning m färdskrivare |
| `Fig_13_86_Trailer_Towing.md` | Släpvagnsdragning detaljerat |
| `Keys_Supplementary_Diagrams.md` | Nycklar till Fig 13.80-13.85 |
| `Key_Fig_13_77_4cyl.md` | Nyckel 4-cyl 1981+ |
| `Key_Fig_13_78_6cyl_1983_1985.md` | Nyckel 6-cyl 1983-85 |
| `Key_Fig_13_79_6cyl_1986_1987.md` | Nyckel 6-cyl 1986-87 |

---

## Diagram v0.2 – Förbättringar

Alla 16 Mermaid-diagram har uppdaterats med:
- **classDef** färgkodning: power (röd), ignition (orange), ground (brun), fuse (grå), relay (blå), switch (grön), lamp (gul), motor (lila), sensor (teal), connector (ljusgrå)
- **Subgraphs** per funktionsgrupp (matningsskenor, säkringsdosa, komponenter, jordpunkter)
- **Kantbeteckningar** med wire ID, mm², färgkod (t.ex. `"W050 F20 1.0mm² br/ro"`)
- **Specifika jordpunkter** (⏚1, ⏚2, ⏚10, etc.) istället för generiskt "GND"
- **Kopplingsdon** (T1, T2, T10, T14, etc.) inritade
- **UNVERIFIED**-kommentarer för null-värden från JSON

---

## Hur AI-modeller navigerar datan

### Frågetyper och sökstrategi

**"Vilken kabel går från X till Y?"**
→ Sök i `vw_lt_wire_lookup.json` → `wires[]` → filtrera på `from_component` + `to_component`

**"Vad är det för grön kabel med röd rand?"**
→ Sök `colour_main=gn` + `colour_stripe=ro` → hittar `gn/ro` kablar

**"Vilken säkring skyddar torkarkretsen?"**
→ Sök `circuits_index` → `wiper` → `fuse: S11`

**"Vad är anslutet till E22 torkaromkopplaren?"**
→ Sök alla wires där `from_component=E22` ELLER `to_component=E22`

**"Spåra bromskretsen från batteri till jord"**
→ `circuits_index.brake_lights` → `power_rail: 30` → `S6 fuse` → `F switch` → `M9/M10` → `GND (br)`

**"Vilken komponent är K7?"**
→ Sök i `vw_lt_complete_wiring_database.json` → `component_key` eller `components[]`

### Designprinciper

1. **Flat wire table** – Varje kabelsegment är en sökbar rad med alla attribut
2. **Circuit index** – Snabb översikt: krets → säkring → matning → komponenter
3. **Dual language** – Engelska + svenska i nyckelfält
4. **Cross-reference** – Wire IDs matchar diagram-beteckningar (C6, E16, D21 etc.)
5. **Null-markering** – Värden som ej kunde avläsas är `null`, inte gissade

---

## Färgkodsnyckel

| Kod | Färg | Hex (ungefärlig) |
|-----|------|-------------------|
| bl | Blå / Blue | #0000FF |
| br | Brun / Brown | #8B4513 |
| ge | Gul / Yellow | #FFD700 |
| gn | Grön / Green | #008000 |
| gr | Grå / Grey | #808080 |
| li | Lila / Lilac | #C8A2C8 |
| pi | Rosa / Pink | #FFC0CB |
| ro | Röd / Red | #FF0000 |
| sw | Svart / Black | #000000 |
| ws | Vit / White | #FFFFFF |

**Kabelnotation:** `1.0 gn/ro` = 1.0 mm² grön kabel med röd rand

---

## Diagramöversikt

### Tidiga modeller (Chapter 10)
- **Fig 10.34** – Huvudschema (spår 1–72) – alla kretsar
- **Fig 10.35** – Tillägg strålkastartvätt

### Chapter 13 Supplement – Motorspecifika
- **Fig 13.77** – 4-cylindermodeller 1981+ (spår 1–57)
- **Fig 13.78** – 6-cylindermodeller 1983–1985
- **Fig 13.79** – 6-cylindermodeller 1986–1987

### Chapter 13 Supplement – Generiska (ALLA modeller)
- **Fig 13.80** – Strålkastartvätt (1980+)
- **Fig 13.81** – Dimljus fram/bak (1981–1985)
- **Fig 13.82** – Dimljus fram/bak (1986+)
- **Fig 13.83** – Dubbelkrets broms + handbromsvarning (1980+)
- **Fig 13.84** – Instrumentbelysning med varvräknare (1985+)
- **Fig 13.85** – Instrumentbelysning med klocka/färdskrivare (1985+)
- **Fig 13.86** – Släpvagnskoppling (1983–1985)

---

## Review-noteringar

### Verifierat mot originalbilder ✓
- Fig 13.80: Kabelfärger vid fuse bar nu korrekt (gn, gn/sw, gn/ge, gn/ro etc.)
- Fig 13.80: V11 pumpkabel 2.5ro (Fig 13.80) vs 4.0ro (Fig 10.35) – skillnad mellan versioner
- Fig 10.35: Tydligare bild, bekräftar J39 terminaler S/31/P och 4.0mm² pump
- Fig 13.81/82: J5 relä-terminaler verifierade (4/86, 2/30, 6/85, 8/87)
- Fig 13.83: Kabelfärger verifierade (br/ro, ro/sw, bl/br, ro/ge)

### Kända luckor (null-värden)
- Vissa kablar på Fig 13.80 track 10-11 (C17, D17, G10) – ej avläsbara färger
- Fig 10.34: Många kablar i mitten av schemat svåra att avläsa pga bildkvalitet
- Säkringsvärden (Ampere) saknas för S1-S15 på tidiga modeller (ej angivna i manual)
- Fig 13.86 släpvagnsschemat: Svårt att avläsa alla kabelfärger i mittensektionen

### Korrigering v0.1
- **Batterikabel A->B**: Dimension 16.0mm² togs från exempeldiagrammet Fig 10.33 (sida 153), men det är oklart om detta avser huvudbatterikabeln eller en annan kabel i härvan. Den tunga batterikabeln (klämmkabel) säljs separat och dess dimension anges troligen inte i strömflödesschemat. Markerat som "heavy gauge sw, ej dimensionerad".
