import { HonoAdapter } from '@kiyasov/platform-hono';
import { bootstrap } from './bootstrap';

async function boot() {
  const app = await bootstrap(new HonoAdapter());
  app.listen(3000);
}
boot();
