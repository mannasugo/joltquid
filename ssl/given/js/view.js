`use strict`;

class View {

  	constructor() {

		this.appendString = ``;
  	}

	ModelDOM(Model) {

		if (typeof Model !== `object`) return;

		Model.forEach(Obj => {

			let a = Obj[0], z, last;

			z = a; 

	  		if (a === `html`) a = `!doctype html><html`;

	  		this.appendString += `<` + a;
	  		
	  		for (let meta in Obj[1]) {

	  			let value = ``;

	  			if (meta === `style`) {

	  				for (let style in Obj[1][meta]) {

	  					value += `${style}:${Obj[1][meta][style]};`
	  				}
	  			}

	  			else value = Obj[1][meta];

	  			this.appendString += ` ${meta}='${value}'`;
	  		}

	  		this.appendString += `>`;
	  		
	  		if (Obj[2]) {

	  			if (typeof Obj[2] === `object`) this.ModelDOM(Obj[2]);

	  			else if (typeof Obj[2] === `string`) this.appendString += Obj[2];
	  		}

	  		let Queer = [`img`, `input`, `meta`];

	  		if (!Queer.indexOf(z) > -1) this.appendString += `</` + z + `>`;
		});

		return Tools.plains(this.appendString);
  	}

  	DOM(Arg) {

		document.querySelector(Arg[0]).innerHTML = this.ModelDOM(Arg[1]);
  	}

  	pop () {this.appendString = ``};
}

