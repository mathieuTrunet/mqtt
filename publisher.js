import { connect } from 'mqtt'
const client = connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
  setInterval(() => {
    client.publish('topic/1', 'Message for topic 1')
    client.publish('topic/2', 'Message for topic 2')
  }, 5000)
})
