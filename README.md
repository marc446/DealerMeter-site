# DealerMeter – website

Landingspagina om de markt voor DealerMeter te testen. Bezoekers kunnen een demo aanvragen.
Gewone HTML, CSS en JavaScript, zonder build; geschikt voor GitHub Pages.

| Bestand | Inhoud |
|---|---|
| `index.html` | De pagina |
| `privacy.html` | Privacyverklaring (gele velden nog invullen) |
| `style.css` | Huisstijl; alle kleuren als variabelen bovenaan |
| `app.js` | Demo-formulier: controle en opslaan in Supabase |
| `config.js` | Supabase-URL en publishable key voor het formulier |
| `supabase/demo_aanvragen.sql` | Tabel voor de aanvragen (alleen toevoegen, niet lezen) |

## Live zetten
1. Maak een nieuw, gratis Supabase-project (regio Frankfurt) en voer `supabase/demo_aanvragen.sql` uit.
2. Vul in `config.js` de Project URL en de publishable key in.
3. Vul in `privacy.html` de gele velden in.
4. GitHub → repository → Settings → Pages → Source: *Deploy from a branch*, branch `main`, map `/ (root)`.

Aanvragen bekijk je in Supabase onder **Table Editor → demo_aanvragen**.

## Lokaal bekijken
```bash
python3 -m http.server 8000
```
en open http://localhost:8000.
