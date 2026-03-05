# Komponentindex VW LT – Alla modeller

> Alfabetisk lista. Varje komponent med alla kopplingar och korsreferenser.  
> Sök på komponent-ID (t.ex. "E22") för att hitta alla relaterade kablar och diagram.

---

## A – Batteri
- **Typ:** Strömkälla, 12V
- **Spår:** 4 (Fig 10.34)
- **Kablar UT:** heavy gauge sw (ej dimensionerad i schema) → B (startmotor), permanent 30 → D (tändningslås)
- **Kablar IN:** Laddning från C (generator)
- **Jordband:** ⏚1 batteri/kaross

## B – Startmotor
- **Typ:** Motor
- **Spår:** 5-8 (Fig 10.34)
- **Kablar IN:** heavy gauge sw (ej dimensionerad i schema) från A (batteri) till terminal 30, D terminal 50 (startsolenoid)

## C – Generator (Alternator)
- **Typ:** Strömkälla
- **Spår:** 2-3 (Fig 10.34)
- **Kablar UT:** B+ till A (batteri), D+ till K2 (laddningsvarning)
- **Jordband:** ⏚2 generator/motor

## C1 – Spänningsregulator
- **Typ:** Regulator
- **Spår:** 3 (Fig 10.34)
- **Kopplad till:** C (generator)

## D – Tändnings-/startomkopplare
- **Typ:** Omkopplare (7 terminaler)
- **Spår:** 15-17 (Fig 10.34)
- **Terminaler:**
  - 30 = Permanent batteri → E1 ljusomkopplare, S5, S6
  - 50 = Start → B startmotor
  - 15 = Tändning → S7, S8, S9, S10
  - X = Tillbehör → S11
  - P = Parkering
  - S = Startläge
  - G = Laddningslampa → C generator

## E1 – Ljusomkopplare
- **Typ:** Omkopplare
- **Spår:** 19-20 (Fig 10.34), 11 (Fig 13.80)
- **Terminaler:**
  - 30 = Matning in (från D terminal 30, kabel sw/ge)
  - 56 = Strålkastare ut → J ljusrelä, J39 strålk.tvätt (möjliggör)
  - 58 = Sido/bakljus + panelbelysning ut → M1-M4, E20/S50, E23 (möjliggör)
- **Förekommer i:** Fig 10.34, 13.80, 13.81, 13.82, 13.84, 13.85

## E2 – Blinkeromkopplare
- **Typ:** Omkopplare (L/R utgångar)
- **Spår:** 41 (Fig 10.34)
- **Terminaler:** L = vänster → M5/M6, R = höger → M7/M8
- **Kabelfärger:** Vänster sw/bl (svart/blå), Höger sw/gn (svart/grön)

## E3 – Varningsblinkeromkopplare
- **Typ:** Omkopplare
- **Spår:** 38-42 (Fig 10.34), 1+12 (Fig 13.84)
- **Kopplad till:** J2 varningsblinkerrelä
- **Kabel in:** C19 0.5mm² ro/sw (röd/svart)

## E4 – Hel/halvljusspak (dimmer/flasher)
- **Typ:** Omkopplare
- **Spår:** 28 (Fig 10.34)
- **Kopplad till:** J ljusrelä

## E9 – Fläktomkopplare
- **Typ:** Omkopplare
- **Spår:** 52-53 (Fig 10.34)
- **Kopplad till:** V2 fläktmotor

## E15 – Bakruteuppvärmningsomkopplare
- **Typ:** Omkopplare
- **Spår:** 48-49 (Fig 10.34)
- **Kopplad till:** J9 bakrutrelä, K10 varningslampa

## E20 – Instrumentbelysningsreglage (dimmer)
- **Typ:** Potentiometer/reglage
- **Spår:** 11 (Fig 13.84), 7 (Fig 13.85)
- **Kopplad till:** S50 reläadaptersäkring → 0.5mm² gr/bl till alla panellampor
- **Förekommer i:** Fig 13.84, 13.85

## E22 – Torkaromkopplare
- **Typ:** Flerlägesomkopplare
- **Spår:** 57-58 (Fig 10.34), 5-9 (Fig 13.80/10.35)
- **Terminaler:** 53b (park/retur), 53 (normal), 53a (snabb), 53e (spolare), J/53c (strålk.tvätt trigger)
- **Kabelfärger:** 53b=sw/gr, 53=gn/sw, 53a=gn/ge
- **Kopplad till:** V torkarmotor, J31 relä, J39 strålk.tvättrelä
- **Förekommer i:** Fig 10.34, 10.35, 13.80

## E23 – Dimljusomkopplare
- **Typ:** Tvåstegsomkopplare
- **Spår:** 5-8 (Fig 13.81), 2-5 (Fig 13.82)
- **Terminaler:** 83a = framdimljus, 83b = bakdimljus
- **Kabelfärger:** 83a → 1.5 ws/ge (vit/gul), 83b → 1.0 gr/ws (grå/vit)
- **Förutsättning:** E1 terminal 58 måste vara aktiv (parkerings-/halvljus PÅ)
- **Förekommer i:** Fig 13.81, 13.82

