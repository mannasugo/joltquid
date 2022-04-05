`use strict`;

class Events {

	listen (Arg) { 

		(Arg[0].addEventListener) ? Arg[0].addEventListener(Arg[1], Arg[2]) : Arg[0].attachEvent(`on` + Arg[1], Arg[2]);
	}

	getSource (Arg) {

		if (Arg.target) return Arg.target;
	}

	mugin () {

		this.listen([document.querySelector(`#signin`), `click`, S => {

			let Values = [
				(!Tools.slim(document.querySelector(`#email`).value))? false: Tools.slim(document.querySelector(`#email`).value),
				(!Tools.slim(document.querySelector(`#lock`).value))? false: Tools.slim(document.querySelector(`#lock`).value)];

			if (Values[0] === false || Values[1] === false) return;

			let Puts = Tools.pull([`/json/web/`, {pull: `mugin`, puts : Values}]);

			Values = [];

			View.pop();

			View.DOM([`span`, [Models.splash]]);

			Puts.onload = () => {

				let Pull = JSON.parse(Puts.response);

				if (Pull && Pull.mug) {

					Clients.mug = Tools.coats(Pull.mug);

					window.location = ``;

					/**
					history.pushState(``, ``, `/`);

					Route.Call();
					**/
				}
			}

		}]);

	}

	mugup () {

		this.listen([document.querySelector(`#signup`), `click`, S => {

			let Values = [
				(!Tools.slim(document.querySelector(`#email`).value))? false: Tools.slim(document.querySelector(`#email`).value),
				(!Tools.slim(document.querySelector(`#family`).value))? false: Tools.slim(document.querySelector(`#family`).value),
				(!Tools.slim(document.querySelector(`#lock`).value))? false: Tools.slim(document.querySelector(`#lock`).value),
				(!Tools.slim(document.querySelector(`#middle`).value))? false: Tools.slim(document.querySelector(`#middle`).value)];

			if (Values[0] === false || Values[1] === false || Values[2] === false || Values[3] === false) return;

			let Puts = Tools.pull([`/json/web/`, {pull: `mugup`, puts : Values}]);

			Values = [];

			View.pop();

			View.DOM([`span`, [Models.splash]]);

			Puts.onload = () => {

				let Pull = JSON.parse(Puts.response);

				if (Pull && Pull.mug) {

					Clients.mug = Tools.coats(Pull.mug);

					window.location = ``;

					/**
					history.pushState(``, ``, `/`);

					Route.Call();
					**/
				}
			}

		}]);

	}

	pitalias () {

		this.listen([document.querySelector(`#amount`), `keyup`, S => {

			let Via = this.getSource(S);

			let omega = Via.value[Via.value.length - 1];

			let Place = Tools.typen(Clients.place);

			if (omega === `.` && Via.value.indexOf(`.`) !== Via.value.length - 1) Via.value = Via.value.substr(0, Via.value.length - 1);

			else if (!parseInt(omega) && parseInt(omega) !== 0 && omega !== `.`) Via.value = Via.value.substr(0, Via.value.length - 1);

			if (Place[0] === `buy`) {

				if (!parseFloat(Via.value)*Tools.typen(Clients.quo).btc[0] > 0) {

					document.querySelector(`#place`).style.opacity = .3

					document.querySelector(`#pitalias`).innerHTML = `0.00 USD`
				}

				else if (parseFloat(Via.value)*Tools.typen(Clients.quo).btc[0] > 0) {

					if (parseFloat(Via.value)*Tools.typen(Clients.quo).btc[0] >= 3) document.querySelector(`#place`).style.opacity = 1;

					else document.querySelector(`#place`).style.opacity = .3

					document.querySelector(`#pitalias`).innerHTML = `${(parseFloat(Via.value)*Tools.typen(Clients.quo).btc[0]).toFixed(2)} USD`;
				}
			}

			if (Place[0] === `sell`) {

				if (parseFloat(Via.value) > 0) {

					if (parseFloat(Via.value) <= Tools.typen(Clients.wallet)[2][1]) document.querySelector(`#place`).style.opacity = 1;

					else document.querySelector(`#place`).style.opacity = .3

					document.querySelector(`#pitalias`).innerHTML = `${(parseFloat(Via.value)*Tools.typen(Clients.quo).btc[0]).toFixed(2)} USD`;
				}

				else {

					document.querySelector(`#place`).style.opacity = .3

					document.querySelector(`#pitalias`).innerHTML = `0.00 USD`
				}
			}
		}]);
	}

	pitplace () {

		this.listen([document.querySelector(`#place`), `click`, S => {

			let Role = Tools.typen(Clients.place);

			let vault = Tools.typen(Clients.wallet)[2][0],

			place = parseFloat(document.querySelector(`#amount`).value);

			let Meet = [0, `buy-pit`];

			let Vault = Tools.typen(Clients.wallet)[2];

			if (Role[0] === `buy` && Role[1] === `market`) {

				if (place > 0 && vault >= place*Tools.typen(Clients.quo).btc[0] && vault >= 3) Meet[0] = 1;
			}

			if (Role[0] === `sell` && Role[1] === `market`) {

				if (place > 0 && Vault[1] >= place) Meet = [1, `sell-pit`];
			}

			if (Meet[0] === 1) {

				document.querySelector(`#amount`).value = `0.00BTC`;

				let Puts = Tools.pull([
					`/json/web/`, {
						mug: Tools.typen(Clients.mug)[0],
						pull: Meet[1],
						puts : place}]);

				View.pop();

				View.DOM([`span`, [Models.splash]]);

				Puts.onload = () => {

					let Web = JSON.parse(Puts.response);

					if (Web && Web.mug) window.location = `/pit`;
				}
			}
		}]);
	}

