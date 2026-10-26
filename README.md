# DealerMeter – website

Landingspagina om de markt voor DealerMeter te testen. Bezoekers kunnen een demo aanvragen.
Gewone HTML, CSS en JavaScript, zonder build; geschikt voor GitHub Pages.

| Bestand | Inhoud |
|---|---|
| `index.html` | De pagina |
| `handleiding.html` | Handleiding van de app voor gebruikers en beheerders |
| `privacy.html` | Privacyverklaring (adres en KvK-nummer toevoegen zodra bekend) |
| `style.css` | Huisstijl; alle kleuren als variabelen bovenaan. Na een wijziging het versienummer in `style.css?v=…` in alle `.html`-bestanden ophogen, anders tonen browsers de oude opmaak |
| `app.js` | Demo-formulier: controle en opslaan in Supabase |
| `config.js` | Supabase-URL en publishable key voor het formulier |
| `fonts/` | Inter en JetBrains Mono, op de site zelf (geen Google Fonts). Licentie: SIL OFL |
| `supabase/demo_aanvragen.sql` | Tabel voor de aanvragen (alleen toevoegen, niet lezen) |

De knoppen **Inloggen** linken naar `https://dealermeter-app.netlify.app/login`. Verandert het
adres van de app (bijvoorbeeld een eigen domein), zoek en vervang dat adres dan in alle `.html`-bestanden.

## Live zetten
1. Maak een nieuw, gratis Supabase-project (regio Frankfurt) en voer `supabase/demo_aanvragen.sql` uit.
2. Vul in `config.js` de Project URL en de publishable key in.
3. Vul in `privacy.html` adres en KvK-nummer aan zodra die er zijn.
4. GitHub → repository → Settings → Pages → Source: *Deploy from a branch*, branch `main`, map `/ (root)`.

Aanvragen bekijk je in Supabase onder **Table Editor → demo_aanvragen**.

## Lokaal bekijken
```bash
python3 -m http.server 8000
```
en open http://localhost:8000.
