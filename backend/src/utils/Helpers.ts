import { inspect } from "util";

export const checkEnv = (envVars: string[]): void => {
  const unsetVars: string[] = [];
  for (const envVar of envVars) {
    if (!process.env[envVar]) {
      unsetVars.push(envVar);
    }
  }
  if (unsetVars.length !== 0) {
    throw new Error(`Environment variables unset: ${inspect(unsetVars)}`);
  }
};
