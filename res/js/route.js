`use strict`;

class Route {

	constructor () {

		super();

		this.State = [];
	}

	Stack () {

    let url = (`./${window.location}`).replace(`//`, `/`).replace(/%(..)/g, function (match, hex) {
      return String.fromCharCode(parseInt(hex, 16))
    });

    this.State = url;

    return this.State.split(`/`);
	}

	Call () {

		this.Stack();

		if (this.State.length === 4 && this.State[3] === ``) this.v3();
  }
}