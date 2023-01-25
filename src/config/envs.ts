import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

export function loadEnvs() {
  const path = process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development';

  const currentEnvs = dotenv.config({ path });
  dotenvExpand.expand(currentEnvs);
}
