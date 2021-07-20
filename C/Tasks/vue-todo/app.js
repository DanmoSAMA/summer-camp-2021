const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {
  await next();
  if(ctx.status === 404){
      ctx.body = "404 Not Found！"
  }
})

router.get('/', async (ctx) => {
  ctx.body = fs.readFile('./public/index.html', (err, data) => {
    ctx.body = data;
  })
})

app.listen(3000, () => {
  console.log('Server is running at 127.0.0.1:3000');
})