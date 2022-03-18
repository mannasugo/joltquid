`use strict`;

class Events {

	listen (Arg) { 

		(Arg[0].addEventListener) ? Arg[0].addEventListener(Arg[1], Arg[2]) : Arg[0].attachEvent(`on` + Arg[1], Arg[2]);
	}

	getSource (Arg) {

		if (Arg.target) return Arg.target;
	}

	app () {

		if (!document.querySelector(`#mug`)) return;

		this.listen([document.querySelector(`#mug`), `click`, Plot => {

			if (Clients.mug) {

				//history.pushState(``, ``, `/`); Route.Call();
			}

			else this.mugify();
		}]);
	}

	mugify () {

		Clients.instance = Tools.coats([`mugin`, new Date().valueOf()]);

		View.DOM([`span`, [Models.mugslot()]]);

		if (document.querySelector(`#mugup`)) {

			this.listen([document.querySelector(`#signin`), `click`, S => {

				let Values = [
					(!Tools.slim(document.querySelector(`#email`).value))? false: Tools.slim(document.querySelector(`#email`).value),
					(!Tools.slim(document.querySelector(`#lock`).value))? false: Tools.slim(document.querySelector(`#lock`).value)
				];

				if (Values[0] === false || Values[1] === false) return;

				let Puts = Tools.pull([`/json/web/`, {pull: `mugin`, puts : Values}]);

				View.pop();

				View.DOM([`span`, [Models.splash]]);

				Puts.onload = () => {

					let Pull = JSON.parse(Puts.response);

					if (Pull && Pull.mug) {

						Clients.mug = Tools.coats(Puts.mug);

						history.pushState(``, ``, `/`);

						Route.Call();
					}

					else this.mugify();
				}

			}]);

				this.listen([document.querySelector(`#mugup`), `click`, Plot => {

					View.pop();

					Clients.instance = Tools.coats([`mugup`, new Date().valueOf()]);

					View.DOM([`span`, [Models.mugslot()]]);

					if (document.querySelector(`#mugin`)) {

						this.listen([document.querySelector(`#mugin`), `click`, Plot => {

							View.pop();

							this.mugify();

						}]);
					}

				}]);
			}
		}
}

Events = new Events();