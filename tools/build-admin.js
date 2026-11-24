/*
  Admin panel ko password se lock karta hai.

  admin.source.html (sirf aapke computer pe, GitHub pe nahi jaata)
    -> encrypt (AES-256-GCM, key = PBKDF2-SHA256 of password)
    -> admin.html (GitHub pe jaata hai; bina password ke kuch nahi dikhta)

  Chalane ka tareeka (nfc-review folder mein):
    node tools/build-admin.js
  Password change karna ho to bas dobara chalao.
*/
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const readline = require("readline");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "admin.source.html");
const OUT = path.join(ROOT, "admin.html");
const ITER = 310000;

function askHidden(question) {
  return new Promise(resolve => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = s => { if (rl.muted && !/[\r\n]/.test(s)) rl.output.write("*"); else rl.output.write(s); };
    rl.question(question, answer => { rl.close(); process.stdout.write("\n"); resolve(answer); });
    rl.muted = true;
  });
}

async function getPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  const a = await askHidden("Naya admin password: ");
  if (a.length < 8) { console.error("Password kam se kam 8 characters ka rakho."); process.exit(1); }
  const b = await askHidden("Password dobara: ");
  if (a !== b) { console.error("Dono password match nahi hue. Dobara chalao."); process.exit(1); }
  return a;
}

(async () => {
  if (!fs.existsSync(SRC)) { console.error("admin.source.html nahi mila: " + SRC); process.exit(1); }
  const password = await getPassword();
  const html = fs.readFileSync(SRC, "utf8");

  const salt = crypto.randomBytes(16), iv = crypto.randomBytes(12);
  const key = crypto.pbkdf2Sync(password, salt, ITER, 32, "sha256");
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const data = Buffer.concat([cipher.update(html, "utf8"), cipher.final(), cipher.getAuthTag()]);
  const payload = { v: 1, iter: ITER, salt: salt.toString("base64"), iv: iv.toString("base64"), data: data.toString("base64") };

  const shell = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Sign in · ProbFixora</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;600;800&display=swap" rel="stylesheet">
<style>
:root{--bg:#eef0ee;--panel:#fff;--ink:#232323;--muted:#6c6f6c;--line:#dfe2df;--field:#f7f8f7;--brand:#1f4d3a;--brand-ink:#fff;--bad:#b3261e}
@media (prefers-color-scheme:dark){:root{--bg:#161816;--panel:#1f221f;--ink:#ecefec;--muted:#9ea39e;--line:#333833;--field:#262a26;--brand:#7fc4a0;--brand-ink:#10241a;--bad:#f2a49b}}
*{box-sizing:border-box}html,body{margin:0;height:100%}
body{background:var(--bg);color:var(--ink);font:15px/1.5 "Schibsted Grotesk",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;display:grid;place-items:center;padding:16px}
form{width:100%;max-width:360px;background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:28px 24px}
h1{font-size:20px;margin:0;font-weight:800;letter-spacing:-.01em}
p{color:var(--muted);margin:4px 0 20px;font-size:14px}
label{display:block;font-weight:600;font-size:13.5px;margin-bottom:6px}
input{width:100%;font:inherit;color:inherit;border:1px solid var(--line);background:var(--field);border-radius:10px;padding:12px}
input:focus-visible,button:focus-visible{outline:3px solid var(--brand);outline-offset:2px}
button{width:100%;margin-top:14px;border:0;border-radius:10px;padding:13px;font:inherit;font-weight:600;background:var(--brand);color:var(--brand-ink);cursor:pointer}
button:disabled{opacity:.6}
.err{color:var(--bad);font-size:13.5px;margin:10px 0 0;min-height:1.2em}
</style>
</head>
<body>
<form id="f" autocomplete="off">
  <h1>ProbFixora Review Cards</h1>
  <p>Enter the admin password to continue.</p>
  <label for="pw">Password</label>
  <input id="pw" type="password" autocomplete="current-password" required autofocus>
  <button id="b" type="submit">Unlock</button>
  <p class="err" id="e" role="alert"></p>
</form>
<script>
const P = ${JSON.stringify(payload)};
const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
document.getElementById("f").addEventListener("submit", async ev => {
  ev.preventDefault();
  const btn = document.getElementById("b"), err = document.getElementById("e");
  btn.disabled = true; btn.textContent = "Checking…"; err.textContent = "";
  try {
    const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(document.getElementById("pw").value), "PBKDF2", false, ["deriveKey"]);
    const key = await crypto.subtle.deriveKey({ name:"PBKDF2", salt:b64(P.salt), iterations:P.iter, hash:"SHA-256" }, base, { name:"AES-GCM", length:256 }, false, ["decrypt"]);
    const plain = await crypto.subtle.decrypt({ name:"AES-GCM", iv:b64(P.iv) }, key, b64(P.data));
    const html = new TextDecoder().decode(plain);
    document.open(); document.write(html); document.close();
  } catch (x) {
    btn.disabled = false; btn.textContent = "Unlock";
    err.textContent = window.crypto && crypto.subtle ? "That password is wrong. Try again." : "Open this page over https to sign in.";
    document.getElementById("pw").select();
  }
});
</script>
</body>
</html>
`;
  fs.writeFileSync(OUT, shell);
  console.log("admin.html ban gaya (password se locked). Ab GitHub pe push karo.");
})();
