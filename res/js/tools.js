`use strict`;

class Tools {

  constructor () {

    this.call = new XMLHttpRequest;
  }

	pull (Arg) {

    this.call.open(`POST`, Arg[0], true);

    this.call.setRequestHeader(`Content-Type`, `application/json`);

    this.call.send(JSON.stringify(Arg[1]));

    return this.call;
  }

  jpeg (Arg) {

    this.call.open(`POST`, Arg[0], true);

    this.call.setRequestHeader(`Content-Type`, `image/jpeg`);

    this.call.setRequestHeader(`md`, Arg[1]);

    this.call.send(Arg[2]);

    return this.call;

  }

}

Tools = new Tools();