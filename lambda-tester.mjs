import { handler } from './dist/main.mjs';
import corsEvent from './events/hello.json' with { type: 'json' };

const corsResult = await handler(corsEvent);
console.log(corsResult);
