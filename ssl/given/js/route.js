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
					mug: (Clients.mug) ? Tools.typen(Clients.mug)[0]: false,
					pull: `app`
				}]);

			Puts.onload = () => {

				let Web = JSON.parse(Puts.response);

				Clients.instance = Tools.coats([`app`, new Date().valueOf()]);

				Clients.quo = Tools.coats(Web.quo);

				Clients.axis = Tools.coats(Web.axis.sort((A, B) => {return A[0] - B[0]}));

				if (Clients.mug) {

					//Web.wallet[3] = [Web.wallet[2][0], Web.wallet[2][1]];

					Web.wallet[2] = [Web.wallet[0][0] - Web.wallet[0][1], Web.wallet[1][0] - Web.wallet[1][1]];

					Clients.wallet = Tools.coats(Web.wallet);

					Clients.vault = parseFloat(Web.wallet[3][0] - Web.wallet[3][1]);

					View.DOM([`div`, [Models.main()]]);

					Events.mains();

    				View.pop();

    				View.DOM([`#buyline`, [Models.buyline()]]);

    				Events.reals();

								/**
								if (document.querySelector(`#coin`)) {

									View.pop();

									View.DOM([`#coin`, [Models.axis([Tools.typen(Clients.quo).btc[1][5], document.querySelector(`#coin`).clientWidth - 36, `1H`])]])
								}

								Events.details();

								Events.pitReals()
								**/
				}

				else {

					View.DOM([`div`, [Models.main()]]);

					Events.slotin();

					Events.mains();

    				View.pop();

    				View.DOM([`#buyline`, [Models.buyline()]]);

    				Events.reals();

						/**
						if (document.querySelector(`#coin`)) {

							View.pop();

							View.DOM([`#coin`, [Models.axis([Tools.typen(Clients.quo).btc[1][5], document.querySelector(`#coin`).clientWidth - 36, `1H`])]]);

							Events.details()
						}

						Events.pitReals();
						**/
				}
			}
		}

    	else if (this.State[3] === `assets`) {

    		if (!Clients.mug) {

    			history.pushState(``, ``, `/`);

    			Route.Call();
    		}

    		else if (!State[4] && !Tools.slim[State[4]] && Clients.mug) {

				let Puts = Tools.pull([
					`/json/web/`, {
						mug: Tools.typen(Clients.mug)[0],
						pull: `assets`}]);

				Puts.onload = () => {

					let Web = JSON.parse(Puts.response);

					if (Web && Web.mug) {

						Clients.pitmoves = Tools.coats(Web.pitmoves);

						Clients.axis = Tools.coats(Web.axis.sort((A, B) => {return A[0] - B[0]}));

						Clients.vault = parseFloat(Web.wallet[3][0] - Web.wallet[3][1]);

						Clients.wallet = Tools.coats(Web.wallet);

    					View.DOM([`main`, [Models.asset()]]);

    					View.pop();

    					View.DOM([`#coinline`, [Models.coinline()]]);

    					Events.holdReals();

					}
				}
			}
		}

    	else if (this.State[3] === `balance`) {

    		if (!Clients.mug) {

    			history.pushState(``, ``, `/`);

    			Route.Call();
    		}

    		else if (!State[4] && !Tools.slim[State[4]] && Clients.mug) {

				let Puts = Tools.pull([
					`/json/web/`, {
						mug: Tools.typen(Clients.mug)[0],
						pull: `balance`}]);

				Puts.onload = () => {

					let Web = JSON.parse(Puts.response);

					if (Web && Web.mug) {

						Clients.quo = Tools.coats(Web.quo);

						Clients.axis = Tools.coats(Web.axis.sort((A, B) => {return A[0] - B[0]}));

						Web.wallet[2] = [Web.wallet[0][0] - Web.wallet[0][1], Web.wallet[1][0] - Web.wallet[1][1]];

						Clients.wallet = Tools.coats(Web.wallet);

						Clients.vault = parseFloat(Web.wallet[3][0] - Web.wallet[3][1]);

						Clients.trail = Tools.coats(Web.trail);

    	      			document.title = `Tokens & Hyper-ledger`;

				    	View.DOM([`div`, [Models.holds()]]);

				    	Events.holdRunnable();

					}
				}
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

    	else if (this.State[3] === `pit`) {

    		if (!Clients.mug) {

    			history.pushState(``, ``, `/`);

    			Route.Call();
    		}

    		else if (!State[4] && !Tools.slim[State[4]] && Clients.mug) {

				let Puts = Tools.pull([
					`/json/web/`, {
						mug: Tools.typen(Clients.mug)[0],
						pull: `pit`}]);

				Puts.onload = () => {

					let Web = JSON.parse(Puts.response);

					if (Web && Web.mug) {

						Clients.place = Tools.coats([`buy`, `market`]);

						Clients.pitmoves = Tools.coats(Web.pitmoves);

						Clients.axis = Tools.coats(Web.axis.sort((A, B) => {return A[0] - B[0]}));

						Clients.wallet = Tools.coats(Web.wallet);

    					View.DOM([`main`, [Models.pit()]]);

    					View.pop();

    					if (Tools.typen(Clients.wallet)[2][1] > 0) View.DOM([`#pitaxis`, [Models.pitaxis()]]);

    					Events.pitalias();

    					Events.pitplace();

    					Events.pitReals();

    					Events.pitSide();

    					Events.pitSort();

    					Events.pitValue();
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

    			let secs = new Date().valueOf();

				io().emit(`wallet`, [Tools.typen(Clients.mug)[0], secs]);

				io().on(`wallet`, Wallet => {

					if (Wallet.secs === secs && Wallet.mug === Tools.typen(Clients.mug)[0]) {

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