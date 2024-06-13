import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017'

const dbName = 'mqtt'

let db: MongoClient

export const connectToMongo = async () => {
  if (!db) {
    db = new MongoClient(url)
    await db.connect()
  }
  return db.db(dbName)
}