## F – Bromsljusomkopplare
- **Typ:** Tryckomkopplare
- **Spår:** 34 (Fig 10.34), 2-4 (Fig 13.83)
- **Kabel in:** F20 1.0mm² br/ro (brun/röd) från S6
- **Kablar ut:** Till M9/M10 bromsljus (sw/ro svart/röd)

## F1 – Oljetrycksomkopplare
- **Typ:** Tryckomkopplare
- **Spår:** 64 (Fig 10.34), 8 (Fig 13.83)
- **Kopplad till:** K3 oljetrycksvarningslampa

## F2 – Dörrkontaktomkopplare
- **Typ:** Mekanisk omkopplare
- **Spår:** 2 (Fig 10.34)
- **Kopplad till:** W innerbelysning, kabel 0.5mm² br/ws (brun/vit)

## F4 – Backljusomkopplare
- **Typ:** Mekanisk omkopplare
- **Spår:** 67 (Fig 10.34)
- **Kopplad till:** M16 backljuslampa

## F9 – Handbromsvarningsomkopplare
- **Typ:** Mekanisk omkopplare
- **Spår:** 6 (Fig 13.83)
- **Kabel in:** A2 1.0mm² bl/br (blå/brun)
- **Kopplad till:** K7 dubbelkrets/handbromsvarning

## G – Bränslenivågivare
- **Typ:** Givare
- **Spår:** 66 (Fig 10.34)
- **Kopplad till:** G1 bränslemätare

## G1 – Bränslemätare
- **Typ:** Instrument
- **Spår:** 59 (Fig 10.34)

## G2 – Kylvätsketemperaturgivare
- **Typ:** Givare
- **Spår:** 65 (Fig 10.34)
- **Kopplad till:** G3 temperaturmätare

## G3 – Kylvätsketemperaturmätare
- **Typ:** Instrument
- **Spår:** 60 (Fig 10.34)

## G5 – Varvräknare
- **Typ:** Instrument
- **Spår:** 5 (Fig 13.84)
- **Kabel in:** Via T14/5 kontakt, 0.5mm² gr/bl
- **Förekommer i:** Fig 13.84

## G24 – Färdskrivare (Tachograph)
- **Typ:** Instrument
- **Spår:** 4-6 (Fig 13.85)
- **Ersätter G5 i fordon med färdskrivare**
- **Förekommer i:** Fig 13.85

## H – Tuta tryckknapp
- **Typ:** Tryckknapp (jordkopplad via rattkolumn)
- **Spår:** 70 (Fig 10.34)
- **Kopplad till:** H1 tuta

## H1 – Tuta
- **Typ:** Signalhorn
- **Spår:** 69 (Fig 10.34)

## J – Hel/halvljusrelä (Dip and flasher relay)
- **Typ:** Relä
- **Spår:** 28-31 (Fig 10.34)
- **Terminaler:** 30 (in från E1/56), 56b (halvljus), 56a (helljus)
- **Kopplad till:** S1-S4 säkringar → L1/L2 strålkastare

## J2 – Varningsblinkerrelä
- **Typ:** Elektroniskt relä
- **Spår:** 39-41 (Fig 10.34)
- **Terminaler:** 49 (utgång), 31 (jord)

## J5 – Dimljusrelä
- **Typ:** Relä
- **Spår:** 3-5 (Fig 13.81), 1-3 (Fig 13.82)
- **Terminaler:** 86 (spole-), 85 (spole+), 30 (matning in), 87 (utgång)
- **Alt. notation:** 4/86, 2/30, 6/85, 8/87
- **Kablar:** Spole 0.5mm² sw/ws, Matning 1.5mm² ro, Utgång 1.5mm² gr/ge, Jord 0.5mm² br

## J9 – Bakruteuppvärmningsrelä
- **Typ:** Relä
- **Spår:** 50-51 (Fig 10.34)
- **Terminaler:** 85, 30, 86, 87
- **Kopplad till:** Z1 bakruteelement

## J31 – Torkare/spolarintermittentrelä
- **Typ:** Elektroniskt relä
- **Spår:** 55-57 (Fig 10.34), 3-4 (Fig 10.35/13.80)
- **Kontakter:** M17 (torkarmotor), M18 (matning in), M19/M21 (omkopplare), M26 (spolarpump), M20 (strålk.tvätt)

## J39 – Strålkastartvätt-relä
- **Typ:** Relä
- **Spår:** 12-13 (Fig 10.35/13.80)
- **Terminaler:** 56 (spole från E1), S (matning), 31 (jord), P (utgång till V11)
- **Matning spole:** 2.5mm² ws/sw från E1 terminal 56 (Fig 10.35) / 1.5mm² ws/sw (Fig 13.80)
- **Utgång:** 4.0mm² ro (Fig 10.35) / 2.5mm² ro (Fig 13.80) till V11
- **Funktion:** Aktiveras NÄR helljus/halvljus PÅ OCH spolare aktiveras

