const multilevel = require('multilevel');
const level = require('level');
const websocket = require('websocket-stream');
const http = require('http');

const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH || '/tmp/my-db';
const KEY_ENCODING = process.env.KEY_ENCODING || 'utf8';
const VALUE_ENCODING = process.env.VALUE_ENCODING || 'json';

const opts = {
  keyEncoding: KEY_ENCODING,
  valueEncoding: VALUE_ENCODING
};

const db = level(DB_PATH, opts);
const httpServer = http.createServer().listen(PORT);;

websocket.createServer({ server: httpServer }, (stream) => {
  stream.pipe(multilevel.server(db)).pipe(stream);
});
