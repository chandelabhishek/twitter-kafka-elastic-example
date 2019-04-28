const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: '', // add url of your elastic cluster
});

module.exports = client;
