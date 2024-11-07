import { HonoAdapter } from '@kiyasov/platform-hono';
import { handle } from 'hono/aws-lambda';
import { bootstrap } from './bootstrap';

const adapter = new HonoAdapter();
const app = await bootstrap(adapter);
await app.init();

export const handler = handle(adapter.getInstance());
