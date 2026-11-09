import { createHash } from "node:crypto";
const ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function createShortCode(url, attempt = 0) {
  const hash = createHash("sha256").update(`${url}#${attempt}`).digest();
  let n = hash.readUIntBE(0, 6);
  let code = "";
  for (let i = 0; i < 6; i++) {
    code = ALPHABET[n % ALPHABET.length] + code;
    n = Math.floor(n / ALPHABET.length);
  }
  return code;
}
