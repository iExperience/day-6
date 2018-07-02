import {Day_6Application} from './application';
import {ApplicationConfig} from '@loopback/core';

export {Day_6Application};

export async function main(options?: ApplicationConfig) {
  const app = new Day_6Application(options);
  await app.boot();
  await app.start();
  return app;
}
