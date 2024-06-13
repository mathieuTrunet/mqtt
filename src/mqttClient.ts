import mqtt from 'mqtt'

const brokerUrl = 'mqtt://test.mosquitto.org'
const client = mqtt.connect(brokerUrl)

client.on('connect', () => {
  console.log('Connected to MQTT Broker')
})

export default client
