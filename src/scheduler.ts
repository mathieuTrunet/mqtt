import cron from 'node-cron'
import { connectToMongo } from './mongodb'
import { ObjectId } from 'mongodb'

const MAX_RETRY_COUNT = 5
const RETRY_INTERVAL = 60000 // 1 minute

const requeueUnacknowledgedMessages = async () => {
  const db = await connectToMongo()
  const collection = db.collection('messages')
  const now = new Date()

  const messages = await collection
    .find({
      acknowledged: false,
      lastAttempt: { $lt: new Date(now.getTime() - RETRY_INTERVAL) },
      retryCount: { $lt: MAX_RETRY_COUNT },
    })
    .toArray()

  for (const message of messages) {
    await collection.updateOne(
      { _id: message._id },
      {
        $set: { lastAttempt: now },
        $inc: { retryCount: 1 },
      }
    )
    console.log(`Message ${message._id} requeued for topic ${message.topic}`)
  }
}

// Planifie la tâche toutes les minutes
cron.schedule('* * * * *', requeueUnacknowledgedMessages)

console.log('Scheduler started to requeue unacknowledged messages.')
