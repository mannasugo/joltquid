`use strict`;

const {createConnection} = require(`mysql`);

const { mkdir, readFile, readFileSync, stat, writeFileSync } = require(`fs`);

const { createHash } = require(`crypto`);

const get = require(`request`);

const hold = new Date(`1996-01-20`).valueOf();

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

			let Put = [`asks`, `bids`, `mugs`, `pays`, `positions`, `till`, `vault`, `vows`];

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

					Put.forEach(Place => {

						Puts.positions[0].push(JSON.parse(Place.json));

						Puts.positions[1][JSON.parse(Place.json).md] = JSON.parse(Place.json);
					});
				}

				if (put === 5) {

					Put.forEach(Till => {

						Puts.till[0].push(JSON.parse(Till.json));

						Puts.till[1][JSON.parse(Till.json).md] = JSON.parse(Till.json);
					});
				}

				if (put === 6) {

					Put.forEach(Vault => {

						Puts.vault[0].push(JSON.parse(Vault.json));

						Puts.vault[1][JSON.parse(Vault.json).md] = JSON.parse(Vault.json);
					});
				}

				if (put === 7) {

					Put.forEach(Vow => {

						Puts.vows[0].push(JSON.parse(Vow.json));

						Puts.vows[1][JSON.parse(Vow.json).md] = JSON.parse(Vow.json);
					});
				}

			});

			Arg(Puts);

		}]);
	}

	putlist (Arg) {

		this.credentials.database = `wallet`;

		let Put = [];

		Arg[1].forEach(MD => {

			Put.push([new Tools().coats(MD)]);
		});

		this.Sql([{
			sql: `insert into ?? (json) values?`,
			values: [Arg[0], Put]}, (Raw) => Arg[2](Raw)]);
			
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

	collateralise (Arg) {

		let Holds = {}, TX = [[], []];

		Arg[0].till[0].forEach(MD => {

			if (MD.till[hold] && MD.tx != false) TX[0].push(MD.tx);
		});

		Arg[0].mugs[0].forEach(MD => {

			if (MD.inlet && MD.inlet.USDT) {

				MD.inlet.USDT.forEach(b64 => {

					Holds[b64] = MD.md;
				});
			}
		});

		//readFile(`json/tronscan.json`, {encoding: `utf8`}, (flaw, coat) => {

		get(`https://apilist.tronscan.org/api/token_trc20/transfers?relatedAddress=TH9BuLCBLmCTfvtgBWB14Y4TxCjPdYx4WK`, (flaw, State, coat) => {

			if (!flaw && State.statusCode === 200) {

				this.typen(coat).token_transfers.forEach(MD => {

					if (TX[0].indexOf(MD.transaction_id) === -1 && Holds[MD.from_address] && MD.to_address === `TH9BuLCBLmCTfvtgBWB14Y4TxCjPdYx4WK` && parseInt(MD.quant) > 0) {

						TX[1].push({
							md: createHash(`md5`).update(`${MD.block_ts}`, `utf8`).digest(`hex`),
							secs: MD.block_ts,
							till: {
								[hold]: -(parseInt(MD.quant)/1000000), 
								[Holds[MD.from_address]]: [(parseInt(MD.quant)/1000000), 0]},
							tx: MD.transaction_id,
							vow: false});
					}
				});

				return Arg[1](TX[1]);
			}
		});
	}

	gas (Arg) {

		Arg[0] = parseFloat(Arg[0]);

		let gas = 0;

		if (Arg[0] > .05) {

			if (Arg[0] <= 1) gas = .05;

			if (Arg[0] > 1 && Arg[0] <= 15) gas = .125;

			if (Arg[0] > 15 && Arg[0] <= 25) gas = .175;

			if (Arg[0] > 25 && Arg[0] <= 45) gas = .275;

			if (Arg[0] > 45 && Arg[0] <= 65) gas = .325;

			if (Arg[0] > 65 && Arg[0] <= 105) gas = .425;

			if (Arg[0] > 105) gas = .475
		}

		return gas;
	}

	hold (Arg) {

		let Hold = [0, 0, []];

		let Till = this.typen(this.coats(Arg[0].till[0]));

		Till.sort((A, B) => {return A.secs - B.secs}).forEach(MD => {

			let Holden = [0, 0];

			if (MD.till[Arg[1]]) {

				Hold[0] += MD.till[Arg[1]][0]; 

				Hold[1] += MD.till[Arg[1]][1];

				Holden = [Hold[0], Hold[1]];

				MD[`hold`] = Holden;

				Hold[2].push(MD);
			}
		});

		return Hold[2];
	}

	inlet (Arg) {

		let Hold = [0, 0, []];

		Arg[0].till[0].sort((A, B) => {return A.secs - B.secs}).forEach(MD => {

			let Holden = [0];

			if (MD.till[hold] && MD.tx.length > 10) {

				Hold[0] += MD.till[hold]*-1;

				Holden = [Hold[0]];

				MD[`hold`] = Holden;

				Hold[2].push(MD);
			}
		});

		return Hold[2];
	}

	safe (String) {

		String = String.replace(new RegExp(`&`, `g`), `u0026`);

		String = String.replace(new RegExp(`'`, `g`), `u0027`);

		String = String.replace(new RegExp(`"`, `g`), `u0022`);

		String = String.replace(new RegExp(`/`, `g`), `u002F`);

		return String;
	}

	trail (Raw) {

		let AltSynons = {
			btc: `bitcoin`
		}

		let Trail = [];

		Raw[0].asks[0].forEach(Ask => {

			if (Raw[1] === Ask.mug && Ask.open === false) {

				Trail.push([Ask.secs, [`trade`, `sell`], [AltSynons[Ask.coin[2]], (Ask.coin[2]).toUpperCase()], Ask.coin[0], 0, 0]);
			}
		});

		Raw[0].bids[0].forEach(Bid => {

			if (Raw[1] === Bid.mug && Bid.open === false) {

				Trail.push([Bid.secs, [`trade`, `buy`], [AltSynons[Bid.coin[2]], `USD`], (Bid.dollars).toFixed(4), 0, 0]);
			}
		});

		Raw[0].vault[0].forEach(Obj => {

			if (Raw[1] === Obj.mug && Obj.trace !== null) {

				Trail.push([Obj.secs, [`deposit`, `wallet`], [`American Dollar`, `USD`], parseFloat(Obj.dollars).toFixed(4), 0, 0]);
			}
		});

		return Trail.sort((A, B) => {return B[0] - A[0]});
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

	quo (Raw) {

		let secs = new Date().valueOf(),

		State = {
			btc: [0, [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]],
			volume: [0, [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]]},

		Spans = [[], [], [], [], [], []];

		let Times = [secs - 86400000*3540, secs - 86400000*354, secs - 86400000*31, secs - 86400000*7, secs - 86400000, secs - 3600000];

		readFile(`json/volume.json`, {encoding: `utf8`}, (flaw, Volume) => {

			Volume = this.typen(Volume).volume;

			Volume.sort((A, B) => {return A[0] - B[0]});

			Times[0] = secs - Volume[0][0];

			Times.forEach((i, a) => {

				Volume.forEach((Span) => {

					Span[1] = parseFloat(Span[1]).toFixed(5);

					if (Span[0] >= i && Span[0] <= secs) Spans[a].push(Span);
				});

				if (Spans[a].length === 0) {

					if (Volume.length > 0) Spans[a] = [[i, Volume[Volume.length - 1][1]], [secs, Volume[Volume.length - 1][1]]];

					else Spans[a] = [[i, 0], [secs, 0]];
				}

				else if (Spans[a].length > 0) {

					if (Volume.indexOf(Spans[a][0]) > 0) Spans[a].push([i, Volume[Volume.indexOf(Spans[a][0]) - 1][1]]);

					Spans[a] = Spans[a].sort((A, B) => {return B[0] - A[0]});

					Spans[a].push([secs, Spans[a][0][1]]);
				}

				Spans[a] = Spans[a].sort((A, B) => {return B[0] - A[0]});
			});

			State.volume[0] = Volume[Volume.length - 1][1];

			Spans.forEach((Span, a) => {

				Span = Span.sort((A, B) => {return B[0] - A[0]});

				State.volume[1][a][0] = Span[Span.length - 1][1]; //start

				State.volume[1][a][1] = Span[0][1]; //end

				let Volume = Span.sort((A, B) => {return B[1] - A[1]});

				State.volume[1][a][2] = Span[Span.length - 1][1]; //low

				State.volume[1][a][3] = Span[0][1]; //up
			});

			readFile(`json/last_btc.json`, {encoding: `utf8`}, (flaw, btc) => {

				let Values = this.typen(btc);

				if (Values.length > 0) State.btc[0] = Values[0][0][1];

				Values.forEach((Span, a) => {

					Span = Span.sort((A, B) => {return B[0] - A[0]});

					State.btc[1][a][0] = Span[Span.length - 1][1]; //start

					State.btc[1][a][1] = Span[0][1]; //end

					let Value = Span.sort((A, B) => {return B[1] - A[1]});

					State.btc[1][a][2] = Span[Span.length - 1][1]; //low

					State.btc[1][a][3] = Span[0][1]; //up
				});

				Raw[0]({axis: Values[5] || [], secs: Raw[0], quo: State});

			});
		});
	}

    wallet (Raw) {

		let Wallet = Raw[1];

		let Balance = {},

		Trail = [],

		Vaults = {coin: [], plain: []};

		Wallet.mugs[0].forEach(Mug => {

			Balance[Mug.md] = {};

			Balance[Mug.md][`wallet`] = [[0, 0], [0, 0], [0, 0]]
		});

		for (let mug in Wallet.pays[1]) {

			let Pay = Wallet.pays[1][mug];

			if (Pay.mug === Raw[0]) {

					Balance[Raw[0]][`wallet`][2][1] += parseFloat(Pay.dollars);

					if (Pay.sort[1] === `legacy`) Balance[Raw[0]][`wallet`][0][1] += parseFloat(Pay.dollars);

					else if (Pay.sort[1] === `vault`) Balance[Raw[0]][`wallet`][1][1] += Pay.coin[0];

				}
			}

			for (let mug in Wallet.vault[1]) {

				let Vault = Wallet.vault[1][mug];

				if (Vault.mug === Raw[0] && Vault.complete === true) {

					Balance[Raw[0]][`wallet`][2][0] += parseFloat(Vault.dollars);

					if (Vault.sort[1] === `legacy`) {

						Balance[Raw[0]][`wallet`][0][0] += parseFloat(Vault.dollars);

						Vaults.plain.push(Vault);
					}

					else if (Vault.sort[1] === `vault`) Balance[Raw[0]][`wallet`][1][0] += Vault.coin[0];

				}
			}

		return [Balance[Raw[0]].wallet];
    }

    fileup (Raw) {

		stat(`${Raw[0]}/${Raw[1]}`, (flaw, Stat) => {

			if (flaw) {
							
				mkdir(Raw[0], {recursive: true}, (err) => {

					writeFileSync(`${Raw[0]}/${Raw[1]}`, Raw[2]);

					Raw[3]();
				});
			}

			else Raw[3]();
		});
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