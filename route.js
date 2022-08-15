const { readdir, readFile, readFileSync, createReadStream, mkdir, stat, writeFile, writeFileSync } = require(`fs`);

const { createHash } = require(`crypto`);

const get = require(`request`);

const { Sql, Tools } = require(`./tools`);

const hold = new Date(`1996-01-20`).valueOf();

class Route {
	
	Call (Arg) {
		
		let url = (`./${Arg[0].url}`).replace(`//`, `/`).replace(/%(..)/g, function (match, hex) {

			return String.fromCharCode(parseInt(hex, 16))
		});

		let PullContent = File => {

			readFile(File[0], {encoding: `utf8`}, (A, B) => {
			
				return File[1](B);
			});
		}

		let State = url.split(`/`);

		if (Arg[0].method === `GET`)  {

			if (State[1] === `favicon.ico`) {

				let File = createReadStream(`ssl/given/svg/202201262123.svg`);

				Arg[1].writeHead(200, {[`Content-Type`]: `image/svg+xml`});

				File.on(`data`, Arg[1].write.bind(Arg[1]));

				File.on(`close`, () => Arg[1].end());
			}

			else {

				PullContent([`constants/app.html`, (Raw) => {

					let Text = Raw;

					PullContent([`constants/app.css`, (Raw) => {

						Text = Text.replace(/`css`/, Raw);

						Arg[1].writeHead(200, {[`Content-Type`]: `text/html`});

						Arg[1].end(Text);

					}]);
				}]);
			}
		}

		else if (Arg[0].method == `POST`) {

			let blob = new Buffer.alloc(+Arg[0].headers[`content-length`]);

			let Pull = ``;

			let allocate = 0;

			Arg[0].on(`data`, (Data) => {

				Data.copy(blob, allocate);

			 	allocate += Data.length;

				Pull += Data;

			}).on(`end`, () => {

				let Pulls;

				if (Arg[0].headers[`content-type`] === `image/jpeg`) {

					Pulls = {
						md: Arg[0].headers[`md`],
						pull: `fileMug`
					};
				}

				else if (Pull[0] === `{`) {

					Pulls = /*{
												build: "202201271639",
												md: "3af85bc54c4fb16ceb788c0d0eb29147", 
												pull: `pullMug`, 
												polls: [`mannasugo@gmail.com`, `254704174162`, `mannasugo`, `mann`, `asugo`, `Mann2asugo`],
												pulls: [`mannasugo`, `Mann2asugo`]};*/ JSON.parse(Pull);
				}

				if (State[1] === `json`) {

					Arg[1].setHeader(`Content-Type`, `application/json`);

					if (State[2] === `gradle`) {

						const VER = "202201271639";

						Sql.pulls(Raw => {

							let Quo = {build: VER};

							if (Pulls.build && Pulls.build === VER)  {

								if (Pulls.pull === `app`) {

									if (Raw.mugs[1][Pulls.mug]) {

										let mug = Raw.mugs[1][Pulls.mug];

										let vaults = Tools.vaults([mug.md, Raw.vault[0]]);

										let quo = vaults[0][1].concat(vaults[0][2]);

										let mugs = [];

										let polls = [];

										quo.forEach(Vault => { //starjolt

											let pal = (Vault.mug === mug.md) ? Vault.pal: Vault.mug;

											mugs.push({
												color: (Vault.mug === mug.md) ? `red`: `green`,
												dollars: Vault.dollars,
												mug: [
													pal, 
													Raw.mugs[pal].mug, 
													(Raw.mugs[pal].file.length > 0) ? `https://joltquid.com/${Raw.mugs[pal].file[0]}`: false],
												secs: Vault.secs,
												sort: Vault.sort
											});
										});

										vaults[0][0].forEach(Vault => {

											let pal = Vault.mug;

											polls.push({
												color: `green`,
												dollars: Vault.dollars,
												mug: [
													pal, 
													Raw.mugs[pal].mug, 
													(Raw.mugs[pal].file.length > 0) ? `https://joltquid.com/${Raw.mugs[pal].file[0]}`: false],
												secs: Vault.secs,
												sort: Vault.sort
											});
										});

										mugs = mugs.sort((A, B) => {return B.secs - A.secs});

										let wallet = mugs.concat(polls);

										wallet = wallet.sort((A, B) => {return B.secs - A.secs});

										let app = {
											mug: [(mug.file.length > 0) ? `https://joltquid.com/${mug.file[0]}`: false],
											wallet: [vaults[3], mugs, vaults[1], vaults[2], wallet]
										}
									}
								}

								else if (Pulls.pull === `fileState`) {

									if (Raw.mugs[1][Pulls.md]) {

										Quo.secs = new Date().valueOf();

										Arg[1].end(JSON.stringify(Quo));
									}
								}

								else if (Pulls.pull === `palRemit`) {

									if (Raw.mugs[1][Pulls.mug] && Raw.mugs[1][Pulls.pal] && parseFloat(Pulls.gave) > 0) {
										
										let mug = Raw.mugs[1][Pulls.mug];

										let vaults = Tools.vaults([mug.md, Raw.vault[0]])[3];

										if (vaults > Pulls.gave) {

											let secs = new Date().valueOf();

											let gave = {
												call: (Pulls.call.length === 12)? Pulls.call.slice(3, 9): `254${Pulls.call.toString().substr(1)}`,
												dollars: (parseFloat(Pulls.gave)).toFixed(2),
												md: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
												mug: mug.md,
												pal: Pulls.pal,
												secs: secs,
												sort: [`palRemit`, `plain`],
												vaults: vaults - Pulls.gave
											}

											Quo.md = gave.md;
											
											Quo.mug = gave.mug;

											Quo.pal = gave.pal;

											Sql.puts([`vault`, gave, (Raw) => {Arg[1].end(JSON.stringify(Quo));}]);
										}

										else {

											Quo.flaw = [true, `inadequate balance`]; 

											Arg[1].end(JSON.stringify(Quo));
										}
									}
								}

								else if (Pulls.pull === `pollMug`) {

									let Poll = Pulls.polls;

									let Mugs = {};

									Raw.mugs[0].forEach(Mug => {

										if (Mug.mail === Poll[0] || Mug.mug === Poll[2]) Mugs = Mug;
									});

									if (Mugs.secs) return;

									let secs = new Date().valueOf();

									let Mug = {
										family: Tools.safe(Poll[4]),
										file: [],
										lock: createHash(`md5`).update(Poll[5], `utf8`).digest(`hex`),
										mail: Tools.safe(Poll[0]),
										md: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
										middle: Tools.safe(Poll[3]),
										mobile: Tools.safe(Poll[1]),
										mug: Tools.safe(Poll[2]),
										secs: secs};

									Sql.puts([`mugs`, Mug, (Raw) => {Arg[1].end(JSON.stringify(Mug));}]);
								}

								else if (Pulls.pull === `pollVault`) {

									if (Raw.mugs[1][Pulls.md]) {

										let Mug = Raw.mugs[1][Pulls.md];

										let secs = new Date().valueOf();

										let vaults = Tools.vaults([Mug.md, Raw.vault[0]])[3];

										get({
											method: `POST`, 
										  	uri: `https://payment.intasend.com/api/v1/payment/collection/`, 
										  	json: { 
												public_key: `ISPubKey_live_be13c375-b61d-4995-8c50-4268c604c335`,
												currency: `KES`,
												method: `M-PESA`,
												amount: (parseFloat(Pulls.gave)*115).toFixed(2),
												api_ref: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
												name: Mug.family + " " + Mug.middle,
												phone_number: (Pulls.call.length === 12)? Pulls.call.slice(3, 9): `254${Pulls.call.toString().substr(1)}`,
												email: Mug.mail
											}
										}, (error, js, gets) => {

											let gave = {
												call: (Pulls.call.length === 12)? Pulls.call.slice(3, 9): `254${Pulls.call.toString().substr(1)}`,
												complete: false,
												dollars: (parseFloat(Pulls.gave)).toFixed(2),
												md: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
												mug: Mug.md,
												secs: secs,
												sort: [`pollVault`, `plain`],
												trace: (gets.invoice)? gets.invoice.id: null,
												vaults: vaults + Pulls.gave
											}

											Quo.md = gave.md;
											
											Quo.mug = gave.mug;

											Sql.puts([`vault`, gave, (Raw) => {Arg[1].end(JSON.stringify(Quo));}]);
										});
									}
								}

								else if (Pulls.pull === `pullMug`) {

										let Mug = Pulls.pulls;

										let Message = createHash(`md5`).update(Mug[1], `utf8`);

										let Mugs = {};

										Raw.mugs[0].forEach(P => {

											if (P.mug === Mug[0] && P.lock === Message.digest(`hex`)) Mugs = P;
										});

										if (!Mugs.secs) return;

										Quo.md = Mugs.md;

										Quo.secs = new Date().valueOf();

										Arg[1].end(JSON.stringify(Quo));
								}
							}

							else if (Pulls.build && Pulls.build !== VER) {

								Quo.flaw = [true, `update available`];

								Arg[1].end(JSON.stringify(Quo));
							}
						});
					
					}

					else if (State[2] === `wat`) {

						Sql.pulls(Raw => {

							if (Pulls.pull === `app`) {

							}
						});
					}

					else if (State[2] === `web`) {

						Sql.pulls(Raw => {

							let Quo = {};

							if (Pulls.pull === `app`) {

								if (Pulls.mug !== false && Raw.mugs[1][Pulls.mug]) {};

								let USDT = [], Vows = [{}, [], []];

								Raw.till[0].forEach(MD => {

									if (MD.vow != false) {Vows[0][MD.vow[0]] = MD}

									if (MD.tx.length > 10) USDT.push(MD);
								});

								Raw.vows[0].forEach(Vow => {

									if (Vow.mug === Pulls.mug && !Vows[0][Vow.md]) Vows[1].push(Vow);
								});

								Tools.hold([Raw, Pulls.mug]).forEach(MD => {

									if (/*MD.vow != false && MD.vow[1] != Pulls.mug*/ MD.till[Pulls.mug] && MD.till[Pulls.mug][1] != 0) Vows[2].push(MD);
								});

								Arg[1].end(Tools.coats({devow: Vows[2], hold: Tools.inlet([Raw]), mug: Pulls.mug, outs: USDT, vows: Vows[1]}));
							}

							if (Pulls.pull === `getvow`) {

								if (Pulls.mug !== false && Raw.mugs[1][Pulls.mug]) {

									let Puts = [{}, {}];

									Raw.till[0].forEach(MD => {

										if (MD.vow != false) Puts[0][MD.vow[0]] = MD;
									});

									let Holds = Tools.hold([Raw, Pulls.mug]).sort((A, B) => {return B.secs - A.secs});

									if (Raw.vows[1][Pulls.puts[0]] && !Puts[0][Pulls.puts[0]] && Pulls.mug != Raw.vows[1][Pulls.puts[0]].mug) {

										let ts = new Date().valueOf();

										if (Raw.vows[1][Pulls.puts[0]].float > 0) {

											if (Holds[0].hold[0] > Raw.vows[1][Pulls.puts[0]].float) {

												Puts[1] = {
													md: createHash(`md5`).update(`${ts}`, `utf8`).digest(`hex`),
													secs: ts,
													till: {
														[Pulls.mug]: [-(parseFloat(Raw.vows[1][Pulls.puts[0]].float)), 0], 
														[Raw.vows[1][Pulls.puts[0]].mug]: [0, parseFloat(Raw.vows[1][Pulls.puts[0]].float)]},
													tx: false,
													vow: [Pulls.puts[0], Pulls.mug]};

												Sql.puts([`till`, Puts[1], (Raw) => {Arg[1].end(Tools.coats({mug: Pulls.mug}));}]);
											}

											else Arg[1].end(Tools.coats({mug: Pulls.mug}));
										}

										if (Raw.vows[1][Pulls.puts[0]].float < 0) {

											let Bals = Tools.hold([Raw, Raw.vows[1][Pulls.puts[0]].mug]).sort((A, B) => {return B.secs - A.secs});

											let float = Raw.vows[1][Pulls.puts[0]].float;

											let gas = Tools.gas([(float)*-1])*.85;

											if (Holds[0].hold[0] > (float)*-1 && Bals[0].hold[1] > (gas + (float)*-1)) {

												Puts[1] = {
													md: createHash(`md5`).update(`${ts}`, `utf8`).digest(`hex`),
													secs: ts,
													till: {
														[hold]: gas*.45,
														[Pulls.mug]: [float, gas*.55], 
														[Raw.vows[1][Pulls.puts[0]].mug]: [0, -(gas + (float)*-1)]},
													tx: false,
													vow: [Pulls.puts[0], Pulls.mug]};

												Sql.puts([`till`, Puts[1], (Raw) => {Arg[1].end(Tools.coats({mug: Pulls.mug}));}]);
											}

											else Arg[1].end(Tools.coats({mug: Pulls.mug}));
										}

										else Arg[1].end(Tools.coats({mug: Pulls.mug}));
									}

									else Arg[1].end(Tools.coats({mug: Pulls.mug}));
								};

								/**Puts[0] = {
									float: Pulls.puts,
									md: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
									mug: Pulls.mug, 
									secs: secs};**/

								/**Sql.puts([`vows`, Puts[0], (Raw) => {**/Arg[1].end(Tools.coats({mug: Pulls.mug}));//}]);
							}

							if (Pulls.pull === `inlet`) {

								if (Pulls.mug !== false && Raw.mugs[1][Pulls.mug]) {
								};

								let Avail = {inlet: []};

								Raw.mugs[0].forEach(Mug => {

									if (Mug.inlet && Mug.inlet.USDT) {

										if (Mug.inlet.USDT.indexOf(Pulls.puts[0]) > -1) Avail.inlet = [Mug.md];
									}
								});

								//pavejolt 
								//paveon
								//starjolt

                				let Old = Tools.typen(Tools.coats(Raw.mugs[1][Pulls.mug]));

								if (Avail.inlet.length === 0) {

									if (!Raw.mugs[1][Pulls.mug].inlet) Raw.mugs[1][Pulls.mug][`inlet`] = {};

									if (!Raw.mugs[1][Pulls.mug].inlet.USDT) Raw.mugs[1][Pulls.mug].inlet[`USDT`] = [];

									Raw.mugs[1][Pulls.mug].inlet.USDT.push(Pulls.puts[0]); 

									Sql.places([`mugs`, Raw.mugs[1][Pulls.mug], Old, (Raw) => {

										Arg[1].end(Tools.coats({ 
											mug: Pulls.mug
										}));
									}]);
								}

								else {

									Arg[1].end(Tools.coats({ 
										mug: Pulls.mug
									}));
								}
							}

							if (Pulls.pull === `put-vow`) {

								if (Pulls.mug !== false && Raw.mugs[1][Pulls.mug]) {
								};

								let secs = new Date().valueOf();

								let Puts = [{}];

								Puts[0] = {
									float: Pulls.puts,
									md: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
									mug: Pulls.mug, 
									secs: secs};

								Sql.puts([`vows`, Puts[0], (Raw) => {Arg[1].end(Tools.coats({mug: Pulls.mug, vows: Puts[0]}));}]);
							}

							if (Pulls.pull === `settle`) {

								if (Pulls.mug !== false && Raw.mugs[1][Pulls.mug]) {
								};

								Tools.collateralise([Raw, TX => {

									let Settle = [], Puton = [];

									Tools.hold([Raw, Pulls.mug]).forEach(MD => {

										if (MD.vow != false && MD.vow[1] === Pulls.mug) Settle.push(MD);

										if (MD.till[Pulls.mug] && MD.tx.length > 10) Puton.push(MD)
									});

									if (TX.length > 0) {

										Sql.putlist([`till`, TX, (SQ) => {

											Arg[1].end(Tools.coats({ 
												inlet: (Raw.mugs[1][Pulls.mug].inlet)? Raw.mugs[1][Pulls.mug].inlet.USDT: [],
												mug: Pulls.mug,
												puton: Puton,
												settles: Settle
											}));
										}]);
									}

									else {

										Arg[1].end(Tools.coats({ 
											inlet: (Raw.mugs[1][Pulls.mug].inlet)? Raw.mugs[1][Pulls.mug].inlet.USDT: [],
											mug: Pulls.mug,
											puton: Puton,
											settles: Settle
										}));
									}
								}]);
							}

							if (Pulls.pull === `via`) {

								if (Pulls.mug !== false && Raw.mugs[1][Pulls.mug]) {

									let Puts = [{}, {}];

									let Holds = Tools.hold([Raw, Pulls.mug]).sort((A, B) => {return B.secs - A.secs});

									if (Pulls.mug != Pulls.puts[0] && Holds[0].hold[1] > (Pulls.puts[1] + Tools.gas([Pulls.puts[1]]))) {

										let ts = new Date().valueOf();

										Puts[1] = {
											md: createHash(`md5`).update(`${ts}`, `utf8`).digest(`hex`),
											secs: ts,
											till: {
												[hold]: Tools.gas([Pulls.puts[1]]),
												[Pulls.mug]: [0, -(parseFloat([Pulls.puts[1]]) + Tools.gas([Pulls.puts[1]]))], 
												[Pulls.puts[0]]: [0, parseFloat(Pulls.puts[1])]},
											tx: false,
											vow: false};

										Sql.puts([`till`, Puts[1], (Raw) => {Arg[1].end(Tools.coats({mug: Pulls.mug}));}]);
									}

									else Arg[1].end(Tools.coats({mug: Pulls.mug}));
									
								}
							}

							if (Pulls.pull === `vowout`) {

								if (Pulls.mug !== false && Raw.mugs[1][Pulls.mug]) {

									let secs = new Date().valueOf();

									let Puts = [{}];

									Puts[0] = {
										float: -(Pulls.puts),
										md: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
										mug: Pulls.mug, 
										secs: secs};

									Sql.puts([`vows`, Puts[0], (Raw) => {Arg[1].end(Tools.coats({mug: Pulls.mug}));}]);
								}
							}

							if (Pulls.pull === `wallets`) {

								if (Pulls.mug !== false && Raw.mugs[1][Pulls.mug]) {
								};

								Arg[1].end(Tools.coats({ 
									inlet: (Raw.mugs[1][Pulls.mug].inlet)? Raw.mugs[1][Pulls.mug].inlet.USDT: [],
									mug: Pulls.mug
								}));
							}

							else if (Pulls.pull === `assets`) {

								if (Raw.mugs[1][Pulls.mug]) {

									let Puts = [[]];

									readFile(`json/last_btc.json`, {encoding: `utf8`}, (flaw, Coat) => {

										Coat = Tools.typen(Coat);

										let Wallet = Tools.wallet([Pulls.mug, Raw])[0];

										let Balance = [Wallet[0][0] - Wallet[0][1], Wallet[1][0] - Wallet[1][1]];

										Wallet[3] = Wallet[2];

										Wallet[2] = Balance;

										Arg[1].end(Tools.coats({axis: Coat[5], mug: Pulls.mug, pitmoves: Puts[0], wallet: Wallet}));
									});
								}
							}

							else if (Pulls.pull === `balance`) {

								let Puts = [[], []];

								Tools.quo([Quo => {

									if (Pulls.mug !== false && Raw.mugs[1][Pulls.mug]) {

										let Wallet = Tools.wallet([Pulls.mug, Raw])[0];

										let Balance = [Wallet[0][0] - Wallet[0][1], Wallet[1][0] - Wallet[1][1]];

										Wallet[3] = Wallet[2];

										Wallet[2] = Balance;

										Puts[1] = Wallet;
									};

									Arg[1].end(Tools.coats({
										axis: Quo.axis, 
										mug: Pulls.mug, 
										quo: Quo.quo, 
										trail: Tools.trail([Raw, Pulls.mug]), 
										wallet: Puts[1]}));
								}]);
							}

							else if (Pulls.pull === `btc`) {

								readFile(`json/last_btc.json`, {encoding: `utf8`}, (flaw, Coat) => {

									Coat = Tools.typen(Coat);

									Arg[1].end(Tools.coats({axis: Coat[Pulls.puts]}));
								});	
							}

							else if (Pulls.pull === `buy-limit`) {

								let Puts = [{}];

								let secs = new Date().valueOf();

								let Pit = [parseFloat(Pulls.puts), parseFloat(Pulls.place)];

								Puts[0] = {
									coin: [Pit[0], Pit[1], `btc`],
									dollars: Pit[0]*Pit[1],
									fill: 0,
									md: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
									mug: Pulls.mug,
									open: true,
									secs: secs,
									side: `buy`,
									type: `limit`};

								Sql.puts([`asks`, Puts[0], (Raw) => {

									Arg[1].end(Tools.coats({mug: Pulls.mug}));
								}]);
							}

							else if (Pulls.pull === `buy-pit`) {

								readFile(`json/last_btc.json`, {encoding: `utf8`}, (flaw, Coat) => {

									let swap = Tools.typen(Coat)[5][0][1];

									let Wallet = Tools.wallet([Pulls.mug, Raw])[0];

									let Balance = [Wallet[0][0] - Wallet[0][1], Wallet[1][0] - Wallet[1][1]];

									Pulls.place = parseFloat(Pulls.puts);

									if (Balance[0] >= Pulls.place*swap) {

										let secs = new Date().valueOf();

										let Puts = [{}, {}, {}];

										Puts[0] = {
											dollars: Pulls.place*swap,
											md: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
											mug: Pulls.mug, 
											secs: secs, 
											sort: [`vault`, `legacy`]};

										Sql.puts([`pays`, Puts[0], (Raw) => {

											Puts[1] = {
												call: null,
												coin: [Pulls.place, swap, `btc`],
												complete: true,
												dollars: Pulls.place*swap,
												md: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
												mug: Pulls.mug,
												secs: secs,
												sort: [`vault`, `vault`],
												trace: null}

											Sql.puts([`vault`, Puts[1], (Raw) => {

												Puts[2] = {
													coin: [Pulls.place, swap, `btc`],
													dollars: Pulls.place*swap,
													md: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
													mug: Pulls.mug,
													open: false, //null/canceled
													secs: secs,
													side: `buy`,
													type: `market`}

												Sql.puts([`asks`, Puts[2], (Raw) => {

													readFile(`json/volume.json`, {encoding: `utf8`}, (flaw, Coat) => {

														Coat = Tools.typen(Coat);

														let last = parseFloat(Coat.volume[Coat.volume.length - 1][1]);

														Coat.volume.push([secs, (Pulls.place + last)]);

														writeFile(`json/volume.json`, Tools.coats(Coat), flaw => {

															Arg[1].end(Tools.coats({mug: Pulls.mug}));
														});
													});
												}]);
											}]);
										}]);
									}
								});	
							}

							else if (Pulls.pull === `buy-profit`) {

								let Puts = [{}];

								let secs = new Date().valueOf();

								let Pit = [parseFloat(Pulls.puts), parseFloat(Pulls.place)];

								Puts[0] = {
									coin: [Pit[0], Pit[1], `btc`],
									dollars: Pit[0]*Pit[1],
									fill: 0,
									md: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
									mug: Pulls.mug,
									open: true,
									secs: secs,
									side: `buy`,
									type: `take-profit`};

									//write method to consolidate all unfilled trades on awaits.json per request

									//instead of overtasking db on query replace upon trade match or fill, log and maintain price match or fill then replace on user SOCK

								Sql.puts([`asks`, Puts[0], (Raw) => {

									Arg[1].end(Tools.coats({mug: Pulls.mug}));
								}]);
							}

							else if (Pulls.pull === `fileMug`) {

								if (Raw.mugs[1][Pulls.md]) {

									let secs = new Date().valueOf();
							
									const hold = `ssl/gets/img/mugs/`;
							
									mkdir(hold, {recursive: true}, (err) => {
							
										writeFile(hold + secs + `.jpg`, blob, err => {

											let Mug = JSON.parse(JSON.stringify(Raw.mugs[1][Pulls.md]));

											Mug.file = [hold + secs + `.jpg`];

											Mug.secs = secs;

											Quo.fileMug = true;

											Quo.secs = secs;

											Sql.places([`mugs`, Mug, Raw.mugs[1][Pulls.md], (Raw) => Arg[1].end(JSON.stringify(Quo))]);
							
										});
									});
								}
							}

							else if (Pulls.pull === `fileState`) {

								if (Raw.mugs[1][Pulls.md] && (new Date().valueOf() - Pulls.secs) <= 60000*86400) { //1644502190238

									Quo.fileState = true;

									Quo.secs = new Date().valueOf();

									Arg[1].end(JSON.stringify(Quo));
								}
							}

							else if (Pulls.pull === `mugin`) {

								let Mug = Pulls.puts;

								let Message = createHash(`md5`).update(Mug[1], `utf8`);

								let Mugs = {};

								Raw.mugs[0].forEach(P => {

									if (P.mail === Mug[0] && P.lock === Message.digest(`hex`)) Mugs = P;
								});

								if (!Mugs.secs) return;

								Quo.mug = [Mugs.md, Mugs.middle, new Date().valueOf()];

								Arg[1].end(JSON.stringify(Quo));
							}

							else if (Pulls.pull === `mugup`) {

								let Poll = Pulls.puts;

								let Mugs = {};

								Raw.mugs[0].forEach(Mug => {

									if (Mug.mail === Poll[0]/* || Mug.mug === Poll[2]*/) Mugs = Mug;
								});

								if (Mugs.secs) return;

								let secs = new Date().valueOf();

								let Mug = {
									family: Tools.safe(Poll[1]),
									file: [],
									lock: createHash(`md5`).update(Poll[2], `utf8`).digest(`hex`),
									mail: Tools.safe(Poll[0]),
									md: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
									middle: Tools.safe(Poll[3]),
									mobile: false,
									mug: false,
									secs: secs};

								Quo.mug = [Mug.md, Mug.middle, new Date().valueOf()];

								Sql.puts([`mugs`, Mug, (Raw) => {Arg[1].end(JSON.stringify(Quo));}]);
							}

							else if (Pulls.pull === `pit`) {

								if (Raw.mugs[1][Pulls.mug]) {

									let Puts = [[]];

									Raw.asks[0].forEach(Ask => {

										if (Ask.mug === Pulls.mug) Puts[0].push(Ask);
									});

									Raw.bids[0].forEach(Bid => {

										if (Bid.mug === Pulls.mug) Puts[0].push(Bid);
									});

									readFile(`json/last_btc.json`, {encoding: `utf8`}, (flaw, Coat) => {

										Coat = Tools.typen(Coat);

										let Wallet = Tools.wallet([Pulls.mug, Raw])[0];

										let Balance = [Wallet[0][0] - Wallet[0][1], Wallet[1][0] - Wallet[1][1]];

										Wallet[2] = Balance;

										Arg[1].end(Tools.coats({axis: Coat[5], mug: Pulls.mug, pitmoves: Puts[0], wallet: Wallet}));
									});
								}
							}

							else if (Pulls.pull === `sell-limit`) {

								let Puts = [{}];

								let secs = new Date().valueOf();

								let Pit = [parseFloat(Pulls.puts), parseFloat(Pulls.place)];

								Puts[0] = {
									coin: [Pit[0], Pit[1], `btc`],
									dollars: Pit[0]*Pit[1],
									fill: 0,
									md: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
									mug: Pulls.mug,
									open: true,
									secs: secs,
									side: `sell`,
									type: `limit`};

								Sql.puts([`bids`, Puts[0], (Raw) => {

									Arg[1].end(Tools.coats({mug: Pulls.mug}));
								}]);
							}

							else if (Pulls.pull === `sell-pit`) {

								readFile(`json/last_btc.json`, {encoding: `utf8`}, (flaw, Coat) => {

									let swap = Tools.typen(Coat)[5][0][1];

									let Wallet = Tools.wallet([Pulls.mug, Raw])[0];

									let Balance = [Wallet[0][0] - Wallet[0][1], Wallet[1][0] - Wallet[1][1]];

									Pulls.place = parseFloat(Pulls.puts);

									if (Balance[1] >= Pulls.place) {

										let secs = new Date().valueOf();

										let Puts = [{}, {}, {}];

										Puts[0] = {
											coin: [Pulls.place, swap, `btc`],
											dollars: Pulls.place*swap,
											md: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
											mug: Pulls.mug, 
											secs: secs, 
											sort: [`vault`, `vault`]};

										Sql.puts([`pays`, Puts[0], (Raw) => {

											Puts[1] = {
												call: null,
												coin: [Pulls.place, swap, `btc`],
												complete: true,
												dollars: Pulls.place*swap,
												md: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
												mug: Pulls.mug,
												secs: secs,
												sort: [`vault`, `legacy`],
												trace: null}

											Sql.puts([`vault`, Puts[1], (Raw) => {

												Puts[2] = {
													coin: [Pulls.place, swap, `btc`],
													dollars: Pulls.place*swap,
													md: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
													mug: Pulls.mug,
													open: false,
													secs: secs,
													side: `sell`,
													type: `market`}

												Sql.puts([`bids`, Puts[2], (Raw) => {

													readFile(`json/volume.json`, {encoding: `utf8`}, (flaw, Coat) => {

														Coat = Tools.typen(Coat);

														let last = parseFloat(Coat.volume[Coat.volume.length - 1][1]);

														Coat.volume.push([secs, (last - Pulls.place)]);

														writeFile(`json/volume.json`, Tools.coats(Coat), flaw => {

															Arg[1].end(Tools.coats({mug: Pulls.mug}));
														});
													});
												}]);
											}]);
										}]);
									}
								});	
							}

							else if (Pulls.pull === `vault`) {

								if (Raw.mugs[1][Pulls.mug]) {

									let Mug = Raw.mugs[1][Pulls.mug];

									let secs = new Date().valueOf();

									get({
										method: `POST`, 
										uri: `https://payment.intasend.com/api/v1/payment/collection/`, 
										json: { 
											public_key: `ISPubKey_live_be13c375-b61d-4995-8c50-4268c604c335`,
											currency: `KES`,
											method: `M-PESA`,
											amount: (parseFloat(Pulls.puts[0])*115).toFixed(2),
											api_ref: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
											name: Mug.family + " " + Mug.middle,
											phone_number: (Pulls.puts[1].length === 12)? Pulls.puts[1].slice(3, 9): `254${Pulls.puts[1].toString().substr(1)}`,
											email: Mug.mail}}, (flaw, State, coat) => {

												if (!flaw && State.statusCode === 200) {

													let Pay = coat;

													let Puts = {
														call: (Pulls.puts[1].length === 12)? Pulls.puts[1].slice(3, 9): `254${Pulls.puts[1].toString().substr(1)}`,
														complete: false,
														dollars: (parseFloat(Pulls.puts[0])).toFixed(2),
														md: createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
														mug: Mug.md,
														secs: secs,
														sort: [`vault`, `legacy`],
														trace: (Pay.invoice)? Pay.invoice.id: null
													}

													Quo.md = Puts.md;
											
													Quo.mug = Puts.mug;

													Sql.puts([`vault`, Puts, (Raw) => {Arg[1].end(JSON.stringify(Quo));}]);
												}
									});
								}
							}
						});
					}
				}
			});
		}
	}

