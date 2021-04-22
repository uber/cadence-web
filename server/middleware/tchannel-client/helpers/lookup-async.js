const dns = require('dns');

const lookupAsync = host => new Promise((resolve, reject) => {
  dns.lookup(host, { family: 4 }, (err, ip) => {
    if (err) {
      reject(err);
    } else {
      resolve(ip);
    }
  });
});

module.exports = lookupAsync;
