`use strict`;

const FileSys = require(`fs`);

const MySql = require(`mysql`);

class Sql {
  
  constructor (Arg) {

    this.credentials = Arg[0];
  }

  Sql (Arg) {

    return MySql.createConnection(this.credentials).query(Arg[0], (A, B, C) => Arg[1]([A, B, C]));
  }

  pulls (Arg) {

    this.credentials.database = `wallet`;

    this.Sql([FileSys.readFileSync(`constants/tables.sql`, {encoding: `utf8`}), (Raw) => {

      let Puts = {};

      Raw[1].forEach((Put, put) => {

        if (put === 0) {

          Put.forEach(Mug => {

            (!Puts.mugs)? Puts.mugs = [[], {}]: Puts.mugs;

            Puts.mugs[0].push(JSON.parse(Mug.json));

            Puts.mugs[1][JSON.parse(Mug.json).secs] = JSON.parse(Mug.json);
          });
        }
      });

      Arg(Puts);

    }]);
  }
}

module.exports = {

  Sql: new Sql([{
        host: `localhost`,
        user: `root`,
        password: `Mann2asugo`,
        multipleStatements: true}])
}