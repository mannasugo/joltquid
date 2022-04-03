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

		Y.forEach(Span => {

			AXIS[3].push([`text`, {x: 0, y: (y === 0) ? 55 : ((Span - Y[1])/y)*(-175) + 7.5, fill: `#a6a6a6`, style: {
				//[`font-family`]: `geometria`,
				[`font-size`]: `${10}px`}}, `${Span}`]);
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

      if (Clients.wallet) portfolio = (parseFloat(Tools.typen(Clients.wallet)[2][0]) + parseFloat(Axis[1])*Tools.typen(Clients.wallet)[2][1]).toFixed(2)

  		Main[0] = 
  			[`main`, {class: `_tY0`, style: {height: `${100}px`}}, 
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
  											[`font-family`]: (Clients.wallet)? `arcane`: `inherit`,
  											//[`text-overflow`]: `ellipsis`,
  											[`white-space`]: `nowrap`}}, (Clients.wallet)? `${portfolio} USD`: `joltquid`], 
  										[`span`, {class: `_tXx`, style: {
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
  							[`span`, {style: {padding: `${12}px ${0}`, [`text-decoration`]: `underline`}}, `INDEXJQ: .Bitcoin`], 
  							[`div`, {class: `_wrap_202203262208`}, 
  								[
  									[`div`, {id: `coin`, style: {}}], 
  									[`div`, {id: `coin-meta`, style: {}}, 
  										[
  											[`div`, {class: `_gxM`, style: {padding: `${12}px ${0}`}}, 
  												[
  													[`span`, {class: `tXx`, style: {[`font-size`]: `${12}px`}}, `INDEX PRICE`], 
  													[`div`, {class: `_gZz _glyph_202203191319`}, 
  														[[`span`, {class: `_tXx`, style: {
  															color: (((Axis[1] - Axis[0])/Axis[1])*100 >= 0) ? `#1bd401`: `#d40101`}}, `${Tools.typen(Clients.quo).btc[0]} USD`]]]]],
  											[`div`, {id: `last-btc`}, 
  												[this.real([Tools.typen(Clients.quo).btc[1][5], `USD`, `last-btc`, `1H`])]], 
  											[`div`, {class: `_gxM`, style: {padding: `${12}px ${0}`}}, 
  												[
  													[`span`, {class: `tXx`, style: {[`font-size`]: `${12}px`}}, `INDEX VOLUME`], 
  													[`div`, {class: `_gZz _glyph_202203191319`}, 
  														[[`span`, {class: `_tXx`}, `${Tools.typen(Clients.quo).volume[0]} BTC`]]]]]/*,
  											this.real([Tools.typen(Clients.quo).volume[1][5], `BTC`]), 
  							[`div`, {class: `_gxM`, style: {padding: `${12}px ${0}`}}, 
  								[
  									[`span`, {class: `tXx`, style: {[`font-size`]: `${12}px`}}, `WEIGHTED AVG.`], 
  									[`div`, {class: `_gZz _glyph_202203191319`}, 
  										[[`span`, {class: `_tXx`}, `${Tools.typen(Clients.quo).volume[0]} BTC`]]]]],
  							this.real(Tools.typen(Clients.quo).volume[1][0])*/]]]]]]]]]];

  		return Main[0];
  	},

  	mug: [
    		[`a`, {class: `-_tX v202203171249`, id: `mugin`, style: {margin: `${0}px ${15}px`}, href: `javascript:;`}], 
    		[`span`, {style: {margin: `${0}px ${10}px`, position: `relative`, height: `${24}px`}}, 
    			[
    				[`svg`, {style: {[`min-height`]: `${24}px`, width: `${24}px`}, viewBox: `0 0 24 24`}, 
    					[
    						[`circle`, {cy: 12, cx: 12, r: 12, stroke: `none`, fill: `#47008c`}],
    						[`text`, {x: 12, y: 16, [`text-anchor`]: `middle`, fill: `#fff`, style: {
    							[`text-transform`]: `uppercase`, 
    							[`letter-spacing`]: `normal`,
    							[`font-size`]: `${12}px`}}, (Clients.mug)? Tools.typen(Clients.mug)[1][0]: ``]]], 
    				[`a`, {id: `mug`, class: `_aWz mug`, style: {position: `absolute`, left: 0}, href:(Clients.mug)? `/pit`:`javascript:;`}]]]],

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
  								width: `${(Real[0][1]/Real[0][3])*100}%`, 
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

  		let Axis = Tools.typen(Clients.quo).btc[1][5];

  		let portfolio = (parseFloat(Tools.typen(Clients.wallet)[2][0]) + parseFloat(Axis[1])*Tools.typen(Clients.wallet)[2][1]).toFixed(2)

  		return [`main`, {class: `_tY0`, style: {height: `${100}px`}}, 
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
  											[`font-family`]: `arcane`,
  											//[`text-overflow`]: `ellipsis`,
  											[`white-space`]: `nowrap`}}, `${portfolio} USD`], 
  									[`span`, {class: `_tXx`, style: {
  											color: `#feef11`, 
  											margin: `${1.5}px ${0} ${0} ${-14}px`, 
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
  												[`div`, {class: `_geQ`}, [[`span`, {style: {
  													background: `#1bd401`,
  													opacity: 1,
  													color: `#fff`}}, `Buy`]]],
  												[`div`, {class: `_geQ`}, [[`span`, {}, `Sell`]]]]], 
  										[`div`, {id: `pittype`, class: `_gxM`, style: {padding: `${18}px ${0}`}}, 
  											[
  												[`div`, {class: `_geQ pittype`}, [[`span`, {style: {opacity: 1}}, `Market`]]],
  												[`div`, {class: `_geQ pittype`}, [[`span`, {}, `Take-profit`]]],
  												[`div`, {class: `_geQ pittype`}, [[`span`, {}, `Limit`]]]/**,
  												[`div`, {class: `_geQ pittype`}, [[`span`, {}, `Stop-limit`]]]**/]], 
  										[`div`, {class: `_gxM`}, 
  											[
  												[`span`, {style: {[`font-size`]: `${12}px`, opacity: .5}}, `index price`], 
  												[`div`, {class: `_gZz`}, 
  													[
  														[`span`, {style: {
  															[`font-family`]: `geometria`, [`font-size`]: `${12}px`}}, `${1}BTC/`],
  														[`span`, {style: {
  															//padding: `${0} ${0} ${0} ${3}px`,
  															[`font-family`]: `geometria`,
  															[`font-size`]: `${12}px`,
  															color: (((Axis[1] - Axis[0])/Axis[1])*100 >= 0) ? `#1bd401`: `#d40101`}}, 
  															`${Tools.typen(Clients.quo).btc[0]} USD`]]]]], 
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
  												[[`span`, {id: `place`, role: `btc-buy-market`, style: {
  													width: `${100}%`,
  													padding: `${12}px ${0}`,
  													background: `#1bd401`,
  													[`font-size`]: `${12}px`,
  													opacity: .3,
  													[`text-align`]: `center`,
  													color: `#fff`,
  													cursor: `pointer`}}, `place order`]]]]]]]]], 
  						[`div`, {id: `pits`, style: {margin: `${30}px ${0}`}}, [this.pitmoves()]]]]]];
  	},

  	pitaxis: function () {

  		let Pit = [Tools.typen(Clients.pitmoves).sort((A, B) => {return B.secs - A.secs}), [], [], ``];

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

  			Pit[1] = [`div`, {class: `_eYG`}, 
  				[[`span`, {style: {
  					color: (((Axis[1] - Axis[0])/Axis[1])*100 >= 0) ? `#1bd401`: `#d40101`,
  					[`font-family`]: `geometria`, 
  					[`font-size`]: `${11}px`}}, 
  					`${(((Axis[1] - Axis[0])/Axis[1])*100 >= 0) ? `+`: ``}${((pit*Axis[1]) - (pit*Axis[0])).toFixed(3)} (${(((Axis[1] - Axis[0])/Axis[1])*100).toFixed(2)}%)`]]];
  			
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
							fill: `none`, d: `M${Pit[3]}`}]]];
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
  												[`span`, {class: `_tXx`, style: {color: `#a6a6a6`, [`font-size`]: `${11}px`}}, `*minimum 3 USD`], 
  												[`div`, {class: `_gZz _geQ`}, 
  													[
  														[`span`, {class: `v202203261943`, style: {
  															margin: `${1}px ${4}px 0`, width: `${20}px`, height: `${20}px`}}],
  														[`a`, {id: `vault`, class: `_tXx`, style: {
  															color: `#48007c`, [`font-size`]: `${12}px`}, href: `javascript:;`}, `Deposit`]]]]]]], 
  								[`div`, {id: `take`}, 
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