## K1–K10 – Varningslampor
- K1 = Helljus (spår 33)
- K2 = Laddning (spår 62)
- K3 = Oljetryck (spår 61)
- K5 = Blinker (spår 63)
- K6 = Varningsblinker (spår 43)
- K7 = Broms/handbroms (Fig 13.83)
- K8 = Fläktvarning (spår 54)
- K10 = Bakruteuppvärmning (spår 49)
- K13 = Bakdimljusvarning (Fig 13.81, gul)
- K17 = Dimljusvarning (Fig 13.82)

## L1/L2 – Strålkastare (dubbelglödtråd)
- L1 = Vänster (spår 29, 31)
- L2 = Höger (spår 30, 32)
- **Terminaler:** 56b (halvljus), 56a (helljus)

## L10 – Instrumentpanelbelysning
- **Spår:** 18-20 (Fig 10.34), 8-11 (Fig 13.84)
- **Kabel:** 0.5mm² gr/bl (grå/blå) genomgående
- **Via:** T10/7 kontakt, S50 säkring

## L20, L22, L23 – Dimljuslampor
- Se E23 och J5 ovan

## L28 – Cigarettändarbelysning
- **Kabel:** 0.5mm² gr/bl
- **Via:** S50 säkring

## L39 – Bakruteomkopplarbelysning  
- **Kabel:** 0.5mm² gr/bl
- **Via:** S50 säkring

## M1–M10 – Utvändiga lampor
- M1 = Sidoljus vänster (spår 26)
- M2 = Bakljus höger (spår 25)
- M3 = Sidoljus höger (spår 24)
- M4 = Bakljus vänster (spår 27)
- M5 = Blinker fram vänster (spår 45), kabel sw/bl
- M6 = Blinker bak vänster (spår 44), kabel sw/bl
- M7 = Blinker fram höger (spår 47), kabel sw/gn
- M8 = Blinker bak höger (spår 46), kabel sw/gn
- M9 = Bromsljus vänster (spår 36), kabel sw/ro
- M10 = Bromsljus höger (spår 35), kabel sw/ro

## M16 – Backljus
- **Spår:** 68 (Fig 10.34)
- **Kopplad via:** F4 backljusomkopplare

## N – Tändspole
- **Spår:** 10-11 (Fig 10.34)
- **Kabel in:** sw (svart) från D terminal 15

## O – Fördelare
- **Spår:** 10-13 (Fig 10.34)

## S11 – Säkring (Torkare/Spolare)
- **Matning:** X-skena
- **Skyddar:** V torkarmotor, V5 spolarpump, V11 strålk.pump, E22 torkaromk.

## S28 – Säkring 8A (Dimljus)
- **Matning:** Via J5 relä
- **Skyddar:** L22, L23, L20 dimljus

## S50 – Säkring på reläadapter (Panelbelysning)
- **Terminal:** 58b
- **Matning:** Via E20 dimmer från E1 terminal 58
- **Skyddar:** L10, L8, L16, L28, L39, R (alla panellampor)
- **Kabel ut:** 0.5mm² gr/bl (grå/blå) till alla

## V – Vindrutetorkarmotor
- **Spår:** 55-56 (Fig 10.34), 1-3 (Fig 13.80/10.35)
- **Terminaler:** 53 (normal), 53b (park/retur), 53a (snabb), 53e (spolare), 31 (jord)
- **Jord:** 1.0mm² br till ⏚10
- **Motor:** 12V, deltagnr 1955 113 / E59301A1

## V2 – Fläktmotor
- **Spår:** 52-53 (Fig 10.34)
- **Via:** E9 fläktomkopplare
- **Jord:** br (brun)

## V5 – Vindrutespolarpump
- **Spår:** 10 (Fig 10.35), 9 (Fig 13.80)
- **Jord:** 0.5mm² br till ⏚9

## V11 – Strålkastarspolarpump
- **Spår:** 13 (Fig 10.35/13.80)
- **Matning:** 4.0mm² ro (Fig 10.35) / 2.5mm² ro (Fig 13.80) från J39 terminal P
- **Jord:** 4.0mm² br (Fig 10.35) / 0.5mm² br (Fig 13.80) via T2 kontakt
- **Not:** Tung kabel pga hög strömförbrukning

## V14 – Elektrisk bränslepump
- **Spår:** 72 (Fig 10.34)
- **Kabel:** 1.5mm² sw/gn (svart/grön)

## W – Innerbelysning
- **Spår:** 1-2 (Fig 10.34)
- **Aktiveras av:** F2 dörrkontakt
- **Kabel:** 0.5mm² br/ws (brun/vit)

## Z1 – Bakruteuppvärmning
- **Spår:** 51 (Fig 10.34)
- **Via:** J9 relä, E15 omkopplare
- **Jord:** br (brun)
