import { MongoClient } from 'mongodb'
import { env } from './env'
import { COLLECTION_NAME_LIST } from './constant'

const [messageCollectionName] = COLLECTION_NAME_LIST

const { DB_URL: dbUrl, DB_NAME: dbName } = env

const client = new MongoClient(dbUrl)

await client.connect()

const dbConnection = client.db(dbName)

export const db = { message: dbConnection.collection(messageCollectionName) }
