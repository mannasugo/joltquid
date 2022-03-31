`use strict`;

const {createConnection} = require(`mysql`);

const { readFileSync } = require(`fs`);

const get = require(`request`);

class Sql {
	
	constructor (Arg) {

		this.credentials = Arg[0];
	}

	Sql (Arg) {

		return createConnection(this.credentials).query(Arg[0], (A, B, C) => Arg[1]([A, B, C]));
	}

	pulls (Arg) {

		this.credentials.database = `wallet`;

		this.Sql([readFileSync(`constants/tables.sql`, {encoding: `utf8`}), (Raw) => {

			let Put = [`asks`, `bids`, `mugs`, `pays`, `vault`];

			let Puts = {};

			Put.forEach(put => Puts[put] = [[], {}]);

			Raw[1].forEach((Put, put) => {

				if (put === 0) {

					Put.forEach(Ask => {

						Puts.asks[0].push(JSON.parse(Ask.json));

						Puts.asks[1][JSON.parse(Ask.json).md] = JSON.parse(Ask.json);
					});
				}

				else if (put === 1) {

					Put.forEach(Bid => {

						Puts.bids[0].push(JSON.parse(Bid.json));

						Puts.bids[1][JSON.parse(Bid.json).md] = JSON.parse(Bid.json);
					});
				}

				else if (put === 2) {

					Put.forEach(Mug => {

						Puts.mugs[0].push(JSON.parse(Mug.json));

						Puts.mugs[1][JSON.parse(Mug.json).md] = JSON.parse(Mug.json);
					});
				}

				if (put === 3) {

					Put.forEach(Pays => {

						Puts.pays[0].push(JSON.parse(Pays.json));

						Puts.pays[1][JSON.parse(Pays.json).md] = JSON.parse(Pays.json);
					});
				}

				if (put === 4) {

					Put.forEach(Vault => {

						Puts.vault[0].push(JSON.parse(Vault.json));

						Puts.vault[1][JSON.parse(Vault.json).md] = JSON.parse(Vault.json);
					});
				}

			});

			Arg(Puts);

		}]);
	}

	puts (Arg) {

		this.credentials.database = `wallet`;

		this.Sql([{
			sql: `insert into ?? set ?`,
			values: [Arg[0], {json: JSON.stringify(Arg[1])}]}, (Raw) => Arg[2](Raw)]);
			
	}

    places (Arg) {

        this.credentials.database = `wallet`;

        this.Sql([{
            sql: `update ${Arg[0]} set json = ? where json = ?`,
            values: [JSON.stringify(Arg[1]), JSON.stringify(Arg[2])]}, (Raw) => Arg[3](Raw)]);
    }
}

class Tools {

	constructor () {}

	coats (types) { return JSON.stringify(types); }

	safe (String) {

		String = String.replace(new RegExp(`&`, `g`), `u0026`);

		String = String.replace(new RegExp(`'`, `g`), `u0027`);

		String = String.replace(new RegExp(`"`, `g`), `u0022`);

		String = String.replace(new RegExp(`/`, `g`), `u002F`);

		return String;
	}

	typen (coat) { return JSON.parse(coat); }

	vaults (Arg) {

		let vault = [0, 0, 0, 0];

		let vaults = [[], [], [], []];

		Arg[1].forEach(Raw => {

			let sum = parseFloat(Raw.dollars);

			if (Raw.mug === Arg[0] && Raw.sort[0] === `palRemit`) {
				
				vault[2] += sum;

				vaults[2].push(Raw);
			}

			else if ((Raw.pal && Raw.pal === Arg[0]) && Raw.sort[0] === `palRemit`) {
				
				vault[1] += sum;

				vaults[1].push(Raw);
			}

			else if (Raw.mug === Arg[0] && Raw.sort[0] === `pays`) {
				
				vault[3] += sum;

				vaults[3].push(Raw);
			}

			else if (Raw.mug === Arg[0] && Raw.sort[0] === `pollVault`)  {
				
				vault[0] += sum;

				vaults[0].push(Raw);
			}
		});

		return [vaults, (vault[0] + vault[1]).toFixed(2), (vault[2] + vault[3]).toFixed(2), ((vault[0] + vault[1]) - (vault[2] + vault[3])).toFixed(2)];
	}
}

module.exports = {
	
	Sql : new Sql([{
		host: `localhost`,
		user: `root`,
		password: `Mann2asugo`,
		multipleStatements: true
	}]), 
	
	Tools : new Tools()
}