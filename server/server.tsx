import axios from 'axios';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { DemoComponent } from '../src/DemoComponent';

const app: Koa = new Koa();
const router = new Router();

app.use(async (ctx: Koa.Context, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

router.get('/api/stations', async (ctx: Koa.Context, next) => {
  const result = await axios.get<any>(
    'https://www.srf.ch/play/radio/livepopup/stations'
  );
  ctx.body = JSON.stringify(result.data);
});

router.get('/local', async (ctx: Koa.Context, next) => {
  // TODO: how to get rid of localhost:3000 and just use /api/stations?
  const result = await axios.get<any>('http://localhost:3000/api/stations');
  ctx.body = JSON.stringify(result.data);
});

router.get('/render', async (ctx: Koa.Context, next) => {
  ctx.body = ReactDOMServer.renderToString(<DemoComponent />);
});

app.on('error', console.error);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
