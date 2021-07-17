const { MongoClient, ObjectId } = require('mongodb')
const dbInfo = require('./db.js')

class Db {
  static getInstance() {
    if (!this.instance) {
      this.instance = new Db()
    }
    return this.instance
  }

  constructor() {
    this.dbClient = ""
    this.connect()
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (!this.dbClient) {
        MongoClient.connect(dbInfo.dbUrl, { useUnifiedTopology: true }, (err, client) => {
          if (err) reject(err)
          this.dbClient = client.db(dbInfo.dbName)
        })
      }
      resolve(this.dbClient)
    })
  }

  find(collection, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        const result = db.collection(collection).find(json)
        result.toArray((err, docs) => {
          if (err) reject(err)
          resolve(docs)
        })
      })
    })
  }

  insert(collection, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collection).insertOne(json, (err, result) => {
          if (err) reject(err)
          resolve(result)
        })
      })
    })
  }


  update(collection, json1, json2) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collection).updateOne(
          json1,
          {
            $set: json2,
          },
          (err, result) => {
            if (err) reject(err)
            resolve(result)
          }
        )
      })
    })
  }

  delete(collection, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collection).deleteOne(json, (err, result) => {
          if (err) reject(err)
          resolve(result)
        })
      })
    })
  }

  getObjectId(id) {
    return new ObjectId(id)
  }
}

module.exports = Db.getInstance()