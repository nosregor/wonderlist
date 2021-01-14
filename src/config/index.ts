import * as dotenv from 'dotenv';

dotenv.config();

function getStringEnv(
  variable: string,
  defaultValue?: string,
): string {
  const val = process.env[variable];
  if (!val) {
    throw new Error(`Env variable; ${variable} not set`);
  }
  return val;
}

function getNumberEnv(
  variable: string,
  defaultValue?: number,
): number {
  const val = Number(process.env[variable]);
  if (!val && !defaultValue) {
    throw new Error(`Env variable; ${variable} not set`);
  }
  return val;
}

const NAME = 'wonderlist';
const PORT = getNumberEnv('PORT', 3000);
const JWT_SECRET = getStringEnv('JWT_SECRET');
const MONGO_URI = getStringEnv('MONGO_URI');

export { JWT_SECRET, NAME, PORT, MONGO_URI };