let Models = {

   	asset: function () {

  		let Axis = Tools.typen(Clients.quo).btc;

  		let vault = (((Tools.typen(Clients.vault)*.25)/37515)*Axis[0] + Tools.typen(Clients.vault)*.75).toFixed(2);

  		return [`main`, {class: `_tY0`, style: {height: `${100}px`}}, 
  			[
  				[`div`, {class: `_-tY`}, 
  					[[`div`, {class: `_aXz`, style: {padding: `${0} ${16}px`}}, 
  						[
  							[`div`, {class: `_-Xg _gxM _geQ`}, 
  								[
  									[`a`, {class: `-_tX v202201180941`, style: {[`min-width`]: `${32}px`, height: `${32}px`}, href: `/`}, ``], 
  									[`span`, {id: `vault`, class: `_aA6 _tXx`, style: {
  										[`border-left`]: `${1}px solid #d5d5d5`,
  											margin: `${0} ${7}px`,
  											padding: `${0} ${14}px`,
  											[`font-size`]: `${12}px`,
  											color: `#47008c`,
  											//overflow: `hidden`,
  											[`font-family`]: `geometria`,
  											//[`text-overflow`]: `ellipsis`,
  											[`white-space`]: `nowrap`}}, `${vault} USD`], 
  									[`span`, {id: `coins`, class: `_tXx`, style: {
  											color: `#feef11`, 
  											margin: `${1.5}px ${0} ${0}px ${-8}px`, 
  											[`font-size`]: `${12}px`}}, (Clients.wallet && Tools.typen(Clients.wallet)[2][1] > 0)? `+BTC`: ``]]],
  							[`div`, {class: `_gZz`}, 
  								[this.wallets]]]]]], 
  				[`section`, {id: `wallet`, style: {padding: `${0} ${24}px`, [`max-width`]: `${1000}px`, width: `${100}%`, margin: `${90}px auto`}}, 
  					[
  						[`div`, {class: `_wrap_202203262208`}, 
  							[
  								[`div`, {id: `coinline`, style: {width: `${100}%`}}],
  								/*[`div`, {id: `coinmoves`}]*/]],
  						[`div`, {id: `assets`}, []], 
  						[`div`, {id: `moves`, style: {margin: `${30}px ${0}`}}, []]]]]]; //positions
  	},

  	bitpit: function () {

  		let Pit = [Tools.typen(Clients.axis), []];

  		let Quo = Tools.typen(Clients.quo).btc;

  		Pit[0].sort((A, B) => {return B[0] - A[0]});

  		Pit[0].slice(0, 10).forEach((Value, i) => {

  			Pit[1].push([`div`, {class: `_gxM`}, 
  				[
  					[`span`, {style: {
  						[`font-family`]: `geometria`,
  						[`font-size`]: `${10}px`,
  						color: ((Value[1] - Pit[0][i + 1][1]) >= 0) ? `#1bd401`: `#d40101`}}, `${Value[1]}`],
  					[`div`, {class: `_gZz`, style: {
  						opacity: .3,
  						[`font-size`]: `${10}px`, 
  						[`font-family`]: `geometria`}}, `${Tools.logs(Value[0])}`]]]);

  			Pit[2] = Value[1]
  		});

  		return Pit[1]
  	},

  	buyline: function () {

  		let Pit = [[], [], [], ``, []];

  		let Axis = Tools.typen(Clients.quo).btc[1][5];

  		let Span = [document.querySelector(`#buyline`).clientWidth, 200];

  		let Y = [Axis[2], Axis[3]];

		let y = Y[1] - Y[0];

  		let AXIS = [Tools.typen(Clients.axis)];

		let X = [AXIS[0][AXIS[0].length - 1][0], AXIS[0][0][0]];

			let x = AXIS[0][AXIS[0].length - 1][0] - AXIS[0][0][0];

			AXIS[0].forEach(Vault => {

				Pit[3] += `${(((Vault[0] - AXIS[0][0][0])/x)*Span[0]) + 0} ${(y === 0)? 50: ((Vault[1] - Y[1])/y)*(-185)} `;
			});

			let Value = Tools.typen(Clients.axis).sort((A, B) => {return B[1] - A[1]});

			let Feats = [Value[Value.length - 1], Value[0]];

			Feats.forEach(Feat => {

				let XY = [(((Feat[0] - AXIS[0][0][0])/x)*Span[0]), ((Feat[1] - Y[1])/y)*(-185)];

				(XY[1] < 5)? XY[1] = 7.5: XY[1];

				(XY[1] > 195)? XY[1] = 191: XY[1];

				(XY[0] < 5)? XY[0] = 6: XY[0] = XY[0] + 2.5;

				(XY[0] > Span[0] - 75)? XY[0] = Span[0] - 70: XY[0] = XY[0] + 2.5;

				Pit[4].push(
					[`text`, {x: XY[0], y: XY[1], fill: `#fff`, style: {
						[`font-family`]: `geometria`,
						[`font-size`]: `${9}px`}}, `${(Feat[1]).toFixed(0)}`]);
			});		

  			Pit[2] = 
				[`svg`, {height: `${200}px`, style: {[`margin-top`]: `${30}px`}}, 
					[
						[`path`, {
							opacity: .75,
							stroke: `#1bd401`, 
							[`stroke-width`]: 1, 
							fill: `none`, d: `M15 ${((37515 - Y[1])/y)*(-175) + 5.5} ${Span[0]} ${((37515 - Y[1])/y)*(-175) + 7.5}`}], 
						[`path`, {
							opacity: 1,
							stroke: `#5841d8`, 
							[`stroke-width`]: 1, 
							fill: `none`, d: `M${Pit[3]}`}], 
						[`g`, {}, Pit[4]]]];

  		return [`div`, {}, 
  			[
  				[`div`, {class: `_gxM`}, 
  					[
  						[`span`, {style: {[`font-size`]: `${12}px`}}, `Bitcoin This Hour`]]],
  				[`div`, {class: `_gxM`}, 
  					[
  						[`span`, {style: {
  							[`font-family`]: `geometria`,
  							[`font-size`]: `${12}px`,
  							[`font-weight`]: 600}}, `${(parseFloat(Tools.typen(Clients.quo).btc[0])).toFixed(1)} USD`],
  						Pit[1]]],
  				Pit[2]]];
  	},

  	coinline: function () {

  		let Pit = [[], [], [], ``, []];

  		let Hold = [ 
  			((Tools.typen(Clients.vault)*.25)/37515)*Tools.typen(Clients.quo).btc[0]];

  		let Axis = Tools.typen(Clients.quo).btc[1][5];

  		let pit = ((Tools.typen(Clients.vault)*.25)/37515);

  		let Span = [document.querySelector(`#coinline`).clientWidth, 200];

  		let Y = [Axis[2], Axis[3]];

		let y = Y[1] - Y[0];

  		//if ((new Date().valueOf() - Pit[0][0].secs) > 3600000) {

  			let AXIS = [Tools.typen(Clients.axis)];

			let X = [AXIS[0][AXIS[0].length - 1][0], AXIS[0][0][0]];

			let x = AXIS[0][AXIS[0].length - 1][0] - AXIS[0][0][0];

			AXIS[0].forEach(Vault => {

				Pit[3] += `${(((Vault[0] - AXIS[0][0][0])/x)*Span[0]) + 0} ${(y === 0)? 50: ((Vault[1] - Y[1])/y)*(-185)} `;
			});

			let Value = Tools.typen(Clients.axis).sort((A, B) => {return B[1] - A[1]});

			let Feats = [Value[Value.length - 1], Value[0]];

			Feats.forEach(Feat => {

				let XY = [(((Feat[0] - AXIS[0][0][0])/x)*Span[0]), ((Feat[1] - Y[1])/y)*(-185)];

				(XY[1] < 5)? XY[1] = 7.5: XY[1];

				(XY[1] > 195)? XY[1] = 191: XY[1];

				(XY[0] < 5)? XY[0] = 6: XY[0] = XY[0] + 2.5;

				(XY[0] > Span[0] - 75)? XY[0] = Span[0] - 70: XY[0] = XY[0] + 2.5;

				Pit[4].push(
					[`text`, {x: XY[0], y: XY[1], fill: `#000`, style: {
						[`font-family`]: `geometria`,
						[`font-size`]: `${9}px`}}, `${(Feat[1]*pit).toFixed(3)} USD`]);
			});

  			Pit[1] = [`div`, {class: `_eYG`}, 
  				[[`span`, {style: {
  					color: (((Axis[1] - 37515)/Axis[1])*100 >= 0) ? `#1bd401`: `#d40101`,
  					[`font-family`]: `geometria`, 
  					[`font-size`]: `${11}px`}}, 
  					`${(((Axis[1] - 37515)/Axis[1])*100 >= 0) ? `+`: ``}${((pit*Axis[1]) - (pit*37515)).toFixed(2)} (${(((Axis[1] - 37515)/Axis[1])*100).toFixed(2)}%)`]]];

  			Pit[2] = 
				[`svg`, {height: `${200}px`, style: {[`margin-top`]: `${30}px`}}, 
					[
						[`path`, {
							opacity: .75,
							stroke: `#1bd401`, 
							[`stroke-width`]: 1, 
							fill: `none`, d: `M15 ${((37515 - Y[1])/y)*(-175) + 5.5} ${Span[0]} ${((37515 - Y[1])/y)*(-175) + 7.5}`}], 
						[`text`, {x: 0, y: ((37515 - Y[1])/y)*(-175) + 7.5, fill: `#a6a6a6`, style: {
							[`font-family`]: `geometria`,
							[`font-size`]: `${8}px`}}, `${(37515*pit).toFixed(3)}`], 
						[`path`, {
							opacity: 1,
							stroke: `#5841d8`, 
							[`stroke-width`]: 1, 
							fill: `none`, d: `M${Pit[3]}`}], 
						[`g`, {}, Pit[4]]]];
  		//}

  		return [`div`, {}, 
  			[
  				[`div`, {class: `_gxM`}, 
  					[
  						[`span`, {style: {[`font-size`]: `${12}px`}}, `Bitcoin Portfolio`],
  						[`div`, {class: `_gZz`}, [
  							[`span`, {style: {
  								[`text-decoration`]: `underline`,
  								color: `#feef11`, [`font-size`]: `${12}px`}}, `Principal`], 
  							[`span`, {style: {
  								margin: `${0} ${0} ${0} ${8}px`,
  								[`font-family`]: `geometria`,
  								[`font-size`]: `${12}px`}}, `${(Tools.typen(Clients.vault)*.25).toFixed(3)} USD`]]]]],
  				[`div`, {class: `_gxM`}, 
  					[
  						[`span`, {style: {
  							[`font-family`]: `geometria`,
  							[`font-size`]: `${12}px`,
  							[`font-weight`]: 600}}, `${(parseFloat(Hold[0])).toFixed(2)} USD`],
  						Pit[1]]],
  				Pit[2]]];
  	},

  	assets: function () {

		let Axis = Tools.typen(Clients.axis).sort((A, B) => {return B[0] - A[0]});

  		let Vault = [[], [], [Axis[0][1], Axis[Axis.length - 1][1]]];

  		Vault[0] = Tools.typen(Clients.wallet)[2];

  		if (Vault[0][0] > 0 || Vault[0][1] > 0) {

  			Vault[0] = [
  				[`USD`, Vault[0][0].toFixed(2), 1, 0], 
  				[`BTC`, Vault[0][1].toFixed(7), Tools.typen(Clients.quo).btc[0]], Vault[2][0] - Vault[2][1]];

  			Vault[0].forEach(Asset => {

  				if (Asset[1] > 0) {

  					Vault[1].push(
  						[`div`, {class: `asset _wrap_202203262208`, style: {
  							padding: `${12}px ${0}`, [`border-bottom`]: `${1}px solid #e8e8e8`}}, 
  							[
  								[`div`, {style: {width: `${20}%`}}, [[`a`, {href: `javascript:;`, style: {
  									[`font-family`]: `litera`,
  									[`font-size`]: `${12}px`}}, Asset[0]]]],
  								[`div`, {style: {width: `${35}%`}}, [[`span`, {}, `${Asset[1]}`]]],
  								[`div`, {style: {width: `${25}%`}}, [[`span`, {style: {
  									color: (Asset[3] >= 0) ? `#1bd401`: `#d40101`}}, `${Asset[2]}`]]],
  								[`div`, {style: {width: `${20}%`}}, [[`span`, {style: {
  									color: (Asset[3] >= 0) ? `#1bd401`: `#d40101`}}, `${(Asset[2]*Asset[1]).toFixed(2)}`]]]]]);
  				}
  			});

  			return [`div`, {style: {margin: `${30}px ${0} ${0}`}}, 
  				[
  					[`div`, {class: `_gxM _tXx`, style: {[`font-size`]: `${12}px`}}, `Assets`],
  					[`div`, {id: `pittile`, class: `_wrap_202203262208`, style: {
  						padding: `${24}px ${0} ${6}px`, [`border-bottom`]: `${1}px solid #e8e8e8`}}, 
  						[
  							[`div`, {style: {width: `${20}%`}}, [[`span`, {}, `asset`]]],
  							[`div`, {style: {width: `${35}%`}}, [[`span`, {}, `amount`]]],
  							[`div`, {style: {width: `${25}%`}}, [[`span`, {}, `price`]]],
  							[`div`, {style: {width: `${20}%`}}, [[`span`, {}, `value`]]]]], 
  				[`div`, {}, Vault[1]]]];
  		}

  		else return [];
  	}, 

	axis: function (Axis) {

		let AXIS = [Tools.typen(Clients.axis), ``, [], [], ``];

		let Y = [Axis[0][2], Axis[0][3]];

		let X = [AXIS[0][AXIS[0].length - 1][0], AXIS[0][0][0]];

		let x = AXIS[0][AXIS[0].length - 1][0] - AXIS[0][0][0],

		y = Y[1] - Y[0];

		AXIS[0].forEach(Vault => {

			AXIS[1] += `${(((Vault[0] - AXIS[0][0][0])/x)*Axis[1])} ${(y === 0)? 50: ((Vault[1] - Y[1])/y)*(-185)} `;
		});

		X.forEach(Span => {

			let Day = new Date(Span);

			if (x >= 3600000*24) AXIS[4] = `${Day.getMonth() + 1}/${Day.getDate()}`

			else if (x <= 3600000*24) AXIS[4] = `${(Day.getHours() > 9)? Day.getHours(): `0` + Day.getHours()}:${(Day.getMinutes() > 9)? Day.getMinutes(): `0` + Day.getMinutes()}`

			AXIS[2].push([`text`, {x: (((Span - AXIS[0][0][0])/x)*(Axis[1] - 12.25)), y: 200, fill: `#a6a6a6`, style: {
				//[`font-family`]: `geometria`,
				[`font-size`]: `${10}px`}}, AXIS[4]]);
		});

		let Value = Tools.typen(Clients.axis).sort((A, B) => {return B[1] - A[1]});

		let Feats = [Value[Value.length - 1], Value[0]];

		Feats.forEach(Feat => {

		let XY = [(((Feat[0] - AXIS[0][0][0])/x)*Axis[1]), ((Feat[1] - Y[1])/y)*(-185)];

				(XY[1] < 5)? XY[1] = 7.5: XY[1];

				(XY[1] > 195)? XY[1] = 191: XY[1];

				(XY[0] < 5)? XY[0] = 6: XY[0] = XY[0] + 2.5;

				(XY[0] > Axis[1] - 75)? XY[0] = Axis[1] - 70: XY[0] = XY[0] + 2.5;

				AXIS[3].push(
					[`text`, {x: XY[0], y: XY[1], fill: `#000`, style: {
						[`font-family`]: `geometria`,
						[`font-size`]: `${9}px`}}, `${(Feat[1]).toFixed(1)}`]);
			});

    	let Span = [[], [`1H`, `1D`, `1W`, `All`]];

    	Span[1].forEach((a) => {

    		Span[0].push([`span`, {id: `span`, style: {opacity: (a === Axis[2])? 1: .3, padding: `${0} ${7.5}px`}}, a]);
    	});

		return [
			`div`, {}, 
				[
  					[`div`, {class: `_gxM`}, 
  						[
  							[`span`, {class: `_tXx`, style: {
  								[`font-family`]: `geometria`,
  								[`font-size`]: `${12}px`}}, `${(Axis[0][1]).toFixed(2)} USD`], 
  							[`div`, {class: `_eYG`}, 
  								[[`span`, {class: `tXx`, style: {
  									color: (((Axis[0][1] - Axis[0][0])/Axis[0][1])*100 >= 0) ? `#1bd401`: `#d40101`,
  									[`font-family`]: `geometria`,
  									[`font-size`]: `${10}px`}}, `${(((Axis[0][1] - Axis[0][0])/Axis[0][1])*100 >= 0) ? `+`: ``}${(((Axis[0][1] - Axis[0][0])/Axis[0][1])*100).toFixed(2)}%`]]], 
  							[`div`, {id: `reals`, class: `_gZz`, role: `daily-btc`, style: {[`font-size`]: `${10}px`}}, 
  								Span[0]]]],
					[`svg`, {height: `${200}px`, style: {[`margin-top`]: `${30}px`}}, 
						[
							[`g`, {}, AXIS[2]],
							[`g`, {}, AXIS[3]],
							[`path`, {stroke: `#5841d8`, [`stroke-width`]: 1, fill: `none`, d: `M${AXIS[1]}`}]]]]];
	},

  	holdMug: [
  		`section`, {id: `mugs`, class: `_geQ _axZ`, style: {
  		width: `${100}%`,
  		[`max-width`]: `${600}px`,
  		[`font-size`]: `${13}px`}}, 
  			[[`div`, {class: `_aXZ`}, 
  				[
  					[`div`, {class: `_gZ`}, 
  						[[`div`, {class: `_gxM`, style: {
  							padding: `${16}px ${24}px`}}, 
  							[[`span`, {class: `_tXx`}, `provide avatar`]]]]], 
  					[`section`, {class: `_gZ`}, 
  						[[`div`, {}, 
  							[[`div`, {class: `_sZ2`}, 
  								[ //with `mutiple-child` format
  									[`div`, {class: `_sZ2`, style: {[`align-items`]: `center`, [`justify-content`]: `center`, height: `${200}px`}}, 
  										[[`img`, {id: `file-plane`, src: `/ssl/given/svg/mug2.svg`, style: {height: `${72}px`, width: `${72}px`}}]]], 
  									[`div`, {class: `_gxM _geQ`, style: {margin: `${0}px ${20}px ${8}px`, [`line-height`]: 1.414}}, 
  										[
  											[`label`, {class: `v202202122052 image`, for: `file`}], 
  											[`form`, {enctype: `multipart/form-data`}, 
  												[[`input`, {id: `file`, type: `file`, accepts: `image/*`}]]], 
  											[`div`, {class: `_eYG`}, 
  												[[`span`, {class: `_a2X`}, `upload/replace image`]]]]], 
  									[`div`, {class: `_geQ`}, 
  										[[`p`, {style: {
  											margin: `${24}px ${16}px`, 
  											padding: `${5}px ${16}px`, 
  											[`border-radius`]: `${50}px`,
  											color: `#fff`,
  											background: `#1e1e1e`,
  											[`text-align`]: `center`,
  											[`font-size`]: `${13}px`}}, `your image must be at least 500 x 500 pixels and set against a plain white background`]]]]]]]]]]]]],

  	mugslot: function () {

  		let Slot = {
  			action: [`signin`, `signin`],
  			slots: [[`email address`, `email`, `email`], [`password`, `lock`, `password`]]
  		};

  		if (Tools.typen(Clients.instance)[0] === `mugup`) {

			Slot = {
  				action: [`signup`, `signup`],
  				slots: [
  					[`email address`, `email`, `email`], 
  					[`first name`, `middle`, `text`], 
  					[`surname`, `family`, `text`], 
  					[`password`, `lock`, `password`]
  				]
  			}  			
  		}

  		let Slots = [];

  		Slot.slots.forEach(Slot => {

  			Slots.push([
  				`div`, {class: `_sZ2`}, [
  					[`label`, {style: {margin: `0 ${20}px ${8}px`, color: `#5c5e62`, [`line-height`]: 1.414, [`text-transform`]: `capitalize`}}, 
  						[[`span`, {}, Slot[0]]]], 
  					[`div`, {class: `_aXZ`}, 
  						[[`input`, {id: Slot[1], type: Slot[2]}]]]]]);

  		});

  		return [
  			`section`, {}, 
  				[
  					[`div`, {class: `_-tY`}, 
  						[[`div`, {class: `_aXz`}, 
  							[
  								[`div`, {class: `_-Xg _gxM _geQ`}, 
  									[
  										[`a`, {class: `-_tX v202201180941`, href: ``}], 
  										[`div`, {class: `_gZz`}, 
  											[[`a`, {id: (Tools.typen(Clients.instance)[0] === `mugin`)? `mugup`: `mugin`, class: `_tXx`, href: `javascript:;`}, (Tools.typen(Clients.instance)[0] === `mugin`)? `signup`: `signin`]]]]]]]]], 
  					[`main`, {id: `mugin`, class: `_tY0`, style: {height: `${100}%`, padding: `${24}px`, [`margin-top`]: `${65}px`}}, 
  						[[`div`, {class: `_geQ`, style: {[`max-width`]: `${362}px`, width: `${100}%`, margin: `auto`, [`justify-content`]: `center`}}, 
  							[
  								[`h2`, {}, (Tools.typen(Clients.instance)[0] === `mugin`)? `signin`: `signup`], 
  								[`div`, {class: `_aXZ`, style: {margin: `${16}px 0 ${40}px`}}, 
  									[
  										[`div`, {}, Slots],
  										[`div`, {class: `_gM_a _agM _guZ`, style: {width: `${100}%`, [`block-size`]: `${40}px`, background: `#1185fe`}}, 
  											[[`a`, {id: Slot.action[1], class: `_TX_a _atX _dMG _aWz`, href: `javascript:;`}, Slot.action[0]]]]]]]]]]]]
  	},

  	main: function () { 

  		let Main = [],

  		Axis = Tools.typen(Clients.quo).btc[1][5];

  		let portfolio = 0;

      if (Clients.wallet) portfolio = (((Tools.typen(Clients.vault)*.25)/37515)*Axis[1] + Tools.typen(Clients.vault)*.75).toFixed(2);

      //portfolio = (parseFloat(Tools.typen(Clients.wallet)[2][0]) + parseFloat(Axis[1])*Tools.typen(Clients.wallet)[2][1]).toFixed(2)

  		Main[0] = 
  			[`main`, {class: `_tY0`, style: {color: `#fff`, background: `#262626`}}, 
  				[
  					[`div`, {class: `_-tY`,style: {background: `#262626`}}, 
  						[[`div`, {class: `_aXz`, style: {padding: `${0} ${16}px`}}, 
  							[
  								[`div`, {class: `_-Xg _gxM _geQ`}, 
  									[
  										[`a`, {class: `-_tX v202201180941`, style: {[`min-width`]: `${32}px`, height: `${32}px`}, href: `/`}, ``], 
  										[`span`, {class: `_aA6 _tXx`, style: {
  											[`border-left`]: `${1}px solid #91919159`,
  											margin: `${0} ${7}px`,
  											padding: `${0} ${14}px`,
  											[`font-size`]: `${14}px`,
  											color: `#fff`,
  											overflow: `hidden`,
  											[`font-family`]: (Clients.wallet)? `arcane`: `inherit`,
  											//[`text-overflow`]: `ellipsis`,
  											[`white-space`]: `nowrap`}}, (Clients.wallet)? `${portfolio} USD`: `joltquid`], 
  										[`span`, {id: `vault`, class: `_tXx`, style: {
  											color: `#feef11`, 
  											margin: `${1.5}px ${0} ${0} ${-14}px`, 
  											[`font-size`]: `${12}px`}}, (Clients.wallet && Tools.typen(Clients.wallet)[2][1] > 0)? `+BTC`: ``]]],
  								[`div`, {class: `_gZz`}, 
  									[
  										(Clients.mug)? this.wallets: [`div`, {}],
  										this.mug[(Clients.mug) ? 1: 0]]]]]]], 
  				[`section`, {id: `wallet`, style: {[`max-width`]: `${1000}px`, width: `${100}%`, margin: `${90}px auto`}}, 
  					[[`div`, {style: {padding: `${0} ${24}px`}}, 
  						[	
  							[`div`, {class: `_wrap_202203262208 _geQ`}, 
  								[
  									[`div`, {id: `buy`},  
  										[
  											[`span`, {style: {
  												[`margin-bottom`]: `${24}px`,
  												color: `#feef11`, 
  												[`font-size`]: `${25}px`, 
  												[`line-height`]: `${32}px`,
  												[`font-weight`]: 300}}, `Own Bitcoin`],
  											[`p`, {style: {[`font-size`]: `${12}px`}}, `Obtain bitcoin instantly at market price from joltquid's crypto exchange`], 
  											[`div`, {class: `geQ`, style: {margin: `${24}px 0`}}, 
  												[[`span`, {id: `instant`, class: `parallelo`, style: {color: `#000`}}, `BUY ${(3/Axis[1]).toFixed(5)} BTC @ 3 USD`]]]]], 
  									[`div`, {id: `buyline`}]]]
  							/*[`span`, {style: {padding: `${12}px ${0}`, [`text-decoration`]: `underline`}}, `INDEXJQ: .Bitcoin`], 
  							[`div`, {class: `_wrap_202203262208`}, 
  								[
  									[`div`, {id: `coin`, style: {}}], 
  									[`div`, {id: `coin-meta`, style: {}}, 
  										[
  											[`div`, {class: `_gxM`, style: {padding: `${12}px ${0}`}}, 
  												[
  													[`span`, {class: `tXx`, style: {[`font-size`]: `${12}px`}}, `INDEX PRICE`], 
  													[`div`, {class: `_gZz`}, 
  														[[`span`, {class: `_tXx`, style: {
                                [`font-family`]: `geometria`, [`font-size`]: `${13}px`,
  															color: (((Axis[1] - Axis[0])/Axis[1])*100 >= 0) ? `#1bd401`: `#d40101`}}, `${Tools.typen(Clients.quo).btc[0]} USD`]]]]],
  											[`div`, {id: `last-btc`}, 
  												[this.real([Tools.typen(Clients.quo).btc[1][5], `USD`, `last-btc`, `1H`])]], 
  											[`div`, {class: `_gxM`, style: {padding: `${12}px ${0}`}}, 
  												[
  													[`span`, {class: `tXx`, style: {[`font-size`]: `${12}px`}}, `INDEX VOLUME`], 
  													[`div`, {class: `_gZz`}, 
  														[[`span`, {class: `_tXx`, style: {[`font-family`]: `geometria`, [`font-size`]: `${13}px`}}, `${Tools.typen(Clients.quo).volume[0]} BTC`]]]]]]]]]*/, 
  							[`div`, {class: `_wrap_202203262208 _geQ`, style: {margin: `${30}px ${0}`}}, 
  								[
  									//[`div`, {id: `quantsvg`}],
  									[`div`, {id: `quant`, class: `_geQ`, style: {width: `${100}%`}}, 
  										[
  											[`span`, {style: {
  												[`margin-bottom`]: `${24}px`,
  												[`text-align`]: `center`,
  												color: `#feef11`,
  												[`line-height`]: `${32}px`,
  												[`font-size`]: `${25}px`}}, `joltquid Quant Fund`],
  											[`p`, {style: {
  												[`font-size`]: `${12}px`,
  												[`text-align`]: `center`}}, 
  												`Sit back and let our proficient quant algorithms grow your crypto & fiat investments for you by 
  												implementing optimized high math, AI and market momentum driven strategies. Built to cater for separate 
  												client tiers, our service provides for all investors ranging from as low as economy and premium tiers.`], 
  											[`span`, {class: `parallelo`, style: {
  												color: `#000`, 
  												[`margin-top`]: `${24}px`, 
  												[`font-family`]: `litera`,
  												[`font-weight`]: 600}}, `Join Quant Fund`]]]]], 
  							[`div`, {class: `_wrap_202203262208 _geQ`, style: {margin: `${30}px ${0}`}}, 
  								[
  									[`div`, {id: `bitpitsvg`}, 
  										[
  											[`div`, {class: `_gxM`}, 
  												[
  													[`span`, {style: {[`font-size`]: `${12}px`}}, `Limit Order Matches`],
  													[`div`, {class: `_gZz`, style: {opacity: .5, [`font-size`]: `${12}px`}}, `This hour`]]], 
  											[`div`, {id: `limits`, style: {[`margin-top`]: `${24}px`}}, this.bitpit()]]],
  									[`div`, {id: `bitpit`, class: `_geQ`, style: {}}, 
  										[
  											[`span`, {style: {
  												[`margin-bottom`]: `${24}px`,
  												[`text-align`]: `center`,
  												color: `#feef11`,
  												[`line-height`]: `${32}px`,
  												[`font-size`]: `${25}px`}}, `Crypto Exchange`],
  											[`p`, {style: {
  												[`font-size`]: `${12}px`,
  												[`text-align`]: `center`}}, 
  												`Trade in crypto all day long on our crypto exchange with our multiple trading options.`], 
  											[`span`, {class: `parallelo`, style: {
  												color: `#000`, 
  												[`margin-top`]: `${24}px`, 
  												[`font-family`]: `litera`,
  												[`font-weight`]: 600}}, `Trade Now`]]]]]]]]]]];

  		return Main[0];
  	},

  	moves: function () {

  		let Pit = [[], []];

  		Pit[0] = Tools.typen(Clients.moves).sort((A, B) => {return B.secs - A.secs});

  		Pit[0].forEach(Move => {

  			Pit[1].push(
  				[`div`, {id: `pitmoves`, class: `_wrap_202203262208`, style: {
  					padding: `${12}px ${0}`, [`border-bottom`]: `${1}px solid #e8e8e8`}}, 
  					[
  						[`div`, {style: {width: `${20}%`}}, [[`a`, {href: `javascript:;`, style: {
  							color: (Move.side === `buy`) ? `#1bd401`: `#d40101`,
  							[`font-size`]: `${12}px`,
  							[`text-transform`]: `uppercase`}}, Move.side]]],
  						[`div`, {style: {width: `${30}%`}}, [[`span`, {}, Tools.logs(Move.secs).substr(5, 10)]]],
  						[`div`, {style: {width: `${30}%`}}, [[`span`, {}, `${Move.coin[0]} BTC`]]],
  						[`div`, {style: {width: `${20}%`}}, [[`span`, {}, `${Move.coin[1]}`]]]]]);
  		});

  		return [`div`, {class: ``}, 
  			[
  				[`div`, {id: `pittile`, class: `_wrap_202203262208`, style: {
  					padding: `${24}px ${0} ${6}px`, [`border-bottom`]: `${1}px solid #e8e8e8`}}, 
  					[
  						[`div`, {style: {width: `${20}%`}}, [[`span`, {}, `side`]]],
  						[`div`, {style: {width: `${30}%`}}, [[`span`, {}, `date`]]],
  						[`div`, {style: {width: `${30}%`}}, [[`span`, {}, `amount`]]],
  						[`div`, {style: {width: `${20}%`}}, [[`span`, {}, `price`]]]]], 
  				[`div`, {}, Pit[1]]]];
  	},

  	mug: [
    		[`a`, {class: `-_tX v202204261406`, id: `mugin`, style: {margin: `${0}px ${15}px`}, href: `javascript:;`}], 
    		[`span`, {style: {margin: `${0}px ${10}px`, position: `relative`, height: `${24}px`}}, 
    			[
    				[`svg`, {style: {[`min-height`]: `${24}px`, width: `${24}px`}, viewBox: `0 0 24 24`}, 
    					[
    						[`circle`, {cy: 12, cx: 12, r: 12, stroke: `none`, fill: `#47008c`}],
    						[`text`, {x: 12, y: 16, [`text-anchor`]: `middle`, fill: `#fff`, style: {
    							[`text-transform`]: `uppercase`, 
    							[`letter-spacing`]: `normal`,
    							[`font-size`]: `${12}px`}}, (Clients.mug)? Tools.typen(Clients.mug)[1][0]: ``]]], 
    				[`a`, {id: `mug`, class: `_aWz mug`, style: {position: `absolute`, left: 0}, href:(Clients.mug)? `/assets`:`javascript:;`}]]]],

    real: function (Real) {

    	let Span = [[], [`1H`, `1D`, `1W`, `All`]];

    	Span[1].forEach((a) => {

    		Span[0].push([`span`, {id: `span`, style: {opacity: (a === Real[3])? 1: .3, padding: `${0} ${10}px`}}, a]);
    	});

    	return [
    		`div`, {style: {padding: `${12}px 0`}}, 
  				[
  					[`div`, {class: `_gxM`}, 
  						[
  							[`span`, {class: `tXx`, style: {
  								color: (((Real[0][1] - Real[0][0])/Real[0][1])*100 >= 0) ? `#1bd401`: `#d40101`,
  								[`font-family`]: `geometria`,
  								[`font-size`]: `${11}px`}}, `${(((Real[0][1] - Real[0][0])/Real[0][1])*100 >= 0) ? `+`: ``}${(((Real[0][1] - Real[0][0])/Real[0][1])*100).toFixed(2)}%`], 
  							[`div`, {id: `reals`, class: `_gZz`, role: Real[2], style: {[`font-size`]: `${10}px`}}, 
  								Span[0]]]], 
  					[`svg`, {style: {margin: `${6}px ${0}`, width: `${100}%`, [`max-height`]: `${10}px`}}, 
  						[
  							[`rect`, {
  								x: 0, 
  								y: 1, 
  								rx: 4, 
  								ry: 4, 
  								stroke: `rgba(${88}, ${65}, ${216}, ${.5})`,  
  								opacity: 1, 
  								fill: `none`, 
  								width: `${100}%`, 
  								height: `${4}px`}], 
  							[`rect`, {
  								x: 0, 
  								y: 2.5, 
  								rx: 4, 
  								ry: 4, 
  								stroke: `#5841d8`, //`rgba(${88}, ${65}, ${216}, ${.5})`, 
  								fill: `none`, 
  								width: `${((Real[0][1]- Real[0][2])/(Real[0][3] - Real[0][2]))*100}%`, 
  								height: `${1}px`}]]], 
  					[`div`, {class: `_gxM glyph_202203191319`, style: {[`font-family`]: `geometria`, [`font-size`]: `${10}px`}}, 
  						[
  							[`span`, {style: {color: `#6a6a6a`}}, `LOW: ${Real[0][2]} ${Real[1]}`], 
  							[`div`, {class: `_gZz`}, 
  								[[`span`, {style: {color: `#6a6a6a`}}, `HIGH: ${Real[0][3]} ${Real[1]}`]]]]]]]
    },

   	splash: [
   		`main`, {class: `_xC2 _aA2`, style: {height: `${100}%`}}, 
   			[[`div`, {class: `_geQ`, style: {[`justify-content`]: `center`}}, 
   				[[`span`, {class: `v202201180941`, style: {width:`${56}px`, height: `${56}px`}}]]]]],

   	pit: function () {

  		let Axis = Tools.typen(Clients.quo).btc;

  		let vault = (parseFloat(Tools.typen(Clients.wallet)[2][0]) + parseFloat(Axis[0])*Tools.typen(Clients.wallet)[2][1]).toFixed(2)

  		return [`main`, {class: `_tY0`, style: {height: `${100}px`}}, 
  			[
  				[`div`, {class: `_-tY`},
  					[[`div`, {class: `_aXz`, style: {padding: `${0} ${16}px`}}, 
  						[
  							[`div`, {class: `_-Xg _gxM _geQ`}, 
  								[
  									[`a`, {class: `-_tX v202201180941`, style: {[`min-width`]: `${32}px`, height: `${32}px`}, href: `/`}, ``], 
  									[`span`, {id: `vault`, class: `_aA6 _tXx`, style: {
  										[`border-left`]: `${1}px solid #d5d5d5`,
  											margin: `${0} ${7}px`,
  											padding: `${0} ${14}px`,
  											[`font-size`]: `${14}px`,
  											color: `#47008c`,
  											//overflow: `hidden`,
  											[`font-family`]: `arcane`,
  											//[`text-overflow`]: `ellipsis`,
  											[`white-space`]: `nowrap`}}, `${vault} USD`], 
  									[`span`, {id: `coins`, class: `_tXx`, style: {
  											color: `#feef11`, 
  											margin: `${1.5}px ${0} ${0}px ${-8}px`, 
  											[`font-size`]: `${12}px`}}, (Clients.wallet && Tools.typen(Clients.wallet)[2][1] > 0)? `+BTC`: ``]]],
  							[`div`, {class: `_gZz`}, 
  								[this.wallets]]]]]], 
  				[`section`, {id: `wallet`, style: {padding: `${0} ${24}px`, [`max-width`]: `${1000}px`, width: `${100}%`, margin: `${90}px auto`}}, 
  					[
  						[`div`, {class: `_wrap_202203262208`}, 
  							[
  								[`div`, {id: `pitaxis`}],
  								[`div`, {id: `pittools`}, 
  									[
  										[`div`, {id: `pitmove`, class: `_gxM`}, 
  											[
  												[`div`, {class: `_geQ`}, [[`span`, {class: `pitside`, style: {
  													background: `#1bd401`,
  													opacity: 1,
  													color: `#fff`}}, `Buy`]]],
  												[`div`, {class: `_geQ`}, [[`span`, {class: `pitside`}, `Sell`]]]]], 
  										[`div`, {id: `pittype`, class: `_gxM`, style: {padding: `${18}px ${0}`}}, 
  											[
  												[`div`, {class: `sort _geQ`}, [[`span`, {class: `pittype`, style: {opacity: 1}}, `Market`]]],
  												[`div`, {class: `sort _geQ`}, [[`span`, {class: `pittype`}, `Limit`]]],
  												[`div`, {class: `sort _geQ`}, [[`span`, {class: `pittype`}, `Take-profit`]]],
  												/**[`div`, {class: `sort _geQ`}, [[`span`, {}, `Stop-limit`]]]**/]], 
  										[`div`, {class: `_gxM _geQ`}, 
  											[
  												[`span`, {style: {[`font-size`]: `${12}px`, opacity: .5}}, `price`], 
  												[`div`, {class: `_gZz _eYG`}, 
  													[	
  														[`div`, {id: `pitvalue`, class: `_gxM _gZz _geQ`}, 
  															[
  																[`input`, {id: `value`, placeholder: `${Tools.typen(Clients.quo).btc[0]}`}],
  																[`span`, {class: `_tXx`, style: {color: `#d0d1d2`}}, `USD`]]]]]]], 
  										[`div`, {id: `pitamount`, class: `_gxM`, style: {padding: `${18}px ${0}`}}, 
  											[
  												[`input`, {id: `amount`, placeholder: `0.00BTC`, type: `text`}], 
  												[`div`, {class: `_gZz`, style: {width: `${35}%`}}, 
  													[[`span`, {id: `pitalias`, style: {
  														[`font-family`]: `geometria`, 
  														[`font-size`]: `${12}px`,
  														[`white-space`]: `nowrap`, 
  														opacity: .5}}, `0.00 USD`]]]]], 
  										[`div`, {}, 
  											[[`div`, {class: `_geQ`}, 
  												[[`span`, {id: `place`, style: {
  													width: `${100}%`,
  													padding: `${12}px ${0}`,
  													background: `#1bd401`,
  													[`font-size`]: `${12}px`,
  													opacity: .3,
  													[`text-align`]: `center`,
  													color: `#fff`,
  													cursor: `pointer`}}, `place order`]]]]]]]]],
  						[`div`, {id: `assets`}, [this.assets()]], 
  						[`div`, {id: `pits`, style: {margin: `${30}px ${0}`}}, [this.pitmoves()]]]]]];
  	},

  	pitaxis: function () {

  		let Pit = [[], [], [], ``, []];

  		let Moves = Tools.typen(Clients.pitmoves).sort((A, B) => {return B.secs - A.secs});

  		Moves.forEach(Move => {

  			if (Move.side === `buy` && Move.open === false) Pit[0].push(Move);
  		});

  		let Axis = Tools.typen(Clients.quo).btc[1][5];

  		let pit = Tools.typen(Clients.wallet)[2][1];

  		let Span = [document.querySelector(`#pitaxis`).clientWidth, 200];

  		let Y = [Axis[2], Axis[3]];

		let y = Y[1] - Y[0];

  		if ((new Date().valueOf() - Pit[0][0].secs) > 3600000) {

  			let AXIS = [Tools.typen(Clients.axis)];

			let X = [AXIS[0][AXIS[0].length - 1][0], AXIS[0][0][0]];

			let x = AXIS[0][AXIS[0].length - 1][0] - AXIS[0][0][0];

			AXIS[0].forEach(Vault => {

				Pit[3] += `${(((Vault[0] - AXIS[0][0][0])/x)*Span[0]) + 0} ${(y === 0)? 50: ((Vault[1] - Y[1])/y)*(-185)} `;
			});

			let Value = Tools.typen(Clients.axis).sort((A, B) => {return B[1] - A[1]});

			let Feats = [Value[Value.length - 1], Value[0]];

			Feats.forEach(Feat => {

				let XY = [(((Feat[0] - AXIS[0][0][0])/x)*Span[0]), ((Feat[1] - Y[1])/y)*(-185)];

				(XY[1] < 5)? XY[1] = 7.5: XY[1];

				(XY[1] > 195)? XY[1] = 191: XY[1];

				(XY[0] < 5)? XY[0] = 6: XY[0] = XY[0] + 2.5;

				(XY[0] > Span[0] - 75)? XY[0] = Span[0] - 70: XY[0] = XY[0] + 2.5;

				Pit[4].push(
					[`text`, {x: XY[0], y: XY[1], fill: `#000`, style: {
						[`font-family`]: `geometria`,
						[`font-size`]: `${9}px`}}, `${(Feat[1]*pit).toFixed(3)} USD`]);
			});

  			Pit[1] = [`div`, {class: `_eYG`}, 
  				[[`span`, {style: {
  					color: (((Axis[1] - Pit[0][0].coin[1])/Axis[1])*100 >= 0) ? `#1bd401`: `#d40101`,
  					[`font-family`]: `geometria`, 
  					[`font-size`]: `${11}px`}}, 
  					`${(((Axis[1] - Pit[0][0].coin[1])/Axis[1])*100 >= 0) ? `+`: ``}${((pit*Axis[1]) - (pit*Pit[0][0].coin[1])).toFixed(2)} (${(((Axis[1] - Pit[0][0].coin[1])/Axis[1])*100).toFixed(2)}%)`]]];
  			
  			Pit[2] = 
				[`svg`, {height: `${200}px`, style: {[`margin-top`]: `${30}px`}}, 
					[
						[`path`, {
							opacity: .75,
							stroke: `#1bd401`, 
							[`stroke-width`]: 1, 
							fill: `none`, d: `M15 ${((Pit[0][0].coin[1] - Y[1])/y)*(-175) + 5.5} ${Span[0]} ${((Pit[0][0].coin[1] - Y[1])/y)*(-175) + 7.5}`}], 
						[`text`, {x: 0, y: ((Pit[0][0].coin[1] - Y[1])/y)*(-175) + 7.5, fill: `#a6a6a6`, style: {
							[`font-family`]: `geometria`,
							[`font-size`]: `${8}px`}}, `${(Pit[0][0].coin[1]*pit).toFixed(3)}`], 
						[`path`, {
							opacity: 1,
							stroke: `#5841d8`, 
							[`stroke-width`]: 1, 
							fill: `none`, d: `M${Pit[3]}`}], 
						[`g`, {}, Pit[4]]]];
  		}

  		return [`div`, {}, 
  			[
  				[`div`, {class: `_gxM`}, 
  					[
  						[`span`, {style: {[`font-size`]: `${12}px`}}, `Portfolio Balance`],
  						[`div`, {class: `_gZz`}, [[`span`, {style: {
  							[`text-decoration`]: `underline`,
  							color: `#feef11`, [`font-size`]: `${12}px`}}, `BTC`]]]]],
  				[`div`, {class: `_gxM`}, 
  					[
  						[`span`, {style: {
  							[`font-family`]: `geometria`,
  							[`font-size`]: `${12}px`,
  							[`font-weight`]: 600}}, `${(parseFloat(Axis[1])*pit).toFixed(2)} USD`],
  						Pit[1]]],
  				Pit[2]]];
  	},

  	pitmoves: function () {

  		let Pit = [[], []];

  		Pit[0] = Tools.typen(Clients.pitmoves).sort((A, B) => {return B.secs - A.secs});

  		Pit[0].forEach(Move => {

  			Pit[1].push(
  				[`div`, {id: `pitmoves`, class: `_wrap_202203262208`, style: {
  					padding: `${12}px ${0}`, [`border-bottom`]: `${1}px solid #e8e8e8`}}, 
  					[
  						[`div`, {style: {width: `${20}%`}}, [[`a`, {href: `javascript:;`, style: {
  							color: (Move.side === `buy`) ? `#1bd401`: `#d40101`,
  							[`font-size`]: `${12}px`,
  							[`text-transform`]: `uppercase`}}, Move.side]]],
  						[`div`, {style: {width: `${30}%`}}, [[`span`, {}, Tools.logs(Move.secs).substr(5, 10)]]],
  						[`div`, {style: {width: `${30}%`}}, [[`span`, {}, `${Move.coin[0]} BTC`]]],
  						[`div`, {style: {width: `${20}%`}}, [[`span`, {}, `${Move.coin[1]}`]]]]]);
  		});

  		return [`div`, {class: ``}, 
  			[
  				[`div`, {class: `_gxM _tXx`, style: {[`font-size`]: `${12}px`}}, `Trades`],
  				[`div`, {id: `pittile`, class: `_wrap_202203262208`, style: {
  					padding: `${24}px ${0} ${6}px`, [`border-bottom`]: `${1}px solid #e8e8e8`}}, 
  					[
  						[`div`, {style: {width: `${20}%`}}, [[`span`, {}, `side`]]],
  						[`div`, {style: {width: `${30}%`}}, [[`span`, {}, `date`]]],
  						[`div`, {style: {width: `${30}%`}}, [[`span`, {}, `amount`]]],
  						[`div`, {style: {width: `${20}%`}}, [[`span`, {}, `price`]]]]], 
  				[`div`, {}, Pit[1]]]];
  	}, 

   	trails: function (Trail) {

   		let Trace = [];

   		Trail[0].forEach(Pay => {

   			Trace.push([
   				`div`, {class: `_gxM _limit_202203261823`, style: {padding: `${9}px`}}, 
   					[
   						[`a`, {class: `tXx`, href: `/trail/${(Pay.md)}`, style: {
   							color: `#48007c`, 
   							[`text-transform`]: `uppercase`, [`font-size`]: `${11}px`}}, Pay.trace], 
   						[`div`, {class: `_eYG`}, 
   							[[`span`, {style: {color: `#b7b7b7`, [`font-size`]: `${11}px`}}, Tools.logs(Pay.secs)]]], 
   						[`div`, {class: `_gZz _tXx`, style: {flex: 2}}, 
   							[[`span`, {style: {
   								[`font-family`]: `geometria`,
   								[`font-size`]: `${12}px`,
   								color: (Trail[1] === `+`)? `#1bd401`: ``}}, `${Trail[1]}${Pay.dollars} ${Trail[2]}`]]]]]);
   		});

   		return Trace;
   	},

   	wallet: function () {

   		return [

   		`main`, {class: `_tY0`, style: {height: `${100}px`}}, 
  			[
  				[`div`, {class: `_-tY`}, 
  					[[`div`, {class: `_aXz`, style: {padding: `${0} ${16}px`}}, 
  						[
  							[`div`, {class: `_-Xg _gxM _geQ`}, 
  								[
  									[`a`, {class: `-_tX v202201180941`, style: {[`min-width`]: `${32}px`, height: `${32}px`}, href: `/`}, ``], 
  									[`span`, {class: `_aA6 _tXx`, style: {
  											[`border-left`]: `${1}px solid #d5d5d5`,
  											margin: `${0} ${7}px`,
  											padding: `${0} ${14}px`,
  											[`font-size`]: `${14}px`,
  											color: `#47008c`,
  											overflow: `hidden`,
  											[`text-overflow`]: `ellipsis`,
  											[`white-space`]: `nowrap`}}, `wallet`]]],
  							[`div`, {class: `_gZz`}, 
  								[this.mug[(Clients.mug) ? 1: 0]]]]]]], 
  				[`section`, {id: `wallet`, style: {[`max-width`]: `${920}px`, width: `${100}%`, margin: `${90}px auto ${60}px`}}, 
  					[[`div`, {}, 
  						[[`div`, {class: `_wrap_202203262208`, style: {padding: `${0} ${24}px`}}, 
  							[
  								[`div`, {id: `put`}, 
  									[
  										[`div`, {style: {padding: `${10}px 0`, [`font-size`]: `${12}px`}}, 
  											[[`span`, {class: `_tXx`}, `Deposit funds`]]], 
  										[`div`, {class: `_gxM`, style: {padding: `${24}px ${12}px`, width: `${100}%`}}, 
  											[
  												[`div`, {style: {width: `${25}%`}}, 
  													[[`input`, {id: `dollars`, placeholder: `USD`, type: `text`}]]], 
  												[`div`, {class: `_gZz`, style: {width: `${75}%`}}, 
  													[[`input`, {id: `mobile`, [`maxlength`]: 12, placeholder: `Mobile`, type: `text`, style: {
  														//margin: `${0} ${0} ${0} ${24}px`,
  														width: `${90}%`}}]]]]], 
  										[`div`, {class: `_gxM`, style: {width: `${100}%`}}, 
  											[
  												[`span`, {class: `_tXx`, style: {color: `#a6a6a6`, [`font-size`]: `${11}px`}}, `*minimum 22.5 USD`], 
  												[`div`, {class: `_gZz _geQ`}, 
  													[
  														[`span`, {class: `v202203261943`, style: {
  															margin: `${1}px ${4}px 0`, width: `${20}px`, height: `${20}px`}}],
  														[`a`, {id: `vault`, class: `_tXx`, style: {
  															color: `#48007c`, [`font-size`]: `${12}px`}, href: `javascript:;`}, `Deposit`]]]]]]], 
  								[`div`, {id: `take`, style: {display: `none`}}, 
  									[
  										[`div`, {style: {padding: `${10}px 0`, [`font-size`]: `${12}px`}}, 
  											[[`span`, {class: `_tXx`}, `Withdraw funds`]]], 
  										[`div`, {class: `_gxM`, style: {padding: `${24}px ${12}px`, width: `${100}%`}}, 
  											[
  												[`div`, {style: {width: `${25}%`}}, 
  													[[`input`, {id: `dollars`, placeholder: `USD`, type: `text`}]]], 
  												[`div`, {class: `_gZz`, style: {width: `${75}%`}}, 
  													[[`input`, {id: `mobile`, [`maxlength`]: 12, placeholder: `Mobile`, type: `text`, style: {
  														//margin: `${0} ${0} ${0} ${24}px`,
  														width: `${90}%`}}]]]]], 
  										[`div`, {class: `_gxM`, style: {width: `${100}%`}}, 
  											[
  												//[`span`, {class: `_tXx`, style: {[`font-size`]: `${11}px`}}, `*minimum 3 USD`], 
  												[`div`, {class: `_gZz _geQ`}, 
  													[
  														[`span`, {class: `v202203262148`, style: {
  															margin: `${1}px ${4}px 0`, width: `${20}px`, height: `${20}px`}}],
  														[`a`, {id: `out`, class: `_tXx`, style: {
  															color: `#48007c`, [`font-size`]: `${12}px`}, href: `javascript:;`}, `Withdraw`]]]]], [
    									`div`, {style: {padding: `${12}px 0`, [`font-size`]: `${10}px`}}, 
  											[
  												[`div`, {class: `_gxM`}, 
  													[
  														[`span`, {class: `_tXx`, style: {
  															color: `#a6a6a6`, [`font-size`]: `${11}px`}}, `Withrawal limit/day`], 
  														[`div`, {class: `_gZz`, style: {[`font-family`]: `geometria`, color: `#48007c`}}, 
  															[[`span`, {class: `_tXx`, href: `javascript:;`}, `0.00/250 USD`]]]]], 
  												[`svg`, {style: {margin: `${6}px ${0}`, width: `${100}%`, [`max-height`]: `${10}px`}}, 
  													[
  														[`rect`, {
  															x: 0, 
  															y: 1.25, 
  															rx: 4, 
  															ry: 4, 
  															stroke: `rgba(${88}, ${65}, ${216}, ${.5})`,  
  															opacity: 1, 
  															fill: `none`, 
  															width: `${100}%`, 
  															height: `${4}px`}], 
  														[`rect`, {
  															x: 0, 
  															y: 2.5, 
  															rx: 4, 
  															ry: 4, 
  															stroke: `#5841d8`, 
  															fill: `none`, 
  															width: `0`, 
  															height: `${1}px`}]]]]]]]]]]]]], 
  				[`section`, {style: {[`max-width`]: `${920}px`, width: `${100}%`, margin: `${0} auto ${30}px`}}, 
  					[[`div`, {style: {padding: `${0} ${24}px`}}, 
  						[
  							[`span`, {class: `_tXx`, style: {margin: `${0} ${0} ${15}px`, padding: `${10}px ${0}`, [`font-size`]: `${12}px`}}, `Deposits & withdrawals`], 
  							[`div`, {id: `trail`, style: {border: `${1}px solid #dfdfdf`, [`border-radius`]: `${8}px`}}, 
  								this.trails([Tools.typen(Clients.vaults).plain, `+`, `USD`])]]]]]]]
  	},

   	wallets: [
   		`div`, {}, 
   			[[`a`, {class: `v202203191304`, style: {margin: `${0} ${10}px`}, href: `/wallet`}]]]
}

View = new View;