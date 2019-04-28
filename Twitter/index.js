const Twit = require('twit');
const {
  CONSUMER_KEY,
  CONSUMER_SECRET,
  ACCESS_TOKEN,
  ACCESS_TOKEN_KEY,
  TIMEOUT,
} = require('./twitterconfig');

class TwitterClient {
  constructor() {
    this.twitterCLient = new Twit({
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET,
      access_token: ACCESS_TOKEN,
      access_token_secret: ACCESS_TOKEN_KEY,
      timeout_ms: TIMEOUT, // optional HTTP request timeout to apply to all requests.
      strictSSL: false,
    });
  }

  getStreamOf(filterCriteria) {
    return this.twitterCLient.stream('statuses/filter', filterCriteria);
  }
}

module.exports = TwitterClient;
