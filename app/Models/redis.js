const redis = require('redis');

const client = redis.createClient(6379, 'redis');

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on('error', (err) => {
  console.log(`Something went wrong ${err}`);
});

module.exports = client;
