const redis = require("redis");


const client = redis.createClient({
    host: '127.0.0.1',
    port: 6479
  });

  
  function resisConnect() {
    return redis.createClient({
        host: '127.0.0.1',
        port: 6479
      });
  };