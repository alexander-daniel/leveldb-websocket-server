const multilevel = require('multilevel');
const websocket = require('websocket-stream')

// Connect to the websocket
const ws = websocket('ws://localhost:3000');

// Instantiate the multilevel remote db client
const db = multilevel.client();

// Pipe raw data from the websocket connection
// to the db stream and pipe the db stream
// back to the remote
ws.pipe(db.createRpcStream()).pipe(ws);

// now we can do db stuff on the remote machine
db.put('baz', 'fizz', (err) => {
  if (err) return console.error(err);

  db.get('baz', (err, data) => {
    console.error(err, data);
  });
})


// streams API
db.createReadStream().on('data', (data) => {
  console.error(data)
}).on('error', (data) => {
  console.error(data)
});
