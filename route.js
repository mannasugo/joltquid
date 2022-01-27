const FileSys = require(`fs`);

//const Tools = require(`./tools`);

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

        let File = FileSys.createReadStream(`res/svg/202201262123.svg`);

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

    else if (Arg[0].method === `POST`) {

      let blob = new Buffer.alloc(+Arg[0].headers[`content-length`]);

      let Pull = ``;

      let allocate = 0;

      Arg[0].on(`data`, (Data) => {

        Data.copy(blob, allocate);

        allocate += Data.length;

        Pull += Data;

      }).on(`end`, () => {

        if (Pull[0] === `{`) {

          Arg[1].setHeader(`Content-Type`, `application/json`);

          let Pulls = JSON.parse(Pull);

          if (State[1] === `pulls`) {

            if (State[2] === `gradle`) {

              const VER = "202201271639";

              let Quo = {build: VER};

              if (Pulls.build && Pulls.build === VER)  {

                if (Pulls.pull === `app`) {


                }
              } 

              Arg[1].end(JSON.stringify(Quo));
          
            }
          }
        }
      });
    }
  }
}

module.exports = {

  Call: (Arg) => new Route().Call(Arg)
}  