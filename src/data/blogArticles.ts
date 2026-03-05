export interface BlogArticle {
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  date: string;
  tags: string[];
  /** Markdown-ish content using simple HTML */
  body: string;
  bodyEn: string;
}

export const blogArticles: BlogArticle[] = [
  // ─── Article 1: Starter / won't start ───
  {
    slug: 'vw-lt-startar-inte',
    title: 'Varför startar inte min VW LT? Komplett felsökningsguide',
    titleEn: 'Why Won\'t My VW LT Start? Complete Troubleshooting Guide',
    description: 'Steg-för-steg guide för att felsöka startproblem på VW LT 1976–1996. Batteri, startmotor, solenoid, jordpunkter och kablar.',
    descriptionEn: 'Step-by-step guide to diagnosing starting problems on VW LT 1976–1996. Battery, starter motor, solenoid, earth points and wiring.',
    date: '2026-03-05',
    tags: ['startmotor', 'batteri', 'felsökning'],
    body: `<h3>Symtom och orsaker</h3>
<p>Om din VW LT vägrar starta finns det fyra vanliga scenarier, vart och ett med specifika orsaker att kontrollera:</p>

<h4>1. Startmotorn snurrar inte alls</h4>
<p>Det vanligaste problemet. Orsaker att kontrollera i ordning:</p>
<ul>
<li><strong>Batteri urladdat</strong> — kontrollera med voltmeter (ska visa minst 12,4V). Batteriet sitter bakom vänster framsäte i förarhytten</li>
<li><strong>Lösa eller korroderade anslutningar</strong> — kontrollera batteripolerna och jordkabeln till kaross</li>
<li><strong>Startrelä (solenoid) defekt</strong> — lyssna efter klick när du vrider nyckeln. Inget klick = solenoid eller kablage</li>
<li><strong>Slitna kolborstar</strong> — slitagegräns 13,0 mm. Borstarna kan fastna i sina hållare</li>
<li><strong>Smutsig kommutator</strong> — rengör med fint glaspapper (aldrig smärgelduk!)</li>
<li><strong>Defekt ankare eller fältlindningar jordade</strong> — kräver byte av startmotor</li>
</ul>

<h4>2. Startmotorn snurrar mycket långsamt</h4>
<ul>
<li><strong>Urladdat batteri</strong> — mät specifik vikt med hydrometer (fulladdat: 1,280 vid 21°C)</li>
<li><strong>Slitna kolborstar</strong> eller fastnade borstar</li>
<li><strong>Lösa kablar i startmotorkretsen</strong> — kontrollera alla anslutningar från tändningslås → solenoid → startmotor</li>
</ul>

<h4>3. Startmotorn snurrar men motorn vänder inte</h4>
<ul>
<li><strong>Kugghjulständer slitna eller trasiga</strong> — kontrollera startmotorns drev (pinion) och svänghjulet</li>
</ul>

<h4>4. Startmotorn låter ovanligt — skrapar eller smäller</h4>
<ul>
<li><strong>Slitna kugghjulständer</strong> på drev eller svänghjul</li>
<li><strong>Lösa fästbultar</strong> — åtdragningsmoment: 75 Nm</li>
</ul>

<h3>Felsökningssteg</h3>
<ol>
<li><strong>Kontrollera batterispänningen</strong> med multimeter. Under 12,4V = ladda eller byt</li>
<li><strong>Kontrollera batteripolerna</strong> — rengör med stålborste, smörj med vaselin</li>
<li><strong>Kontrollera jordpunkterna</strong> (se artikel om jordpunkter nedan)</li>
<li><strong>Lyssna vid startförsök</strong> — inget ljud = elektriskt fel, klick = solenoid/borstar, knäpp = drev</li>
<li><strong>Testa solenoid direkt</strong> — bypassstarta med kabel direkt från batteri till solenoidens startplint</li>
<li><strong>Kontrollera tändningslåset</strong> — terminal 50 ska ha ström i startläge</li>
</ol>

<h3>Specifikationer att känna till</h3>
<table>
<tr><th>Parameter</th><th>Värde</th></tr>
<tr><td>Startmotortyp</td><td>Bosch, förmonterad (pre-engaged)</td></tr>
<tr><td>Borstars slitagegräns</td><td>13,0 mm</td></tr>
<tr><td>Kommutatorns min. diameter</td><td>33,5 mm</td></tr>
<tr><td>Axiellt spel</td><td>0,1–0,3 mm</td></tr>
<tr><td>Kuggspel (pinion till stopp)</td><td>0,25–0,50 mm</td></tr>
<tr><td>Fästbultars moment</td><td>75 Nm</td></tr>
</table>

<h3>Relaterade kretsar</h3>
<p>I vår interaktiva kretsvy kan du se exakt hur startkretsen ser ut — vilka kablar som går var, med färgkoder och dimensioner. Se kretsarna <strong>"starting"</strong> och <strong>"ignition"</strong>.</p>`,

    bodyEn: `<h3>Symptoms and causes</h3>
<p>If your VW LT refuses to start, there are four common scenarios, each with specific causes to check:</p>

<h4>1. Starter motor won't turn at all</h4>
<p>The most common problem. Check in order:</p>
<ul>
<li><strong>Battery discharged</strong> — check with voltmeter (should read at least 12.4V). Battery is behind the left seat in the cab</li>
<li><strong>Loose or corroded connections</strong> — check battery terminals and earth lead to body</li>
<li><strong>Starter solenoid faulty</strong> — listen for click when turning key. No click = solenoid or wiring</li>
<li><strong>Worn brushes</strong> — wear limit 13.0 mm. Brushes can stick in their guides</li>
<li><strong>Dirty commutator</strong> — clean with fine glass paper (never emery cloth!)</li>
<li><strong>Faulty armature or field coils earthed</strong> — requires starter motor replacement</li>
</ul>

<h4>2. Starter motor turns very slowly</h4>
<ul>
<li><strong>Discharged battery</strong> — measure specific gravity with hydrometer (fully charged: 1.280 at 21°C)</li>
<li><strong>Worn brushes</strong> or sticking brushes</li>
<li><strong>Loose wires in starter circuit</strong> — check all connections from ignition switch → solenoid → starter</li>
</ul>

<h4>3. Starter motor turns but engine doesn't crank</h4>
<ul>
<li><strong>Gear teeth worn or broken</strong> — check starter pinion and flywheel ring gear</li>
</ul>

<h4>4. Starter motor noisy — scraping or banging</h4>
<ul>
<li><strong>Worn gear teeth</strong> on pinion or flywheel</li>
<li><strong>Loose mounting bolts</strong> — torque setting: 75 Nm</li>
</ul>

<h3>Troubleshooting steps</h3>
<ol>
<li><strong>Check battery voltage</strong> with multimeter. Below 12.4V = charge or replace</li>
<li><strong>Check battery terminals</strong> — clean with wire brush, coat with petroleum jelly</li>
<li><strong>Check earth points</strong> (see earth points article below)</li>
<li><strong>Listen when attempting to start</strong> — no sound = electrical fault, click = solenoid/brushes, clunk = pinion</li>
<li><strong>Test solenoid directly</strong> — bypass start with cable from battery to solenoid start terminal</li>
<li><strong>Check ignition switch</strong> — terminal 50 should have power in start position</li>
</ol>

<h3>Key specifications</h3>
<table>
<tr><th>Parameter</th><th>Value</th></tr>
<tr><td>Starter type</td><td>Bosch, pre-engaged</td></tr>
<tr><td>Brush wear limit</td><td>13.0 mm</td></tr>
<tr><td>Commutator min. diameter</td><td>33.5 mm</td></tr>
<tr><td>Endfloat</td><td>0.1–0.3 mm</td></tr>
<tr><td>Pinion clearance</td><td>0.25–0.50 mm</td></tr>
<tr><td>Mounting bolt torque</td><td>75 Nm</td></tr>
</table>

<h3>Related circuits</h3>
<p>In our interactive circuit view you can see exactly how the starter circuit is wired — which cables go where, with colour codes and dimensions. See the <strong>"starting"</strong> and <strong>"ignition"</strong> circuits.</p>`,
  },

  // ─── Article 2: Earth points ───
  {
    slug: 'vw-lt-jordpunkter-elproblem',
    title: 'VW LT jordpunkter — den dolda orsaken till elproblem',
    titleEn: 'VW LT Earth Points — The Hidden Cause of Electrical Problems',
    description: 'Dåliga jordpunkter orsakar flimrande lampor, trög start och konstiga elfenomen. Lär dig var alla jordpunkter sitter på VW LT.',
    descriptionEn: 'Bad earth points cause flickering lights, slow starting and strange electrical symptoms. Learn where all earth points are on the VW LT.',
    date: '2026-03-05',
    tags: ['jordpunkter', 'elsystem', 'underhåll'],
    body: `<h3>Varför är jordpunkter så viktiga?</h3>
<p>Startmotorn, tändsystemet och alla elektriska tillbehör är helt beroende av rena, säkra jordanslutningar. En enda dålig jordpunkt kan orsaka en lång rad mystiska symtom som ofta feldiagnostiseras som komponentfel.</p>

<h3>Symtom på dåliga jordpunkter</h3>
<ul>
<li><strong>Lampor som flimrar</strong> — speciellt vid körning på ojämn väg</li>
<li><strong>Blinkers som blinkar snabbare eller långsammare</strong> än normalt</li>
<li><strong>Startmotor som snurrar trögt</strong> — trots fulladdat batteri</li>
<li><strong>Instrument som visar fel</strong> — bränslemätare, temperaturmätare</li>
<li><strong>Lampor som tänds i fel kombination</strong> — t.ex. bromsljus påverkar bakljus</li>
<li><strong>Sporadiska elfel</strong> som kommer och går, särskilt vid vibration</li>
</ul>

<h3>Jordpunkternas placering på VW LT</h3>
<p>Det finns fem huvudsakliga jordpunkter att kontrollera:</p>
<ol>
<li><strong>Växellådsförlängningen till sidbalken</strong> — kritisk för startmotor och motor</li>
<li><strong>Batteriets minuskabel till kaross</strong> — den mest grundläggande jordpunkten</li>
<li><strong>Rattstångens flexkoppling</strong> — jordar instrumentpanelen</li>
<li><strong>Bakre vänster chassibalk</strong> — för bakre belysning</li>
<li><strong>Bakre chassitvärbalk</strong> — för bakre belysning och tillbehör</li>
</ol>

<h3>Så kontrollerar och åtgärdar du jordpunkter</h3>
<ol>
<li><strong>Lokalisera jordpunkten</strong> — följ den bruna (br) eller svarta (sw) kabeln till fästpunkten</li>
<li><strong>Lossa bulten eller muttern</strong> som håller kabelskon</li>
<li><strong>Rengör kontaktytan</strong> — skrapa bort all rost, färg och smuts med stålborste eller sandpapper. Blankmetall ska synas</li>
<li><strong>Rengör kabelskon</strong> — samma behandling. Kontrollera att kabeln inte är grönpatinerad</li>
<li><strong>Smörj med kontaktfett</strong> (ej vaselin på jordpunkter — använd elektronikspray eller kopparfett)</li>
<li><strong>Dra åt ordentligt</strong> — men överdriv inte, särskilt på plåtanslutningar</li>
<li><strong>Testa</strong> — mät spänningsfall över jordpunkten med multimeter (max 0,2V vid belastning)</li>
</ol>

<h3>Förebyggande underhåll</h3>
<p>Kontrollera alla jordpunkter minst en gång per år, eller vid minsta tecken på elproblem. I norra Europa där saltning är vanligt, kontrollera oftare — korrosion är den vanligaste orsaken till dåliga jordpunkter.</p>

<h3>Se jordpunkterna i vår app</h3>
<p>Använd fliken <strong>"Jordpunkter"</strong> i vår interaktiva elmanual för att se alla dokumenterade jordpunkter med placeringar.</p>`,

    bodyEn: `<h3>Why are earth points so important?</h3>
<p>The starter motor, ignition system and all electrical accessories depend entirely on clean, secure earth connections. A single bad earth point can cause a long list of mysterious symptoms that are often misdiagnosed as component failures.</p>

<h3>Symptoms of bad earth points</h3>
<ul>
<li><strong>Flickering lights</strong> — especially when driving on rough roads</li>
<li><strong>Indicators flashing faster or slower</strong> than normal</li>
<li><strong>Starter motor turning sluggishly</strong> — despite a fully charged battery</li>
<li><strong>Instruments reading incorrectly</strong> — fuel gauge, temperature gauge</li>
<li><strong>Lights coming on in wrong combinations</strong> — e.g. brake lights affecting tail lights</li>
<li><strong>Intermittent electrical faults</strong> that come and go, especially with vibration</li>
</ul>

<h3>Earth point locations on the VW LT</h3>
<p>There are five main earth points to check:</p>
<ol>
<li><strong>Gearbox extension to side member</strong> — critical for starter motor and engine</li>
<li><strong>Battery negative lead to body</strong> — the most fundamental earth point</li>
<li><strong>Steering column flexible coupling</strong> — earths the instrument panel</li>
<li><strong>Rear left-hand chassis side member</strong> — for rear lighting</li>
<li><strong>Rear chassis crossmember</strong> — for rear lighting and accessories</li>
</ol>

<h3>How to check and fix earth points</h3>
<ol>
<li><strong>Locate the earth point</strong> — follow the brown (br) or black (sw) cable to its mounting point</li>
<li><strong>Remove the bolt or nut</strong> holding the cable lug</li>
<li><strong>Clean the contact surface</strong> — scrape off all rust, paint and dirt with a wire brush or sandpaper. Bare metal must be visible</li>
<li><strong>Clean the cable lug</strong> — same treatment. Check the cable isn't green with patina</li>
<li><strong>Apply contact grease</strong> (not petroleum jelly on earth points — use electronics spray or copper grease)</li>
<li><strong>Tighten properly</strong> — but don't overdo it, especially on sheet metal connections</li>
<li><strong>Test</strong> — measure voltage drop across the earth point with a multimeter (max 0.2V under load)</li>
</ol>

<h3>Preventive maintenance</h3>
<p>Check all earth points at least once a year, or at the first sign of electrical problems. In northern Europe where road salt is common, check more often — corrosion is the most common cause of bad earth points.</p>

<h3>See earth points in our app</h3>
<p>Use the <strong>"Earth Points"</strong> tab in our interactive electrical manual to see all documented earth points with locations.</p>`,
  },

  // ─── Article 3: Fuse box / PDM replacement ───
  {
    slug: 'vw-lt-elcentral-sakringar',
    title: 'VW LT elcentral och säkringar — komplett guide (+ modern ersättning)',
    titleEn: 'VW LT Fuse Box and Fuses — Complete Guide (+ Modern Replacement)',
    description: 'Komplett guide till VW LT säkringslådan: placering, säkringstabeller, reläer, vanliga problem och modernt PDM25-alternativ när elcentralen gått sönder.',
    descriptionEn: 'Complete guide to the VW LT fuse box: location, fuse tables, relays, common problems and modern PDM25 alternative when the fuse box has failed.',
    date: '2026-03-05',
    tags: ['säkringar', 'elcentral', 'PDM25', 'uppgradering'],
    body: `<h3>Elcentralens placering</h3>
<p>Elcentralen (säkringslåda med reläplatta) sitter under instrumentpanelens vänstra sida. Öppna luckan genom att vrida den spårade bulten 90° medsols.</p>

<h3>Komplett säkringstabell</h3>
<table>
<tr><th>Nr</th><th>Krets</th><th>Ampere</th></tr>
<tr><td>S1</td><td>Halvljus (vänster)</td><td>8A</td></tr>
<tr><td>S2</td><td>Halvljus (höger)</td><td>8A</td></tr>
<tr><td>S3</td><td>Helljus (vänster)</td><td>8A</td></tr>
<tr><td>S4</td><td>Helljus (höger)</td><td>8A</td></tr>
<tr><td>S5</td><td>Eluppvärmd bakruta (element)</td><td>16A</td></tr>
<tr><td>S6</td><td>Bromsljus, varningsblinkers</td><td>8A</td></tr>
<tr><td>S7</td><td>Innerbelysning</td><td>8A</td></tr>
<tr><td>S8</td><td>Blinkers och indikatorer</td><td>8A</td></tr>
<tr><td>S9</td><td>Signalhorn, bränsleavstängning, backljus</td><td>8A</td></tr>
<tr><td>S10</td><td>Kupéfläkt</td><td>8A</td></tr>
<tr><td>S11</td><td>Vindrutetorkare/-spolare, bakruteknapp</td><td>8A</td></tr>
<tr><td>S12</td><td>Reserv</td><td>—</td></tr>
<tr><td>S13</td><td>Parkeringsljus, bakljus (höger)</td><td>8A</td></tr>
<tr><td>S14</td><td>Parkeringsljus, bakljus (vänster), skyltnr, dimljus bak</td><td>8A</td></tr>
<tr><td>S15</td><td>Bränslepump</td><td>8A</td></tr>
</table>

<h3>Reläer</h3>
<p>Tre reläer är monterade på säkringsblocket:</p>
<ul>
<li><strong>Helljusrelä</strong> — hanterar växling helljus/halvljus och ljustuta</li>
<li><strong>Bakruterelä</strong> — styr eluppvärmd bakruta</li>
<li><strong>Blinker-/varningsrelä</strong> — styr blinkers och varningsblinkers</li>
</ul>

<h3>Vanliga problem med elcentralen</h3>

<h4>Extraljus — den vanligaste orsaken till förstörd elcentral</h4>
<p><strong>Det här är det allvarligaste problemet med VW LT:s elsystem.</strong> Många ägare monterar starka extraljus (rallye, LED-ramper etc.) och kopplar dem genom den befintliga elcentralen. Problemet är att den 40+ år gamla elcentralen med sina tunna kablar och 8A glasrörssäkringar inte alls är dimensionerad för den strömmen.</p>
<p>Resultatet: <strong>elcentralen brinner, smälter, och tar med sig tändning, kabelhöljen och terminaler.</strong> Vi har sett det upprepade gånger — och det hände med vår egen bil Elton. Det är en av de vanligaste orsakerna till att VW LT-ägare står med en helt förstörd elcentral.</p>
<p><em>Lärdomen: Extraljus ska ALLTID kopplas med eget relä och egen säkring direkt från batteriet — aldrig genom elcentralen!</em></p>

<h4>Säkringar som går hela tiden</h4>
<p>Byt aldrig till en starkare säkring! Vanliga orsaker:</p>
<ul>
<li>Skadat kabelisolering som ger kortslutning</li>
<li>Vatten i kontaktdon (vanligt vid läckande vindruta)</li>
<li>Felaktig lampa med för hög wattage</li>
<li>Extraljus kopplade genom elcentralen (se ovan!)</li>
</ul>

<h4>Korrosion i säkringshållarna</h4>
<p>Fukt tränger in och oxiderar kontaktytorna. Symtom: sporadiska strömavbrott. Rengör med kontaktspray och fin sandpapper.</p>

<h4>Reläfel</h4>
<p>Om en funktion slutar fungera men säkringen är hel, testa reläet. Dra ut det och tryck in ett nytt — ingen reparation är möjlig.</p>

<h3>När elcentralen gått sönder — tre alternativ</h3>

<h4>Alternativ 1: Universal "hotrod"-elcentral (snabb lösning)</h4>
<p>Finns att köpa som universala relä/säkringslådor med moderna fladsäkringar. Fördelar: billigt, snabbt att installera, standardkomponenter. Nackdel: du måste koppla om allt manuellt och det ger ingen diagnostik.</p>

<h4>Alternativ 2: PDM25 V2 — digital elcentral (bästa långsiktiga lösningen)</h4>
<p>Den gamla säkringslådan med glasrörssäkringar och mekaniska reläer kan vara svår att reparera efter 40+ år. Den bästa långsiktiga lösningen är att ersätta hela elcentralen med en <strong>PDM25 V2</strong> (Power Distribution Module).</p>

<h4>Alternativ 3: Renovera originalet</h4>
<p>Möjligt om skadorna är begränsade — byt terminaler, kablar och säkringshållare. Men om smältan nått printkortet eller reläsocklar är det ofta inte värt besväret.</p>

<h4>Vad är en PDM25?</h4>
<p>En programmerbar relälåda som ersätter alla säkringar och reläer med elektroniska utgångar. Fördelar:</p>
<ul>
<li><strong>25 programmerbara utgångar</strong> — varje utgång har individuellt ställbar säkringsnivå</li>
<li><strong>16 ingångar</strong> — kopplas till befintliga strömbrytare</li>
<li><strong>CAN-bus</strong> — kommunicerar med moderna tillbehör</li>
<li><strong>Automatisk återställning</strong> — elektroniska säkringar återställer sig själva</li>
<li><strong>Diagnostik</strong> — visar strömförbrukning per krets i realtid</li>
<li><strong>Kompakt</strong> — tar minimalt utrymme</li>
</ul>

<h4>Installation i VW LT</h4>
<p>Vi har installerat en PDM25 V2 i vår 1976 LT31 "Elton" (registreringsnr JSN 398) och dokumenterat hela installationen. Huvudmatning: 32 mm² kabel från batteri. Se vår PDM25-dokumentation för fullständiga kopplingsscheman.</p>

<p><em>Tips: Behåll den gamla elcentralen som backup tills du verifierat att PDM25-installationen fungerar korrekt.</em></p>

<h3>Se säkringskretsar interaktivt</h3>
<p>Utforska varje krets i detalj med vår interaktiva elmanual — se exakt vilka kablar varje säkring skyddar.</p>`,

    bodyEn: `<h3>Fuse box location</h3>
<p>The fuse box (relay plate with fuse carrier) is located under the left-hand side of the instrument panel. Open the cover by turning the slotted bolt 90° clockwise.</p>

<h3>Complete fuse table</h3>
<table>
<tr><th>No.</th><th>Circuit</th><th>Amps</th></tr>
<tr><td>S1</td><td>Dipped headlamp (LH)</td><td>8A</td></tr>
<tr><td>S2</td><td>Dipped headlamp (RH)</td><td>8A</td></tr>
<tr><td>S3</td><td>Main beam headlamp (LH)</td><td>8A</td></tr>
<tr><td>S4</td><td>Main beam headlamp (RH)</td><td>8A</td></tr>
<tr><td>S5</td><td>Heated rear window (element)</td><td>16A</td></tr>
<tr><td>S6</td><td>Stop lamps, hazard warning</td><td>8A</td></tr>
<tr><td>S7</td><td>Interior lamps</td><td>8A</td></tr>
<tr><td>S8</td><td>Direction indicators and warning lamps</td><td>8A</td></tr>
<tr><td>S9</td><td>Horn, fuel cut-off valve, reversing lamps</td><td>8A</td></tr>
<tr><td>S10</td><td>Heater blower</td><td>8A</td></tr>
<tr><td>S11</td><td>Wipers, washers, heated rear window (switch)</td><td>8A</td></tr>
<tr><td>S12</td><td>Spare</td><td>—</td></tr>
<tr><td>S13</td><td>Front parking, rear lamp (RH)</td><td>8A</td></tr>
<tr><td>S14</td><td>Front parking, rear lamp (LH), number plate, rear fog</td><td>8A</td></tr>
<tr><td>S15</td><td>Fuel pump</td><td>8A</td></tr>
</table>

<h3>Relays</h3>
<p>Three relays are mounted on the fuse block:</p>
<ul>
<li><strong>Headlamp relay</strong> — handles main/dipped beam switching and headlamp flasher</li>
<li><strong>Heated rear window relay</strong> — controls the rear window heater</li>
<li><strong>Indicator/hazard relay</strong> — controls direction indicators and hazard warning</li>
</ul>

<h3>Common fuse box problems</h3>

<h4>Auxiliary lights — the most common cause of destroyed fuse boxes</h4>
<p><strong>This is the most serious problem with the VW LT electrical system.</strong> Many owners fit powerful auxiliary lights (rally, LED bars etc.) and wire them through the existing fuse box. The problem is that the 40+ year old fuse box with its thin wiring and 8A glass tube fuses is not designed for that current draw at all.</p>
<p>The result: <strong>the fuse box burns, melts, and takes the ignition, cable insulation and terminals with it.</strong> We've seen it happen repeatedly — and it happened to our own van Elton. It's one of the most common reasons VW LT owners end up with a completely destroyed fuse box.</p>
<p><em>The lesson: Auxiliary lights must ALWAYS be wired with their own relay and fuse directly from the battery — never through the fuse box!</em></p>

<h4>Fuses that keep blowing</h4>
<p>Never replace with a higher-rated fuse! Common causes:</p>
<ul>
<li>Damaged cable insulation causing short circuits</li>
<li>Water ingress into connectors (common with leaking windscreen seals)</li>
<li>Incorrect bulb with too high wattage</li>
<li>Auxiliary lights wired through the fuse box (see above!)</li>
</ul>

<h4>Corrosion in fuse holders</h4>
<p>Moisture gets in and oxidises the contact surfaces. Symptoms: intermittent power loss. Clean with contact cleaner and fine sandpaper.</p>

<h4>Relay failure</h4>
<p>If a function stops working but the fuse is intact, test the relay. Pull it out and push in a new one — no repair is possible.</p>

<h3>When the fuse box has failed — three options</h3>

<h4>Option 1: Universal "hotrod" fuse box (quick fix)</h4>
<p>Available as universal relay/fuse boxes with modern blade fuses. Pros: cheap, quick to install, standard parts. Cons: you have to rewire everything manually and there's no diagnostics.</p>

<h4>Option 2: PDM25 V2 — digital power distribution (best long-term solution)</h4>
<p>The old fuse box with glass tube fuses and mechanical relays can be very difficult to repair after 40+ years. The best long-term solution is to replace the entire fuse box with a <strong>PDM25 V2</strong> (Power Distribution Module).</p>

<h4>Option 3: Restore the original</h4>
<p>Possible if damage is limited — replace terminals, wires and fuse holders. But if the melt has reached the PCB or relay sockets, it's often not worth the effort.</p>

<h4>What is a PDM25?</h4>
<p>A programmable relay box that replaces all fuses and relays with electronic outputs. Benefits:</p>
<ul>
<li><strong>25 programmable outputs</strong> — each with individually adjustable fuse level</li>
<li><strong>16 inputs</strong> — connect to existing switches</li>
<li><strong>CAN bus</strong> — communicates with modern accessories</li>
<li><strong>Auto-reset</strong> — electronic fuses reset themselves</li>
<li><strong>Diagnostics</strong> — shows current draw per circuit in real time</li>
<li><strong>Compact</strong> — takes minimal space</li>
</ul>

<h4>Installation in a VW LT</h4>
<p>We have installed a PDM25 V2 in our 1976 LT31 "Elton" (reg JSN 398) and documented the entire installation. Main feed: 32 mm² cable from battery. See our PDM25 documentation for complete wiring diagrams.</p>

<p><em>Tip: Keep the old fuse box as a backup until you've verified the PDM25 installation works correctly.</em></p>

<h3>Explore fuse circuits interactively</h3>
<p>Explore every circuit in detail with our interactive electrical manual — see exactly which wires each fuse protects.</p>`,
  },

  // ─── Article 4: Battery drain ───
  {
    slug: 'vw-lt-batteri-laddar-ur',
    title: 'VW LT batteri laddar ur — 8 vanliga orsaker och åtgärder',
    titleEn: 'VW LT Battery Keeps Going Flat — 8 Common Causes and Fixes',
    description: 'Ditt VW LT-batteri håller inte laddningen? Här är de 8 vanligaste orsakerna, från generatorrem till kortslutning i belysningskretsen.',
    descriptionEn: 'Your VW LT battery won\'t hold charge? Here are the 8 most common causes, from alternator belt to lighting circuit short.',
    date: '2026-03-05',
    tags: ['batteri', 'generator', 'laddning', 'felsökning'],
    body: `<h3>Problemet</h3>
<p>Batteriet håller bara laddningen i några dagar, eller bilen startar inte efter att ha stått en vecka. Det här är ett av de vanligaste elproblemen på äldre VW LT.</p>

<h3>De 8 vanligaste orsakerna</h3>

<h4>1. Batteriet är internt defekt</h4>
<p>Efter 4–6 år börjar blybatterier tappa kapacitet. Testa med hydrometer — specifik vikt ska vara 1,280 vid 21°C i alla celler. Avviker en cell markant = batteriet är dött.</p>

<h4>2. Elektrolytnivån för låg</h4>
<p>Kontrollera varje vecka! Fyll på med destillerat vatten till markeringen (genomskinligt hölje) eller 6 mm ovan plattorna. Om du behöver fylla på ofta: misstänk läckage eller överladdning.</p>

<h4>3. Sulfaterade plattor</h4>
<p>Plattorna täcks av vitgrå kristaller (blysulfat) efter lång tid utan laddning. Kan ibland räddas med långsam laddning (2A i 24–48 timmar), annars byte.</p>

<h4>4. Generatorrerem slirar</h4>
<p>Den vanligaste orsaken till att batteriet inte laddas! Kontrollera remspänningen enligt Kapitel 2. Laddningslampan bör slockna vid ca 1000 rpm.</p>

<h4>5. Generator laddar inte</h4>
<p>Om laddningslampan lyser konstant:</p>
<ul>
<li>Kontrollera remspänningen</li>
<li>Kontrollera generatorns kolborstar — slitagegräns 5,0 mm (nya: 10,0 mm)</li>
<li>Kontrollera kabelanslutningen på generatorns baksida</li>
<li>Mät laddspänningen: ska vara 12,5–14,5V</li>
</ul>

<h4>6. Lösa eller korroderade batteripoler</h4>
<p>Rengör med stålborste, smörj med vaselin. Kontrollera även jordkabeln där den fäster i karossen.</p>

<h4>7. Kortslutning i belysningskretsen</h4>
<p>En dold strömtjuv! Dra ur säkringarna en i taget och mät strömmen med amperemeter. Normal viloström bör vara under 50mA. Vanliga syndare:</p>
<ul>
<li>Innerbelysning som står på (S7)</li>
<li>Skadat kablage som skaver mot plåt</li>
<li>Fuktiga kontaktdon i baklyktorna</li>
</ul>

<h4>8. Plattseparatorer slitna</h4>
<p>Interna kortslutningar i batteriet. Visar sig som snabb självurladdning och ojämn specifik vikt mellan cellerna. Byte krävs.</p>

<h3>Batterispeficiationer</h3>
<table>
<tr><th>Parameter</th><th>Värde</th></tr>
<tr><td>System</td><td>12V negativ jord</td></tr>
<tr><td>Kapacitet (typisk)</td><td>45 Ah</td></tr>
<tr><td>Generatortyp</td><td>Bosch eller Motorola</td></tr>
<tr><td>Generatorström</td><td>25A vid 3000 rpm</td></tr>
<tr><td>Reglerad spänning</td><td>12,5–14,5V</td></tr>
<tr><td>Generatorborstar slitagegräns</td><td>5,0 mm</td></tr>
</table>

<h3>Hydrometertabell</h3>
<table>
<tr><th>Urladdat</th><th>Temperatur</th><th>Fulladdat</th></tr>
<tr><td>1,098</td><td>38°C</td><td>1,268</td></tr>
<tr><td>1,110</td><td>21°C</td><td>1,280</td></tr>
<tr><td>1,122</td><td>4°C</td><td>1,292</td></tr>
<tr><td>1,126</td><td>-1,5°C</td><td>1,296</td></tr>
</table>

<h3>Relaterade kretsar</h3>
<p>Se kretsarna <strong>"charging"</strong> och <strong>"starting"</strong> i vår interaktiva elmanual för att förstå laddningssystemets uppbyggnad.</p>`,

    bodyEn: `<h3>The problem</h3>
<p>The battery only holds charge for a few days, or the van won't start after standing for a week. This is one of the most common electrical problems on older VW LT vans.</p>

<h3>The 8 most common causes</h3>

<h4>1. Battery internally defective</h4>
<p>After 4–6 years lead-acid batteries start losing capacity. Test with hydrometer — specific gravity should be 1.280 at 21°C in all cells. If one cell deviates significantly = battery is dead.</p>

<h4>2. Electrolyte level too low</h4>
<p>Check weekly! Top up with distilled water to the mark (translucent casing) or 6mm above the plates. If you need to top up often: suspect a leak or overcharging.</p>

<h4>3. Sulphated plates</h4>
<p>Plates become coated with grey-white crystals (lead sulphate) after prolonged periods without charging. Can sometimes be saved with slow charging (2A for 24–48 hours), otherwise replace.</p>

<h4>4. Alternator belt slipping</h4>
<p>The most common reason the battery isn't charging! Check belt tension as described in Chapter 2. The charging light should go out at about 1000 rpm.</p>

<h4>5. Alternator not charging</h4>
<p>If the charging light stays on constantly:</p>
<ul>
<li>Check belt tension</li>
<li>Check alternator brushes — wear limit 5.0 mm (new: 10.0 mm)</li>
<li>Check the wiring connector on the back of the alternator</li>
<li>Measure charging voltage: should be 12.5–14.5V</li>
</ul>

<h4>6. Loose or corroded battery terminals</h4>
<p>Clean with wire brush, coat with petroleum jelly. Also check the earth lead where it attaches to the body.</p>

<h4>7. Short circuit in lighting circuit</h4>
<p>A hidden current thief! Remove fuses one at a time and measure current with an ammeter. Normal quiescent current should be under 50mA. Common culprits:</p>
<ul>
<li>Interior light left on (S7)</li>
<li>Damaged wiring rubbing against bodywork</li>
<li>Damp connectors in rear light clusters</li>
</ul>

<h4>8. Worn plate separators</h4>
<p>Internal short circuits in the battery. Shows as rapid self-discharge and uneven specific gravity between cells. Replacement required.</p>

<h3>Battery specifications</h3>
<table>
<tr><th>Parameter</th><th>Value</th></tr>
<tr><td>System</td><td>12V negative earth</td></tr>
<tr><td>Capacity (typical)</td><td>45 Ah</td></tr>
<tr><td>Alternator type</td><td>Bosch or Motorola</td></tr>
<tr><td>Alternator current</td><td>25A at 3000 rpm</td></tr>
<tr><td>Regulated voltage</td><td>12.5–14.5V</td></tr>
<tr><td>Alternator brush wear limit</td><td>5.0 mm</td></tr>
</table>

<h3>Hydrometer table</h3>
<table>
<tr><th>Discharged</th><th>Temperature</th><th>Fully charged</th></tr>
<tr><td>1.098</td><td>38°C</td><td>1.268</td></tr>
<tr><td>1.110</td><td>21°C</td><td>1.280</td></tr>
<tr><td>1.122</td><td>4°C</td><td>1.292</td></tr>
<tr><td>1.126</td><td>-1.5°C</td><td>1.296</td></tr>
</table>

<h3>Related circuits</h3>
<p>See the <strong>"charging"</strong> and <strong>"starting"</strong> circuits in our interactive electrical manual to understand the charging system layout.</p>`,
  },

  // ─── Article 5: Wiper troubleshooting ───
  {
    slug: 'vw-lt-vindrutetorkare-felsökning',
    title: 'VW LT vindrutetorkare fungerar inte — 4 feltyper och åtgärder',
    titleEn: 'VW LT Wipers Not Working — 4 Failure Types and How to Fix Them',
    description: 'Torkarna stannar, går långsamt eller bladen rör sig inte? Här är de fyra feltyperna med orsaker och steg-för-steg lösningar.',
    descriptionEn: 'Wipers stopped, running slowly, or blades not moving? Here are the four failure types with causes and step-by-step solutions.',
    date: '2026-03-05',
    tags: ['vindrutetorkare', 'torkarmotor', 'felsökning'],
    body: `<h3>Fyra sätt torkarna kan strula på</h3>
<p>Torkarfelen på VW LT faller i fyra tydliga kategorier, var och en med olika orsaker:</p>

<h4>1. Torkarmotorn går inte alls</h4>
<ul>
<li><strong>Trasig säkring S11</strong> (8A) — kontrollera och byt. Om den går igen direkt: sök kortslutning</li>
<li><strong>Lösa kablar</strong> — kontrollera anslutningarna vid motorn och strömbrytaren</li>
<li><strong>Slitna kolborstar</strong> i motorn</li>
<li><strong>Defekt ankare</strong> eller fältlindningar</li>
</ul>

<h4>2. Torkarna går väldigt långsamt och drar mycket ström</h4>
<p>Motorn kämpar — något bromsar den mekaniskt:</p>
<ul>
<li><strong>Smutsig eller bränd kommutator</strong> — rengör med fint glaspapper</li>
<li><strong>Böjd eller osmord drivstång</strong> till torkarhuset — smörj alla leder</li>
<li><strong>Torkaraxelns lager kärvar</strong> — kan behöva bytas</li>
<li><strong>Torra ankarlager</strong> — smörj med lämpligt fett</li>
</ul>

<h4>3. Torkarna går långsamt men drar lite ström</h4>
<p>Elektriskt problem i motorn:</p>
<ul>
<li><strong>Slitna kolborstar</strong></li>
<li><strong>Smutsig kommutator</strong></li>
<li><strong>Slitet ankare</strong></li>
</ul>

<h4>4. Motorn snurrar men torkarbladen rör sig inte</h4>
<p>Mekaniskt kopplingsproblem:</p>
<ul>
<li><strong>Slitna kugghjul i torkarhuset</strong></li>
<li><strong>Slitna delar i motorns växellåda</strong></li>
</ul>

<h3>Viktig varning vid demontering</h3>
<p><strong>Parkera alltid torkarmotorn via torkarströmbrytaren — INTE via tändningslåset!</strong> Om du stänger av tändningen mitt i ett svep kan motorn hamna i fel läge, och torkarbladen landar fel vid återmontering.</p>

<h3>Specifikationer</h3>
<ul>
<li>Säkring: S11, 8A</li>
<li>Torkarblad inställning: a=120mm, b=130mm, f=540mm</li>
<li>Vevarm tolerans: 8° (skiljer sig LHD/RHD)</li>
<li>Torkararm mutter: 6 Nm</li>
</ul>

<h3>Se torkarkretsen interaktivt</h3>
<p>Utforska kretsarna <strong>"wiper"</strong> och <strong>"wiper_washer"</strong> i vår interaktiva elmanual.</p>`,

    bodyEn: `<h3>Four ways wipers can fail</h3>
<p>Wiper faults on the VW LT fall into four distinct categories, each with different causes:</p>

<h4>1. Wiper motor doesn't run at all</h4>
<ul>
<li><strong>Blown fuse S11</strong> (8A) — check and replace. If it blows again immediately: look for a short circuit</li>
<li><strong>Loose wires</strong> — check connections at the motor and switch</li>
<li><strong>Worn brushes</strong> in the motor</li>
<li><strong>Faulty armature</strong> or field coils</li>
</ul>

<h4>2. Wipers run very slowly and draw excessive current</h4>
<p>The motor is struggling — something is braking it mechanically:</p>
<ul>
<li><strong>Dirty or burnt commutator</strong> — clean with fine glass paper</li>
<li><strong>Bent or dry linkage drive</strong> to wheelboxes — lubricate all joints</li>
<li><strong>Wheelbox spindle binding</strong> — may need replacement</li>
<li><strong>Dry armature bearings</strong> — lubricate with appropriate grease</li>
</ul>

<h4>3. Wipers run slowly but draw little current</h4>
<p>Electrical problem in the motor:</p>
<ul>
<li><strong>Worn brushes</strong></li>
<li><strong>Dirty commutator</strong></li>
<li><strong>Worn armature</strong></li>
</ul>

<h4>4. Motor runs but wiper blades stay still</h4>
<p>Mechanical linkage problem:</p>
<ul>
<li><strong>Worn wheelbox gear and spindle</strong></li>
<li><strong>Worn parts in motor gearbox</strong></li>
</ul>

<h3>Important warning when removing</h3>
<p><strong>Always park the wiper motor using the wiper switch — NOT the ignition switch!</strong> If you turn off the ignition mid-sweep the motor can end up in the wrong position, and the blades will park incorrectly when refitted.</p>

<h3>Specifications</h3>
<ul>
<li>Fuse: S11, 8A</li>
<li>Wiper blade setting: a=120mm, b=130mm, f=540mm</li>
<li>Crank arm tolerance: 8° (differs LHD/RHD)</li>
<li>Wiper arm nut: 6 Nm</li>
</ul>

<h3>See the wiper circuit interactively</h3>
<p>Explore the <strong>"wiper"</strong> and <strong>"wiper_washer"</strong> circuits in our interactive electrical manual.</p>`,
  },
];