	polling (App) {

		App.on(`connection`, Polling => {

			Polling.on(`app`, Raw => {

				Sql.pulls(Wallet => {

					let Default = [];

					let Pit = [[]];

					Wallet.vault[0].forEach(Vault => {

						if (Vault.complete === false) Default.push(Vault);
					});

					Wallet.asks[0].forEach(Ask => {

						if (Ask.open === true && Ask.type === `take-profit` && Ask.fill === 0) Pit[0].push(Ask);
					});

					writeFileSync(`json/defaults.json`, Tools.coats(Default));

					let secs = new Date().valueOf(),

					State = {
						btc: [0, [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]],
						volume: [0, [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]]},

					Spans = [[], [], [], [], [], []];

					let Times = [secs - 86400000*3540, secs - 86400000*354, secs - 86400000*31, secs - 86400000*7, secs - 86400000, secs - 3600000];

					readFile(`json/volume.json`, {encoding: `utf8`}, (flaw, Volume) => {

						Volume = Tools.typen(Volume).volume;

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

							let Values = Tools.typen(btc);

							State.btc[0] = Values[0][0][1];

							Values.forEach((Span, a) => {

								Span = Span.sort((A, B) => {return B[0] - A[0]});

								State.btc[1][a][0] = Span[Span.length - 1][1]; //start

								State.btc[1][a][1] = Span[0][1]; //end

								let Value = Span.sort((A, B) => {return B[1] - A[1]});

								State.btc[1][a][2] = Span[Span.length - 1][1]; //low

								State.btc[1][a][3] = Span[0][1]; //up
							});

							App.emit(`app`, {axis: Values[5], secs: Raw[0], quo: State});

						});
					});
				});
			});

			Polling.on(`wallet`, Raw => {

				Sql.pulls(Wallet => {

					let Balance = {},

					Trail = [],

					Vaults = {coin: [], plain: []};

					Wallet.mugs[0].forEach(Mug => {

						Balance[Mug.md] = {};

						Balance[Mug.md][`wallet`] = [[0, 0], [0, 0], [0, 0]];
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

								if (!Vault.coin) Vaults.plain.push(Vault);
							}

							else if (Vault.sort[1] === `vault`) Balance[Raw[0]][`wallet`][1][0] += Vault.coin[0];

						}
					}

					App.emit(`wallet`, {mug: Raw[0], secs: Raw[1], vaults: Vaults, wallet: Balance[Raw[0]].wallet});
				});
			});

