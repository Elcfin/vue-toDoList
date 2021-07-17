const Db = require('../mongodb')

const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')
const app = new Koa()

router.post('/addNewItem', async ctx => {
  const postData = ctx.request.body
  const result = await Db.insert('itemsCollection', postData)
  ctx.response.body = result
})

router.post('/deleteItem', async ctx => {
  const postData = ctx.request.body
  const result = await Db.delete('itemsCollection', postData)
  ctx.response.body = result
})

router.post('/updateItem', async ctx => {
  const postData = ctx.request.body
  const result = await Db.update('itemsCollection', postData.findCondition, postData.newContent)
  ctx.response.body = result
})

router.post('/findItem', async ctx => {
  const postData = ctx.request.body
  const result = await Db.find('itemsCollection', postData)
  ctx.response.body = result
})

router.get('/getItems', async ctx => {
  const result = await Db.find('itemsCollection', {})
  ctx.response.body = result
})

app.use(bodyParser())
app.use(cors())

app.use(router.routes())

app.listen(3000, () => {
  console.log('listening on port 3000')
})