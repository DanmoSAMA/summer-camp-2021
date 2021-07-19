const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

router
  .get('/', async (ctx, next) => {	
    ctx.body = "首页";
    console.log(ctx.query);
    console.log(ctx.params);
})
  .get('/news/:aid/:cid', async (ctx, next) => {
    ctx.body = "新闻";
    console.log(ctx.query);
    console.log(ctx.params);
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server is running at 127.0.0.1:3000');
})