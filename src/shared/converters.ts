import { readFileSync } from 'fs';

export const imgToBase64 = (filePath: string) => {
  return readFileSync(filePath, { encoding: 'base64' });
};
