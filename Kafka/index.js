const Kafka = require('node-rdkafka');

class KafkaProducer {
  constructor() {
    this.producer = new Kafka.Producer({
      'metadata.broker.list': 'localhost:9092',
    });
  }
}

class KafkaConsumer {
  constructor() {
    this.consumer = new Kafka.KafkaConsumer({
      'metadata.broker.list': 'localhost:9092',
      'group.id': 'elastic-kafka',
    });
  }
}
module.exports = { KafkaConsumer, KafkaProducer };
