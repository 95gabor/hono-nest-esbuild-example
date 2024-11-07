import {
  AbstractHttpAdapter,
  NestFactory,
  HttpAdapterHost,
} from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exception.filter';

export async function bootstrap(adapter: AbstractHttpAdapter) {
  const app = await NestFactory.create(AppModule, adapter);
  const adapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));

  return app;
}
