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

          if (State[1] === `json`) {

            if (State[2] === `gradle`) {

              const VER = "202201271639";

              let Quo = {build: VER};

              if (Pulls.build && Pulls.build === VER)  {

                if (Pulls.pull === `app`) {

                  Quo.pull = `app`;
                }

                else if (Pulls.pull === `pollMug`) {

                  /*let Ppl = {};

                  Data.Ppl[0].forEach(P => {

                    if (P.mail === Pulls.polls[0]) Ppl = P;
                  });

                  if (Ppl.mail) return;

                  let Stamp = new Date().valueOf();
          
            new Sql().to([`u`, {
              json: JSON.stringify({
                alt: `${Vals[2]} ${Vals[3]}`,
                ava: false,
                full: `${Vals[2]} ${Vals[3]}`,
                lock: crypto.createHash(`md5`).update(Vals[4], `utf8`).digest(`hex`),
                log: Stamp,
                mail: Vals[0],
                mobile: Vals[1],
                md: crypto.createHash(`md5`).update(`${Stamp}`, `utf8`).digest(`hex`),
                mug: false,
                pass: crypto.createHash(`md5`).update(Vals[4], `utf8`).digest(`hex`),
                secs: Stamp,
                sum: crypto.createHash(`md5`).update(`${Stamp}`, `utf8`).digest(`hex`)})}], (A, B, C) => {

              this.Stack[3].end(JSON.stringify({MD: crypto.createHash(`md5`).update(`${Stamp}`, `utf8`).digest(`hex`)}));
            });*/

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