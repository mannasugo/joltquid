`use strict`;

const MySql = require(`mysql`);

class Sql {
  
  constructor (Arg) {

    this.credentials = Arg[0];

    /*this.sql = [

      mysql.createConnection({
        host: config.sqlPass.h,
        user: config.sqlPass.u,
        password: config.sqlPass.p,
        database: config.sqlPass.d}),

      mysql.createConnection({
        host: config.sqlPass.h,
        user: config.sqlPass.u,
        password: config.sqlPass.p,
        database: config.sqlPass.d,
        multipleStatements: true})
      ]*/
  }

  Sql (Arg) {

    return MySql.createConnection(this.credentials).query(Arg[0], (A, B, C) => Arg[1]([A, B, C]));
  }

  pulls () {

    //this.credentials.
  }
}

module.exports = {

  Sql: (Arg) => new Sql([{
        host: `localhost`,
        user: `root`,
        password: `Mann2asugo`,
        multipleStatements: true}]).Sql(Arg)
}