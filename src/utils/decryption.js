export async function decryptPassword(encryptedData, key) {
  const combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
  const iv = combined.slice(0, 16); // extract IV
  const encryptedBytes = combined.slice(16); // extract encrypted password

  const keyBytes = new TextEncoder().encode(key).slice(0, 16); // AES needs 16-byte key
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );

  try {
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv },
      cryptoKey,
      encryptedBytes
    );
    const decoded = new TextDecoder().decode(decrypted);
    return decoded;
  } catch (error) {
    console.error("❌ Decryption failed:", error);
    return null;
  }
}
