const TwitterClient = require('./Twitter');
const { KafkaProducer } = require('./Kafka');

const publishToKafka = msg => {
  const { producer } = new KafkaProducer();
  producer.connect();

  // Wait for the ready event before proceeding
  producer.on('ready', () => {
    try {
      producer.produce(
        // Topic to send the message to
        'tweets',
        // optionally we can manually specify a partition for the message
        // this defaults to -1 - which will use librdkafka's default partitioner (consistent random for keyed messages, random for unkeyed messages)
        null,
        // Message to send. Must be a buffer
        Buffer.from(JSON.stringify(msg)),
        // for keyed messages, we also specify the key - note that this field is optional
        null,
        // you can send a timestamp here. If your broker version supports it,
        // it will get added. Otherwise, we default to 0
        Date.now(),
        // you can send an opaque token here, which gets passed along
        // to your delivery reports
      );
    } catch (err) {
      console.error('A problem occurred when sending our message');
      console.error(err);
    }
  });
};

const twitterCLient = new TwitterClient();

const stream = twitterCLient.getStreamOf({ track: 'bitcoin', language: 'en' });

stream.on('connect', () => console.log('Connecting to twitter ====>'));

stream.on('connected', () => console.log('Connected ====>'));

stream.on('tweet', resp => publishToKafka(resp));
