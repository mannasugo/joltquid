const FileSys = require(`fs`);

const Vault = require(`crypto`);

const Tools = require(`./tools`);

//const Constants = require(`./constants`);

class Route {
	
	Call (Arg) {
		
			let url = (`./${Arg[0].url}`).replace(`//`, `/`).replace(/%(..)/g, function (match, hex) {

					return String.fromCharCode(parseInt(hex, 16))
			});

			let PullContent = File => {

					FileSys.readFile(File[0], {encoding: `utf8`}, (A, B) => {
			
						return File[1](B);
					});
			}

			let PullFile = File => {

					let Pull = FileSys.createReadStream(File[0]);

					Arg[1].writeHead(200, File[1]);

					Pull.on(`data`, Arg[1].write.bind(Arg[1]));

					Pull.on(`close`, () => Arg[1].end())
			}

			let State = url.split(`/`);

		if (Arg[0].method === `GET`)  {

					if (State[1] === `favicon.ico`) {

						let File = FileSys.createReadStream(`ssl/puts/svg/202201262123.svg`);

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

		else if (Arg[0].method !== `GET`) {

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

										Tools.Sql.pulls(Raw => {

											let Quo = {build: VER};

											if (Pulls.build && Pulls.build === VER)  {

													if (Pulls.pull === `app`) {

														Quo.pull = `app`;
													}

									else if (Pulls.pull === `fileState`) {

										if (Raw.mugs[1][Pulls.md]) {

											Quo.secs = new Date().valueOf();

											Arg[1].end(JSON.stringify(Quo));
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
																				family: Tools.Tools.safe(Poll[4]),
																				file: [],
																				lock: Vault.createHash(`md5`).update(Poll[5], `utf8`).digest(`hex`),
																				mail: Tools.Tools.safe(Poll[0]),
																				md: Vault.createHash(`md5`).update(`${secs}`, `utf8`).digest(`hex`),
																				middle: Tools.Tools.safe(Poll[3]),
																				mobile: Tools.Tools.safe(Poll[1]),
																				mug: Tools.Tools.safe(Poll[2]),
																				secs: secs};

																		Tools.Sql.puts([`mugs`, Mug, (Raw) => {Arg[1].end(JSON.stringify(Mug));}]);
																}

									else if (Pulls.pull === `pullMug`) {

										let Mug = Pulls.pulls;

										let Message = Vault.createHash(`md5`).update(Mug[1], `utf8`);

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

								else if (Pulls.build && Pulls.build !== VER) Arg[1].end(JSON.stringify(Quo));
							});
					
					}

					else if (State[2] === `web`) {

						Tools.Sql.pulls(Raw => {

							let Quo = {};

							if (Pulls.pull === `fileMug`) {

								if (Raw.mugs[1][Pulls.md]) {

									let secs = new Date().valueOf();
							
									const hold = `ssl/gets/img/mugs/`;
							
									FileSys.mkdir(hold, {recursive: true}, (err) => {
							
										FileSys.writeFile(hold + secs + `.jpg`, blob, err => {

											let Mug = JSON.parse(JSON.stringify(Raw.mugs[1][Pulls.md]));

											Mug.file = [hold + secs + `.jpg`];

											Mug.secs = secs;

											Quo.fileMug = true;

											Quo.secs = secs;

											Tools.Sql.places([`mugs`, Mug, Raw.mugs[1][Pulls.md], (Raw) => Arg[1].end(JSON.stringify(Quo))]);
							
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
						});
					}
				}
			});
		}
	}

}

module.exports = {
	
	Call: (Arg) => new Route().Call(Arg)
}  