import axios from 'axios';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as serve from 'koa-static';
import * as fs from 'mz/fs';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import { App } from '../src/App';
import { AppContext } from '../src/AppContext';
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

const injectBody = (
  index: string,
  title: string,
  body: string,
  initialData: any
) => {
  index = index.replace(/<title>.*?<\/title>/g, `<title>${title}</title>`);
  index = index.replace(
    '<div id="root"></div>',
    `<div id="root">${body}</div>
    <script>window.__INITIAL__DATA__ = ${JSON.stringify(initialData)}</script>`
  );

  return index;
};

router.get('*', async (ctx: Koa.Context, next) => {
  // let react router determine the matching route
  const route = routes.find(route => {
    const match = matchPath(ctx.path, route);
    return match !== undefined && match !== null;
  });

  if (route) {
    // load the data for the route
    const initialData = await route.loadData();

    // render the app
    const app = ReactDOMServer.renderToString(
      <StaticRouter location={ctx.path}>
        <AppContext.Provider value={{ getInitialData: () => initialData }}>
          <App />
        </AppContext.Provider>
      </StaticRouter>
    );

    // inject into build output of CRA
    const index = await fs.readFile('../build/index.html', 'utf8');
    const html = injectBody(index, route.path, app, initialData);
    ctx.body = html;
  } else {
    ctx.status = 404;
    ctx.body = 'NOT FOUND';
  }
});

app.on('error', console.error);

app.use(serve('../build'));
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
