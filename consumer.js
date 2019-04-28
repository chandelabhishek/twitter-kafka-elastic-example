const { Client } = require('@elastic/elasticsearch');
const { KafkaConsumer } = require('./Kafka');

const elasticClient = new Client({
  node: 'https://ga41egyvoj:33b345tb5f@kafka-poc-8739809668.ap-southeast-2.bonsaisearch.net',
});

const pushToElasticCloud = data => {
  elasticClient.index(
    {
      index: 'twitter',
      type: 'tweets',
      body: {
        ...data,
      },
    },
    (err, resp) => {
      console.log('id ===>>>', resp.body._id, resp.body.result);
    },
  );
};

// const counter = 0;
// const numMessages = 5;

const { consumer } = new KafkaConsumer();
consumer
  .on('ready', () => {
    console.log('consumer connected ==>>');
    consumer.subscribe(['tweets']);

    // Consume from the tweets topic. This is what determines
    // the mode we are running in. By not specifying a callback (or specifying
    // only a callback) we get messages as soon as they are available.
    consumer.consume();
  })
  .on('data', data => {
    // counter += 1;

    // committing offsets every numMessages
    // if (counter % numMessages === 0) {
    //   console.log('calling commit');
    //   consumer.commit(data);
    // }
    const msgValue = JSON.parse(data.value.toString('utf8'));
    console.log(msgValue.text);
    pushToElasticCloud(msgValue);
  });

consumer.connect();
