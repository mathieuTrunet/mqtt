import { dequeueMessage, acknowledgeMessage } from './messageQueue'

const SIMULATED_TIME = 500 // 0.5 secondes

const consumeMessages = async (topic: string, consumerId: number) => {
  while (true) {
    const message = await dequeueMessage(topic)
    if (message) {
      console.log(`Consumer ${consumerId} processing message: ${message.payload}`)

      setTimeout(async () => {
        console.log(`Consumer ${consumerId} processed message: ${message.payload}`)
        await acknowledgeMessage(message._id)
      }, SIMULATED_TIME)
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
}

export { consumeMessages }
