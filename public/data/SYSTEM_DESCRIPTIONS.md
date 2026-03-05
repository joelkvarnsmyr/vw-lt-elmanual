# VW LT Elsystem – Funktionsbeskrivningar

## Validerade fakta (verifierat mot originalbilder)

**Batterikabel till startmotor:** OBS: Sida 153 (exempeldiagram Fig 10.33) visar "16.0▪ sw" vid A→B.

---

## Hur 12V+ når elsystemet

```
A (Batteri 12V+)
 ├──[heavy sw (dim. ej angiven)]──→ B (Startmotor terminal 30) — permanent, alltid ström
 └──[tjock kabel]──→ D (Tändningslås terminal 30) — permanent
                      ├── terminal 30 ──[sw/ge]──→ E1 (Ljusomkopplare)
                      │                             ├── 56 → J relä → S1-S4 → L1/L2 strålkastare
                      │                             └── 58 → sido/bakljus + E20→S50 panelbelysning
                      ├── terminal 30 ──→ S5 (säkring backljus, tuta)
                      ├── terminal 30 ──→ S6 (säkring broms, bakljus)
                      ├── terminal 50 ──→ B solenoid (bara vid START, momentant)
                      ├── terminal 15 ──→ S7 (laddning/tändning)
                      ├── terminal 15 ──→ S8 (blinkers/varning)
                      ├── terminal 15 ──→ S9 (instrument/torkare)
                      ├── terminal 15 ──→ S10 (fläkt/bakruta)
                      ├── terminal X  ──→ S11 (torkare/spolare)
                      ├── terminal P  ──→ parkeringsljus
                      └── terminal G  ──→ K2 laddningsvarning (till generator D+)
```

---

## Startmotorn (B) – Detaljerad funktion

Startmotorn har två terminaler:
- **Terminal 30**: Permanent ansluten till batteri+ via heavy sw (dim. ej angiven) kabel. Alltid strömförande.
- **Terminal 50**: Solenoidstyrning. Får ström ENBART när tändningsnyckeln vrids till läge III (START).

**Sekvens vid start:**
1. Nyckel vrids till III → D terminal 50 aktiveras
2. Ström flödar genom solenoidspolen i startmotorn
3. Solenoiden gör två saker samtidigt:
   - Skjuter ut startdrevet (bendix) för att gripa i svänghjulet
   - Sluter huvudkontakten som kopplar batteri+ (terminal 30) till motorlindningen
4. Startmotorn snurrar → motor startar
5. Nyckel släpps → fjäder återställer till läge II, terminal 50 bryts, solenoid öppnar, drev retraherar

**Jordning:** Startmotorn jordar genom motorblocksmonteringen → jordband ⏚2 (motor till kaross) och ⏚3 (växellåda till chassi).

---

## Fläktomkopplare E9 – Trestegs hastighetskontroll

E9 är en **roterande flerlägesomkopplare** monterad på instrumentpanelen.

**Lägen:**
- **0 (AV)**: Öppen krets, ingen ström till V2
- **1 (LÅG)**: Ström genom full serieresistor → reducerad spänning → lågt varvtal
- **2 (MEDIUM)**: Ström genom delvis serieresistor → medelhastighet  
- **3 (HÖG)**: Direkt anslutning, full 12V → max hastighet

**Krets (Fig 10.34, spår 52-53):**
```
D terminal 15 → S10 (säkring)
    → E9 (fläktomkopplare)
        ├── Läge 1: via terminal 33b → [resistor] → V2 motor
        ├── Läge 2: via terminal 33f → [del-resistor] → V2 motor  
        └── Läge 3: direkt → V2 motor
    → V2 (fläktmotor) → br (brun) jord
    → K8 (varningslampa, lyser vid drift)
```

**Kablar från diagrammet:**
- E9 till V2: via T3 (3-polig kontakt) och T5 kontakt, bakom instrumentpanelen
- Kabelfärger: gn (grön) och gn/li (grön/lila) till motor
- V2 jord: br (brun) till ⏚10

**Resistorns placering:** Serieresistorn sitter bakom instrumentpanelen, ofta monterad på fläkthuset för kylning. Den reducerar spänningen till motorn genom att omvandla överskottsenergi till värme.

---

## Torkarsystemet (E22 + J31 + V) – Detaljerad funktion

