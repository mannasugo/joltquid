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

  		let Main = [];

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
  											[`text-overflow`]: `ellipsis`,
  											[`white-space`]: `nowrap`}}, `joltquid`]]],
  								[`div`, {class: `_gZz`}, 
  									[
  										this.mug[(Clients.mug) ? 1: 0]]]]]]]]];

  		return Main[0];
  	},

  	mug: [
    		[`a`, {class: `-_tX v202203171249`, id: `mug`, style: {margin: `${0}px ${15}px`}, href: `javascript:;`}], 
    		[`span`, {style: {margin: `${0}px ${10}px`, position: `relative`, height: `${24}px`}}, 
    			[
    				[`svg`, {style: {[`min-height`]: `${24}px`, width: `${24}px`}, viewBox: `0 0 24 24`}, 
    					[
    						[`circle`, {cy: 12, cx: 12, r: 12, stroke: `none`, fill: `#47008c`}],
    						[`text`, {x: 12, y: 16, [`text-anchor`]: `middle`, fill: `#fff`, style: {
    							[`text-transform`]: `uppercase`, 
    							[`letter-spacing`]: `normal`,
    							[`font-size`]: `${12}px`}}, (Clients.mug)? Clients.mug[2][0]: ``]]], 
    				[`a`, {id: `mug`, class: `_aWz mug`, style: {position: `absolute`, left: 0, href:`javascript:;`}}]]]],

   	splash: [
   		`main`, {class: `_xC2 _aA2`, style: {height: `${100}%`}}, 
   			[[`div`, {class: `_geQ`, style: {[`justify-content`]: `center`}}, 
   				[[`span`, {class: `v202201180941`, style: {width:`${56}px`, height: `${56}px`}}]]]]]
}

View = new View;