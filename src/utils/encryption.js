export async function encryptPassword(password, key) {
  const encoded = new TextEncoder().encode(password);
  const keyBytes = new TextEncoder().encode(key).slice(0, 16); // AES needs 16-byte key

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    cryptoKey,
    encoded
  );
  const encryptedBytes = new Uint8Array(encrypted);
  const combined = new Uint8Array(iv.length + encryptedBytes.length);
  combined.set(iv);
  combined.set(encryptedBytes, iv.length);
  return btoa(String.fromCharCode(...combined));
}
