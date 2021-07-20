const Koa = require('koa');
const router = require('koa-router')();
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(views('views', {extension: 'html'}));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

router
  .get('/', async (ctx) => {	
    // ctx.body = '首页';
    ctx.render('index');
})
  .get('/news', async (ctx) => {
    ctx.body = "新闻";
})
  .post('/post', async (ctx) => {
    ctx.body = ctx.request.body;
  })

app.listen(3000, () => {
  console.log('Server is running at 127.0.0.1:3000');
})