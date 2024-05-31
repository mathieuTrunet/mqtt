import { connect } from 'mqtt'
import { db } from './config/db'
import { TOPIC_NAME_LIST as topicNameList } from './config/constant'
import { generateMessage } from './generator/generateMessage'

const client = connect('mqtt://test.mosquitto.org')

client.on('connect', () => topicNameList.forEach(topicName => client.subscribe(topicName)))

client.on(
  'message',
  async (topic, message) => await db.message.insertOne({ topic: topic, message: message.toString() })
)

setInterval(generateMessage(client), 1000)
