export const EncryptData = (data) => {
  const encryptKey = process.env.ENCRYPTION_KEY + data;
  return Buffer.from(encryptKey).toString("base64");
};

export const DecryptEncryptionData = (encryptedData) => {
  const secretKey = Buffer.from(encryptedData, "base64").toString();
  return secretKey.replace(process.env.ENCRYPTION_KEY, "");
};