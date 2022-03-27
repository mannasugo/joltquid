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

					history.pushState(``, ``, `/`);

					Route.Call();
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

					history.pushState(``, ``, `/`);

					Route.Call();
				}
			}

		}]);

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

					if (Pull && Pull.mug) {

						history.pushState(``, ``, `/u`);

						Route.Call();
					}

					else this.mugify();
			}

		}]);

	}
}

Events = new Events();