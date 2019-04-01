import axios from 'axios';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { matchPath } from 'react-router-dom';
import { AppContext } from '../src/AppContext';
import { DemoComponent } from '../src/DemoComponent';
import { routes } from '../src/Routes';

const app: Koa = new Koa();
const router = new Router();

axios.defaults.baseURL = 'http://localhost:3000';

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

router.get('/api/video', async (ctx: Koa.Context, next) => {
  const result = await axios.get<any>(
    'http://il.srf.ch/integrationlayer/2.0/srf/mediaComposition/video/6dfeb34c-43ae-4baf-94da-6069fdf1d507.json'
  );
  ctx.body = result.data;
});

router.get('/render', async (ctx: Koa.Context, next) => {
  ctx.body = ReactDOMServer.renderToString(<DemoComponent />);
});

router.get('*', async (ctx: Koa.Context, next) => {
  // let react router determine the matching route
  const route = routes.find(route => {
    const match = matchPath(ctx.path, route);
    return match !== undefined && match !== null;
  });

  if (route) {
    // load the data for the route
    const data = await route.loadData();

    ctx.body = ReactDOMServer.renderToString(
      <AppContext.Provider value={{ initialData: data }}>
        {React.createElement(route.component)}
      </AppContext.Provider>
    );
  } else {
    ctx.status = 404;
    ctx.body = 'NOT FOUND';
  }
});

app.on('error', console.error);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
