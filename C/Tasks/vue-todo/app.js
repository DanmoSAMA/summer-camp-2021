const Koa = require('koa');
const mongoose = require('mongoose');
const router = require('koa-router')();
const Cors = require('koa-cors');
const BodyParser = require('koa-bodyparser');
const app = new Koa();

mongoose.connect("mongodb://127.0.0.1/Todo-list");
mongoose.connection.once("open", function () {
  console.log("Database is connected successfully!");
});

const Schema = mongoose.Schema;
const todoSchema = new Schema({
  id: String,
  title: String,
  done: Boolean
})

const todoModel = mongoose.model("todos", todoSchema);

app.use(Cors());
app.use(BodyParser());

// 最后use路由中间件
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {
  await next();
  if (ctx.status === 404) {
    ctx.body = "404 Not Found！"
  }
})

router
  .get('/get', async ctx => {
    // 从数据库拿数据
 const myTodos = await   todoModel.find({}, async (err, docs) => {
      if (!err) {
        for (let i = docs.length - 1; i >= 0; i--) {
          myTodos.push(docs[i]);
        }
      }
    })
      
    ctx.body = myTodos
  })
  .post('/update', async ctx => {
    // 更新数据库中数据
    todoModel.remove({}, function (err) {
      if (!err) {
        console.log("Delete successfully!");
      }
    });
    if (ctx.request.body.todos) {
      ctx.request.body.todos.forEach(item => {
        todoModel.create({
          id: item.id,
          title: item.title,
          done: item.done
        }, err => {
          if (!err) console.log('Insert successfully!');
        })
      });
    }
    ctx.body = 'Data is updated successfully!'
  })

app.listen(3000, () => {
  console.log('Server is running at 127.0.0.1:3000');
})