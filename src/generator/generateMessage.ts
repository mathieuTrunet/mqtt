import type { MqttClient } from 'mqtt'
import { TOPIC_NAME_LIST as topicNameList } from '../config/constant'

export const generateMessage = (client: MqttClient) => () =>
  Promise.all(
    topicNameList.map(topic => (Math.random() > 0.9 ? client.publish(topic, crypto.randomUUID()) : null))
  )