			setInterval(() => {

				readFile(`json/pit.json`, {encoding: `utf8`}, (flaw, Coat) => {

					Coat = Tools.typen(Coat);

					//let AltDay = {btc: []};

					if (Coat.quo && Coat.axis) App.emit(`pit`, Coat);
				});

			}, 1000);
		});
	}

	reals () { //create last_btc reset button

		let Real = [`awaits`, `bitcoin`, `defaults`, `pit`, `volume`];

		Real.forEach((File, file) => {

			stat(`json/${Real[file]}.json`, (err, Stat) => {

				let real = ``;

				if (err) { 

					if (Real[file] === `awaits`) real = Tools.coats({});

					else if (Real[file] === `bitcoin`) real = Tools.coats({last: []});

					else if (Real[file] === `defaults`) real = Tools.coats([]);

					else if (Real[file] === `pit`) real = Tools.coats({});

					else if (Real[file] === `volume`) real = Tools.coats({volume: [[new Date().valueOf(), 0.00304999754]]});

					writeFileSync(`json/${Real[file]}.json`, real);
				}
			});
		});

		setInterval(() => { 

			get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin`, (flaw, State, coat) => {

				if (!flaw && State.statusCode === 200) {

					readFile(`json/bitcoin.json`, {encoding: `utf8`}, (flaw, Coat) => {

						Coat = Tools.typen(Coat);

						if (Coat.last.length === 0 || Coat.last[Coat.last.length - 1][1] !== Tools.typen(coat)[0].current_price) {

							console.log(Tools.typen(coat)[0].current_price)

							Coat.last.push([new Date().valueOf(), Tools.typen(coat)[0].current_price]);

							writeFile(`json/bitcoin.json`, Tools.coats(Coat), flaw => {

							let secs = new Date().valueOf();

							let Value = Coat.last;

							Value.sort((A, B) => {return A[0] - B[0]});

							let Times = [secs - 86400000*3540, secs - 86400000*354, secs - 86400000*31, secs - 86400000*7, secs - 86400000, secs - 3600000];

							Times[0] = secs - Value[0][0];

							let Values = [[], [], [], [], [], []];

							Times.forEach((i, a) => {

								Value.forEach((Span) => {

									if (Span[0] >= i && Span[0] <= secs) Values[a].push(Span);
								});

								if (Values[a].length === 0) {

									if (Value.length > 0) Values[a] = [[i, Value[Value.length - 1][1]], [secs, Value[Value.length - 1][1]]];

									else Values[a] = [[i, 0], [secs, 0]];
								}

								else if (Values[a].length > 0) {

									if (Value.indexOf(Values[a][0]) > 0) Values[a].push([i, Value[Value.indexOf(Values[a][0]) - 1][1]]);

									Values[a] = Values[a].sort((A, B) => {return B[0] - A[0]});

									Values[a].push([secs, Values[a][0][1]]);
								}

								Values[a] = Values[a].sort((A, B) => {return B[0] - A[0]});
							});

							let State = {
								btc: [0, [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]]};

							State.btc[0] = Values[0][0][1];

							Values.forEach((Span, a) => {

								Span = Span.sort((A, B) => {return B[0] - A[0]});

								State.btc[1][a][0] = Span[Span.length - 1][1];

								State.btc[1][a][1] = Span[0][1];

								let Value = Span.sort((A, B) => {return B[1] - A[1]});

								State.btc[1][a][2] = Span[Span.length - 1][1];

								State.btc[1][a][3] = Span[0][1];

								Span = Span.sort((A, B) => {return B[0] - A[0]});
							});

							writeFile(`json/last_btc.json`, Tools.coats(Values), flaw => {

								writeFileSync(`json/pit.json`, Tools.coats({axis: Values[5], quo: State}))//, flaw => {});

							});
						});
						}
					});
				}
			});

		}, 75000);	
		
		setInterval(() => {

			readFile(`json/defaults.json`, {encoding: `utf8`}, (flaw, Coat) => {

				Coat = Tools.typen(Coat);

				Coat.forEach(Vault => {

					if (Vault.complete === false) {

                		let pay = Tools.typen(Tools.coats(Vault));

              			get({method: `POST`, uri: `https://payment.intasend.com/api/v1/payment/status/`, json: { 
              				public_key: `ISPubKey_live_be13c375-b61d-4995-8c50-4268c604c335`,
                  			invoice_id: Vault.trace}}, (flaw, State, coat) => {

								if (!flaw && State.statusCode === 200) {

                  					let Pay = coat;

                					if (Pay.invoice && Pay.invoice.state === `COMPLETE`) {

                  						Vault.complete = true; 

										Sql.places([`vault`, Vault, pay, (Raw) => {}]);
                  					}
                  				}
                  		});
                	} 
				});
			});			
		}, 7500);
	}

}

module.exports = new Route();