	pitReals () {

		io().on(`pit`, Pit => {

			let Quo = Tools.typen(Clients.quo);

			let last = Quo.btc[0];

			Quo.btc = Pit.quo.btc;

			Clients.quo = Tools.coats(Quo);

			Clients.axis = Tools.coats((Pit.axis).sort((A, B) => {return A[0] - B[0]}));

			if (last !== Quo.btc[0]) {

    			View.pop();

    			if (Tools.typen(Clients.wallet)[2][1] > 0) View.DOM([`#pitaxis`, [Models.pitaxis()]]);

    			this.pitalias();

    			this.pitplace();

			}
		});
	}

	pitSide () {

		document.querySelectorAll(`.pitside`).forEach(Move => {

			this.listen([Move, `click`, Plot => {

				let Place = Tools.typen(Clients.place);

				document.querySelectorAll(`.pitside`).forEach(Move => {

					Move.style.opacity = .3;

					Move.style.background = `none`;

					Move.style.color = `#1bd401`;
				});

				Plot = this.getSource(Plot);

				if (Plot.innerHTML === `Sell`) {

					Plot.style.opacity = 1;

					Plot.style.background = `#d40101`;	

					document.querySelector(`#place`).style.background = `#d40101`;

					Plot.style.color = `#fff`;

					Place[0] = `sell`;
				}

				else if (Plot.innerHTML === `Buy`) {

					Plot.style.opacity = 1;

					Plot.style.background = `#1bd401`;	

					document.querySelector(`#place`).style.background = `#1bd401`;

					Plot.style.color = `#fff`;

					Place[0] = `buy`;
				}

				Clients.place = Tools.coats(Place);
			}]);
		});		
	}

	slotin () {

		this.listen([document.querySelector(`#mugin`), `click`, Plot => {

			View.pop();

			Clients.instance = Tools.coats([`mugin`, new Date().valueOf()]);

			View.DOM([`span`, [Models.mugslot()]]);

			this.slotup();

			this.mugin();
		}]);
	}

	slotup () {

		this.listen([document.querySelector(`#mugup`), `click`, Plot => {

			View.pop();

			Clients.instance = Tools.coats([`mugup`, new Date().valueOf()]);

			View.DOM([`span`, [Models.mugslot()]]);

			this.slotin();

			this.mugup();
		}]);

	}

	details () {

		document.querySelectorAll(`#reals > span`).forEach(Real => {

			this.listen([Real, `click`, Plot => {

				Plot = this.getSource(Plot);

				let role = Plot.parentNode.getAttribute(`role`);

					let Span = [`All`, `1Y`, `1M`, `1W`, `1D`, `1H`];

					View.pop();

				if (role === `last-btc`) {

					View.DOM([`#last-btc`, [Models.real([Tools.typen(Clients.quo).btc[1][Span.indexOf(Plot.innerHTML)], `USD`, `last-btc`, Plot.innerHTML])]]);
					
					this.details();
				}

				if (role === `daily-btc`) {

					let Puts = Tools.pull([
						`/json/web/`, {
							pull: `btc`, 
							puts : Span.indexOf(Plot.innerHTML)}]);

					Puts.onload = () => {

						let Web = JSON.parse(Puts.response);

						if (Web && Web.axis) {

							Clients.axis = Tools.coats(Web.axis.sort((A, B) => {return A[0] - B[0]}));

							View.DOM([`#coin`, [Models.axis([Tools.typen(Clients.quo).btc[1][Span.indexOf(Plot.innerHTML)], document.querySelector(`#coin`).clientWidth - 36, Plot.innerHTML])]])

							this.details();
						}
					}
				}
			}]);
		});
	}

	wallet () {

		this.listen([document.querySelector(`#vault`), `click`, S => {

			let Values = [
				(!Tools.slim(document.querySelector(`#dollars`).value))? false: Tools.slim(document.querySelector(`#dollars`).value),
				(!Tools.slim(document.querySelector(`#mobile`).value))? false: Tools.slim(document.querySelector(`#mobile`).value)
			];

			if (typeof parseFloat(Values[0]) !== `number` || typeof parseInt(Values[1]) !== `number` || parseFloat(Values[0]) < 3 || Values[0] === false || Values[1] === false) return;

			let Puts = Tools.pull([
					`/json/web/`, {
						mug: Tools.typen(Clients.mug)[0],
						pull: `vault`, 
						puts : Values}]);

			View.pop();

			View.DOM([`span`, [Models.splash]]);

			Puts.onload = () => {

				let Pull = JSON.parse(Puts.response);

				if (Pull && Pull.mug) window.location = `/pit`;
			}
		}]);
	}
}

Events = new Events();