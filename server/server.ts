import axios from 'axios';
import * as Koa from 'koa';

const app: Koa = new Koa();

app.use(async (ctx: Koa.Context, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx: Koa.Context) => {
  const result = await axios.get<any>(
    'https://www.srf.ch/play/radio/livepopup/stations'
  );
  ctx.body = JSON.stringify(result.data);
});

app.on('error', console.error);

app.listen(3000);
