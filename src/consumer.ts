import mqttClient from './mqttClient'
import { dequeueMessage, acknowledgeMessage } from './messageQueue'
import { ObjectId } from 'mongodb'

const consumeMessages = async (topic: string, consumerId: number) => {
  while (true) {
    const message = await dequeueMessage(topic)
    if (message) {
      console.log(`Consumer ${consumerId} processing message: ${message.payload}`)

      // Simuler le traitement du message
      setTimeout(async () => {
        console.log(`Consumer ${consumerId} processed message: ${message.payload}`)
        await acknowledgeMessage(new ObjectId(message._id))
      }, 5000) // Temps de traitement simulé
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Attendre avant de vérifier de nouveau
    }
  }
}

// Exportation de la fonction pour être utilisée dans le point d'entrée principal
export { consumeMessages }
