const {createSecureServer} = require(`http2`);

const FileSys = require(`fs`);

const Tools = require(`./tools`);

const {Call, Puts} = require(`./route`);

Tools.Sql([FileSys.readFileSync(`constants/sql.sql`, {encoding: `utf8`}), (Raw) => {}]);

let App = createSecureServer({
  key: FileSys.readFileSync(`http2/ssl/privkey.pem`),
  cert: FileSys.readFileSync(`http2/ssl/fullchain.pem`),
  allowHTTP1: true
}, (call, put) => {

  Call([call, put]);

});

App.on(`error`, (err) => console.error(err));
App.listen(8124);