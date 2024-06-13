import { connectToMongo } from './mongodb'
import { MongoClient, ObjectId } from 'mongodb'

interface Message {
  _id: ObjectId
  topic: string
  payload: string
  timestamp: Date
  acknowledged: boolean
  retryCount: number
  lastAttempt: Date
}

export const enqueueMessage = async (topic: string, payload: string) => {
  const db = await connectToMongo()
  const collection = db.collection('messages')
  const message: Message = {
    _id: new ObjectId(),
    topic,
    payload,
    timestamp: new Date(),
    acknowledged: false,
    retryCount: 0,
    lastAttempt: new Date(),
  }
  await collection.insertOne(message)
}

export const dequeueMessage = async (topic: string) => {
  const client = new MongoClient('mongodb://localhost:27017')
  await client.connect()
  const session = client.startSession()
  const db = client.db('mqttQueue')

  let message = null
  await session.withTransaction(async () => {
    const collection = db.collection('messages')
    message = await collection.findOneAndUpdate(
      { topic, acknowledged: false },
      { $set: { acknowledged: true, lastAttempt: new Date() } },
      { sort: { timestamp: 1 }, returnDocument: 'after' }
    )
  })

  await session.endSession()
  await client.close()
  return message ? message?.value : null
}

export const acknowledgeMessage = async (id: ObjectId) => {
  const db = await connectToMongo()
  const collection = db.collection('messages')
  await collection.updateOne({ _id: id }, { $set: { acknowledged: true } })
}
