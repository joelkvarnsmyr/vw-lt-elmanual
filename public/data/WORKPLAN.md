# ARBETSPLAN - VW LT Wiring Database

## Fas 1: Review & Gap Analysis ✅
- Jämför JSON mot originalbilder
- Identifiera missade kablar, dimensioner, färger
- Korrigera null-värden där möjligt

## Fas 2: Omstrukturering för AI-navigering ✅
- Skapa flat wire table (CSV-liknande) för snabb sökning
- Normalisera alla komponentnamn
- Skapa cross-reference index

## Fas 3: Mermaid-diagram ✅ (v0.2 2026-03-05)
- ~~Testa Mermaid Chart extension~~
- ~~Skapa systemöversikt~~
- ~~Skapa per-krets-diagram~~
- **v0.2 refactor:** Alla 13 diagram omarbetade med:
  - classDef färgkodning (10 klasser)
  - Subgraphs per funktionsgrupp
  - Wire IDs, mm², färgkoder på alla kanter
  - Specifika jordpunkter (⏚1, ⏚2, ⏚10, etc.)
  - Kopplingsdon (T1, T2, T10, T14, etc.)
  - UNVERIFIED-kommentarer för null-värden
- **3 nya diagram skapade:**
  - `13_dash_lights_rev_counter.mermaid` (Fig 13.84)
  - `14_dash_lights_clock_tacho.mermaid` (Fig 13.85)
  - `15_charging_circuit.mermaid` (Fig 10.34)
- Totalt: 16 diagram, alla renderade OK med mmdc

## Fas 4: Dokumentstruktur ✅ (v0.2 2026-03-05)
- Index/README – uppdaterat med 16 diagram
- 00_INDEX.md – figurmappningstabell tillagd
- WORKPLAN.md – fasstatus uppdaterad
- Separata MD-filer per supplementärt diagram
- Sammanfattningsdokument

## Leverabler:
1. ✅ Korrigerad JSON-databas
2. ✅ Flat wire lookup table (JSON + MD)
3. ✅ Mermaid-diagram (.mermaid filer) – 16 st, v0.2
4. ✅ Strukturerade MD-dokument
5. ✅ README/index

## Kvarvarande arbete (v0.3+):
- Visuell validering av varje SVG mot manual-JPG
- Identifiera ytterligare saknade kablar via JSON cross-check
- Lägga till säkringsvärden (Ampere) när tillgängliga
- Eventuell uppdelning av stora diagram (>30 noder)