### E22 Torkaromkopplare
Sitter på **rattkolumnen** (item 2 på sida 139, Fig 10.9) som en spak. Typ: **flerläges rotary/spakbrytare med spolartryckning**.

**Lägen och terminaler:**
```
┌─────────────────────────────────────────────────┐
│ E22 Torkaromkopplare (spak på rattkolumnen)     │
├─────────────┬───────────────────────────────────┤
│ Läge        │ Aktiv terminal → Funktion         │
├─────────────┼───────────────────────────────────┤
│ AV          │ 53b aktiv → V parkerar bladen     │
│ INTERMITTENT│ Via J31 relä → V pulsad drift     │
│ NORMAL (I)  │ 53 → V normal hastighet           │
│ SNABB (II)  │ 53a → V snabb hastighet           │
│ SPOLA       │ 53e → V5 pump + V torkare         │
│ (tryckning) │ J/53c → J39 strålk.tvätt trigger  │
└─────────────┴───────────────────────────────────┘
```

### V Torkarmotor (Fig 10.35/13.80)
**Typ:** 12V permanentmagnet, tvåhastighets med intern parkskontakt
**Deltagnr:** 1955 113 / E59301A1 (synligt på sida 148)

**Terminaler:**
- **53**: Normal hastighet
- **53a**: Snabb hastighet
- **53b**: Parkering/retur (intern parkbrytare)
- **53e**: Spolarkoppling
- **31**: Jord

**Kabelfärger (från Fig 13.80, verifierat):**
| Terminal | Kabel | mm² | Färg |
|----------|-------|-----|------|
| 53 | E22→V | 1.0 | gn/sw (grön/svart) |
| 53a | E22→V | 1.0 | gn/ge (grön/gul) |
| 53b | E22→V | 1.0 | sw/gr (svart/grå) |
| 31 (jord) | V→⏚10 | 1.0 | br (brun) |

**Parkeringsfunktion:** När torkaren stängs av (E22 till AV) slutar inte motorn omedelbart. Terminal 53b-kretsen och den interna parkbrytaren i motorn håller motorn igång tills bladen når parkläget (nedre position). Då bryter parkbrytaren kretsen och motorn stoppar med bladen i rätt position.

### J31 Tork/Spolintermittentrelä
**Typ:** Elektroniskt tidrelä med kapacitor-styrning
**Funktion:** Skapar paus-tork-paus-cykeln vid intermittent läge
**Kontakter (från Fig 13.80):**
- M17 → V torkarmotor
- M18 → Matning in (från S11)
- M19, M21 → E22 torkaromkopplare
- M26 → V5 spolarpump
- M20 → J39 strålkastartvätt

---

## Spolarsystemet (V5, V11)

### V5 Vindrutespolarpump
**Placering:** I vätsketanken (Fig 10.27 komponent 5)
**Aktiveras av:** E22 spolartryckning → J31 terminal M26
**Kabel:** Matning från S11 via J31, jord 0.5mm² br till ⏚9
**Funktion:** Elektrisk centrifugalpump i botten av vätskebehållaren

### V11 Strålkastarspolarpump  
**Placering:** Separat pump, monterad på vätskebehållaren (Fig 10.27 komponent 3)
**Aktiveras av:** J39 relä terminal P – KRÄVER att strålkastarna är PÅ (E1 terminal 56)
**Kabel matning:** 2.5mm² ro (Fig 13.80) eller 4.0mm² ro (Fig 10.35) – notera skillnad!
**Kabel jord:** br via T2 (2-polig kontakt) till ⏚9
**Tryckregleringsventiler:** Mellan pumparna och munstyckena (Fig 10.27 komponent 6)

### Spolarsystem – Hydraulik (Fig 10.27)
```
┌──────────────────────────────────────────────┐
│           Vätskebehållare (1)                │
│  ┌─────┐                      ┌─────┐       │
│  │ V11 │ HL-pump (3)          │ V5  │ VR    │
│  └──┬──┘                      └──┬──┘ pump  │
│     │                            │    (5)    │
└─────┼────────────────────────────┼───────────┘
      │                            │
      ▼                            ▼
  Tryckventiler (6)          VR-munstycken (4)
      │
      ▼
  HL-munstycken (2)
```

---

## Brytartyper i VW LT

Baserat på Fig 10.32 (symbolsida 152):

