# ProbFixora Review Cards

NFC card aur QR standee se Google reviews lene ka system.

## Files
- `index.html`: customer page. Card tap ya QR scan karne pe yahi khulta hai.
- `admin.html`: password se locked admin panel (GitHub pe yahi jaata hai).
- `admin.source.html`: admin ka asli code. **Sirf aapke computer pe rehta hai**, GitHub pe nahi jaata (`.gitignore`).
- `presets.js`: har business type ke sawaal, English aur Hinglish dono mein.
- `tools/build-admin.js`: `admin.source.html` ko password se lock karke `admin.html` banata hai.

## Admin ka password set / change karna
```
node tools/build-admin.js
```
Password do baar poochega. Phir `admin.html` commit karke push karo.
Admin panel mein kuch bhi badla ho (`admin.source.html`), to bhi yahi command dobara chalani hai.

## Naya client
1. `.../admin.html` kholo, password daalo.
2. Naam, type, area, shehar, Google review link, language (English / Hinglish), brand colour.
3. Phone preview mein page check karo.
4. Card link copy karke "NFC Tools" app se NFC card mein likho.
5. PVC card (front + back) aur standee download karke printer ko do.
6. Card ko apne phone se tap karke ek baar test karo.

## Customer ka link
```
https://probfixora.github.io/Google-review-card/?n=<naam>&t=<type>&a=<area>&c=<shehar>&g=<review code>&k=<colour>&l=hi
```
Apna domain lene ke baad (jaise `review.probfixora.com`) GitHub Pages mein custom domain daalo aur admin ke Settings mein website address badal do.
