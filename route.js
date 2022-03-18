const { readFile, createReadStream, mkdir, writeFile } = require(`fs`);

const { createHash } = require(`crypto`);

const get = require(`request`);

const { Sql, Tools } = require(`./tools`);

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

										quo.forEach(Vault => {

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

					else if (State[2] === `web`) {

						Sql.pulls(Raw => {

							let Quo = {};

							if (Pulls.pull === `app`) {

								Arg[1].end(JSON.stringify(Quo));
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

								Quo.mug = [Mugs.md, new Date().valueOf()];

								Arg[1].end(JSON.stringify(Quo));
							}
						});
					}
				}
			});
		}
	}

}

module.exports = new Route();