| Symbol | Typ | Exempel | Trigger |
|--------|-----|---------|---------|
| Enkel manövrerad | Hand on/off | E15 bakruteomk. | Manuell |
| Tryckmanövrerad | Tryckknapps | F bromsljusomk. | Hydraultryck |
| Mekaniskt manövrerad | Microswitch/cam | F2 dörrkontakt, F4 backljus | Mekanisk rörelse |
| Termobrytare | Temperaturstyrd | Automatisk choke | Temperatur |
| Roterande flerläge | Rotary multi-pos | E1 ljus, E9 fläkt, E22 torkare | Manuell rotation |
| Spak/kombination | Column stalk | E2 blinker, E4 dimmer, E22 torkare | Manuell spak |

### Jordtriggade (GND-switchade) komponenter:
Dessa har +12V permanent på ena sidan. Brytaren sitter på JORD-sidan:

| Komponent | Typ | GND-trigger |
|-----------|-----|-------------|
| H Tutaknapp | Tryckknapp i ratt | Sluter till jord via rattstång/lager |
| F2 Dörrkontakt | Microswitch | Sluter till jord vid öppen dörr |
| F1 Oljetrycksvakt | Tryckomkopplare | Sluter till jord vid LÅGT tryck |
| F9 Handbromsomk. | Mekanisk | Sluter till jord vid handbroms I |
| G Bränslegivare | Variabel resistor | Varierar motstånd till jord |
| G2 Tempgivare | NTC-termistor | Varierar motstånd till jord |

### Plus-switchade (12V-sidan) komponenter:
Dessa bryter +12V-sidan:

| Komponent | Typ | Funktion |
|-----------|-----|----------|
| F Bromsljusomk. | Tryckomkopplare | Sluter 12V vid trampning |
| E1 Ljusomkopplare | Rotary | Kopplar 30→56/58 |
| E22 Torkaromk. | Spak/rotary | Kopplar mellan hastigheter |
| D Tändningslås | Rotary med fjädrad start | Distribuerar 30→15/50/X |

---

## Kablar som går till bakdelen av bilen

Alla kablar som passerar från hytten bakåt:

| Kabel | Dimension | Färg | Från | Till |
|-------|-----------|------|------|------|
| Bakljus V | 1.0mm² | (via M4) | E1/58 | M4 bakljus vänster |
| Bakljus H | 1.0mm² | (via M2) | E1/58 | M2 bakljus höger |
| Blinker BV | 1.0mm² | sw/bl (svart/blå) | E2/L | M6 blinker bak V |
| Blinker BH | 1.0mm² | sw/gn (svart/grön) | E2/R | M8 blinker bak H |
| Bromsljus V | 1.0mm² | sw/ro (svart/röd) | F switch | M9 broms V |
| Bromsljus H | 1.0mm² | sw/ro (svart/röd) | F switch | M10 broms H |
| Backljus | 1.0mm² | - | F4 switch | M16 backljus |
| Bakruta+ | tung | - | J9 relä/87 | Z1 bakrutelement |
| Bakruta jord | tung | br | Z1 | ⏚ bakre |
| Nummerplåt | - | - | E1/58 | X nummerplåtsljus |
| Innerbelysn. | 0.5mm² | br/ws | F2 dörr | W innerljus |
| Jord alla bak | 1.0mm² | br (brun) | - | ⏚18/⏚19 bakre tvärbalk |

**Vid släpvagnskoppling (Fig 13.86) tillkommer:**
| Kabel | mm² | Färg | Stift |
|-------|-----|------|-------|
| Blinker V | 1.0 | sw/ws | Pin L |
| Blinker H | 1.0 | sw/ro | Pin R |
| Bakljus V | 1.0 | gr/sw | Pin 58L |
| Bakljus H | 1.0 | sw/gr | Pin 58R |
| Bromsljus | 1.0 | gn/ro | Pin 54 |
| Jord | 1.0 | br | Pin 31 |

---

## Bensinpumpen V14

**Placering:** Monterad i motorutrymmet, nära bränsletanken. Ansluten via T1 (enpolig flatstiftskontakt nära pumpen).

**Krets:**
```
D terminal 15 (tändning PÅ) → S15 (säkring) → C15 kabel 1.5mm² sw/gn → T1 kontakt → V14 pump → br jord
```

**Viktig detalj:** V14 körs ENBART med tändningen PÅ (terminal 15). Den stoppas automatiskt om motorn stängs av – ingen separat avställning.

**Spår:** 71-72 i Fig 10.34 (sida 158)
