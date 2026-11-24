# ProbFixora Review Cards

NFC card / QR standee se Google reviews lene ka system.

## Files
- `index.html`: customer page (card tap ya QR scan karne pe khulta hai)
- `admin.html`: control panel. Business details daalo, customer link + PVC card + standee design download karo
- `presets.js`: har business type (Restaurant, Cafe, Salon, Clinic, Gym, Shop, Hotel, Other) ke sawaal

## Setup (ek baar)
1. Is repo ko GitHub Pages / Cloudflare Pages / Netlify pe host karo.
2. `admin.html` kholo → Settings mein website ka link aur apna contact daalo.
3. `index.html` mein `BRAND.contact` mein apna phone/website daalo (customer page ke neeche dikhega).

## Naya client
1. `admin.html` → naam, type, area, shehar, Google review link.
2. Customer link copy karo → "NFC Tools" app se NFC card mein likho.
3. Card (front + back) aur standee PNG download karke printer ko do.
4. Card ko apne phone se tap karke test karo.

Customer flow: experience chunein → 1–2 sawaal → review apne aap banta hai aur copy hota hai → Google review page khulta hai → stars + paste + Post.
