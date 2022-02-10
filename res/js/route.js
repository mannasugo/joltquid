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

		this.getState();

		let State = this.State;

		if (this.State[3] === `mugs`) {

    	if (State[4] && (!State[5] && !View.slim(State[5]))) {

			  let Pull = Tools.pull([`/json/web/`, {
			  	md: State[4].split(`-`)[0],
				  pull: `fileState`,
				  secs: State[4].split(`-`)[1]}]);

			  Pull.onload = () => {

				  let Pulls = JSON.parse(Pull.response);

				  if (Pulls.fileState) {

    	      document.title = `joltQUID | profiles`;

				    View.DOM([`main`, [Models.ModelOpenings()]]);
				  }
				}
    	}
    }
  }
}