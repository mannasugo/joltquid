const {createSecureServer} = require(`http2`);

const FileSys = require(`fs`);

const {Call, Puts} = require(`./route`);

let App = createSecureServer({
  key: FileSys.readFileSync(`http2/ssl/privkey.pem`),
  cert: FileSys.readFileSync(`http2/ssl/fullchain.pem`),
  allowHTTP1: true
}, (call, put) => {

  Call([call, put]);

});

App.on(`error`, (err) => console.error(err));
App.listen(8124);