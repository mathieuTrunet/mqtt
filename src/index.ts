import mqttClient from './mqttClient'
import { enqueueMessage } from './messageQueue'
import './scheduler'
import { consumeMessages } from './consumer'

// Exemple de publication sur deux topics différents
mqttClient.subscribe('topic/1')
mqttClient.subscribe('topic/2')

mqttClient.on('message', async (topic, message) => {
  console.log(`Received message on ${topic}: ${message.toString()}`)
  await enqueueMessage(topic, message.toString())
})

// Démarrer les consommateurs
consumeMessages('topic/1', 1) // Un consommateur pour le topic/1
consumeMessages('topic/2', 2) // Premier consommateur pour le topic/2
consumeMessages('topic/2', 3) // Deuxième consommateur pour le topic/2

console.log('Consumers started and listening for messages.')
