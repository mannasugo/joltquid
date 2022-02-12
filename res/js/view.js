`use strict`;

class View {

  constructor() {

	this.appendString = ``;
  }

  ModelDOM(Model) {

	if (typeof Model !== `object`) return;

	for (let lev = 0; lev < Model.length; lev++) {

	  let a = Model[lev][0];

	  let t2, lv2, z = a;

	  if (a === `html`) a = `!doctype html><html`;

	  this.appendString += `<` + a;

	  for (let lev_ = 0; lev_ < Model[lev].length; lev_++) {

		let l2 = Model[lev][lev_];

		if (typeof l2 === `string` && l2.split(`@`)[0] === `#`) this.appendString += ` id='` + l2.split(`@`)[1] + `'`;

		else if (typeof l2 === `string` && l2.split(`@`)[0] === `.`) this.appendString += ` class='` + l2.split(`@`)[1] + `'`;

		else if (typeof l2 === `string` && l2.split(`@`)[0] === `&`) {

		  let plus = l2.split(`@`)[1].split(`>`);

		  this.appendString += ` ` + plus[0] + `='` + plus[1] + `'`;
		}

		if (typeof l2 === `object`) lv2 = l2;

		if (typeof l2 === `string` && l2.split(`@`)[0] === `~`) t2 = l2;

	  }

	  this.appendString += `>`;

	  if (typeof t2 === `string` && t2.split(`@`)[0] === `~`) this.appendString += t2.substring(2, t2.length + 1);

	  if (typeof lv2 === `object`) this.ModelDOM(lv2);

	  let queer = [`img`, `input`, `meta`];

	  if (queer.indexOf(z) === -1) this.appendString += `</` + z + `>`;
	}

	return this.utf(this.appendString);
  }

  utf(String) {

	String = String.replace(new RegExp(`u0026`, `g`), `&`);

	String = String.replace(new RegExp(`u0027`, `g`), `'`);

	String = String.replace(new RegExp(`u0022`, `g`), `"`);

	String = String.replace(new RegExp(`u002F`, `g`), `/`);

	return String;
  }

  slim(String) {

	if (!String || String.length < 1 || String.match(/^(\s+)$/)) return;

	return String;
  }

  DOM(Arg) {

	document.querySelector(Arg[0]).innerHTML = this.ModelDOM(Arg[1]);
  }
}

View = new View;

let Models = {

  ModelMugs: () => {

		return [`section`, `#@mugs`, `.@_geQ _aXZ`, `&@style>max-width:600px;font-size:13px`, [[
			`div`, `.@_aXZ`, [[
				`div`, `.@_gZ`, [[`div`, `.@_gxM`, `&@style>padding: 16px 24px`, [[`span`, `.@_tXx`, `~@Provide Avatar`]]]]], [
					`section`, `.@_gZ`, `&@style>width:100%;`, [[
					  `div`, [[
						`div`, `.@sZ2`, [[
						  `div`, `.@_sZ2`, `&@style>align-items:center;justify-content:center; height:200px`, [[
							`img`, `#@file-plane`, `&@style>height:72px;width:72px`, `&@src>/res/svg/mug2.svg`]]], [
						  `div`, `.@_gxM _geQ`, `&@style>margin:0 20px 8px;line-height:1.414;`, [[
							`label`, `.@v202202122052 image`, `&@for>file`], [
							`form`, `&@enctype>multipart/form-data`, [[
							  `input`, `#@file`, `&@type>file`, `&@accepts>image/*`]]], [
							`div`, `.@_eYG`, [[
							  `span`, `.@_a2X`, `~@upload/replace item image`]]]]], [
						  `div`, `.@_geQ`, [[
							`p`, `&@style>margin:24px 16px;padding:5px 16px;border-radius:50px;color:#fff;background:#1e1e1e;text-align:center;font-size:13px`, `~@*your image must be at least 500 x 500 pixels and set against a plain white background.`]]]]]]]]]]]]];
  }
}