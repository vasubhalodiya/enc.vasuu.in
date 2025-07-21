import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_SECRET_KEY;

export const encryptPassword = (plainTextPassword) => {
  return CryptoJS.AES.encrypt(plainTextPassword, secretKey).toString();
};

export const decryptPassword = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
