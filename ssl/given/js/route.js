`use strict`;

class Route {

	constructor () {

		this.State = [];
	}

	getState () {

    	let url = (`./${window.location}`).replace(`//`, `/`).replace(/%(..)/g, function (match, hex) {
      		return String.fromCharCode(parseInt(hex, 16))
    	});

    	this.State = url;

    	this.State = url.split(`/`);
	}

	Call () {

		View.pop();

		this.getState();

		let State = this.State;

		if (State.length === 4 && State[3] === ``) {

			let Puts = Tools.pull([
				`/json/web`, {
					pull: `app`
				}]);

			Puts.onload = () => {

				Clients.instance = Tools.coats([`app`, new Date().valueOf()]);

				let secs = new Date().valueOf();

				io().emit(`app`, [secs]);

				io().on(`app`, App => {

					if (App.secs !== secs) return;

					if (Clients.mug) {

						io().emit(`wallet`, [Tools.typen(Clients.mug)[0], new Date().valueOf()]);

						io().on(`wallet`, Wallet => {

							if (Wallet.mug === Tools.typen(Clients.mug)[0]) {

								Wallet.wallet[2] = [Wallet.wallet[0][0] - Wallet.wallet[0][1], Wallet.wallet[1][0] - Wallet.wallet[1][1]]

								Clients.wallet = Tools.coats(Wallet.wallet);

								View.DOM([`main`, [Models.main()]]);
							}

						});
					}

					else View.DOM([`main`, [Models.main()]]);
				});

				//Events.app();
			}
		}

		else if (this.State[3] === `mugs`) {

    		if (State[4] && (!State[5] && !View.slim(State[5]))) {

			  	let Pull = Tools.pull([`/json/web/`, {
				  	md: State[4].split(`-`)[0],
				  	pull: `fileState`,
				  	secs: State[4].split(`-`)[1]}]);

			  	Pull.onload = () => {

				  	let Pulls = JSON.parse(Pull.response);

				  	if (Pulls.fileState) {

    	      			document.title = `joltquid - profile`;

				    	View.DOM([`div`, [Models.holdMug]]);

						if (document.querySelector(`#file`)) {

							Events.listen([document.querySelector(`#file`), `change`, S => {
				
								S.stopImmediatePropagation();

								Tools.allocateMug(S.target.files, (Raw) => {

									let File = Tools.jpeg([`/json/web/`, State[4].split(`-`)[0], Raw]);
						
									File.onload = () => {
							
										let Pulls = JSON.parse(Pull.response);
							
										if (!Pulls.secs) return;
									}

								});
								
							}]);

						}
				  	}
				}
    		}
    	}
  	}
}

Route = new Route();