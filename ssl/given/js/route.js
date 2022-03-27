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

					Clients.quo = Tools.coats(App.quo);

					Clients.axis = Tools.coats(App.axis.sort((A, B) => {return A[0] - B[0]}));

					if (Clients.mug) {

						io().emit(`wallet`, [Tools.typen(Clients.mug)[0], new Date().valueOf()]);

						io().on(`wallet`, Wallet => {

							if (Wallet.mug === Tools.typen(Clients.mug)[0]) {

								Wallet.wallet[2] = [Wallet.wallet[0][0] - Wallet.wallet[0][1], Wallet.wallet[1][0] - Wallet.wallet[1][1]];

								Clients.wallet = Tools.coats(Wallet.wallet);

								View.DOM([`main`, [Models.main()]]);

								if (document.querySelector(`#coin`)) {

									View.pop();

									View.DOM([`#coin`, [Models.axis([Tools.typen(Clients.quo).btc[1][5], document.querySelector(`#coin`).clientWidth - 36])]])
								}
							}

						});
					}

					else {

						View.DOM([`main`, [Models.main()]]);

						Events.slotin();

						if (document.querySelector(`#coin`)) {

							View.pop();

							View.DOM([`#coin`, [Models.axis([Tools.typen(Clients.quo).btc[1][5], document.querySelector(`#coin`).clientWidth - 36])]])
						}
					}
				});
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

    	else if (this.State[3] === `wallet`) {

    		if (!Clients.mug) {

    			history.pushState(``, ``, `/`);

    			Route.Call();
    		}

    		else if (!State[4] && !Tools.slim[State[4]] && Clients.mug) {

				io().emit(`wallet`, [Tools.typen(Clients.mug)[0], new Date().valueOf()]);

				io().on(`wallet`, Wallet => {

					if (Wallet.mug === Tools.typen(Clients.mug)[0]) {

						Clients.vaults = Tools.coats(Wallet.vaults);

    					View.DOM([`main`, [Models.wallet()]]);

    					Events.wallet();
    				}
    			});
    		}
    	}
  	}
}

Route = new Route();