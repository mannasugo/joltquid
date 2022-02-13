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

	allocFile = (img, file) => {

		let alloc = new FileReader();

		alloc.onload = (e) => img.src = e.target.result;

		alloc.readAsDataURL(file);
	}

	allocateMug  (Files, Puts) {

		if (!Files || !Files.length) return;

		for (let i = 0; i < Files.length; i++) {

			let File = Files[i];

			if (!File.type.match(`image.*`) || File.size > 3048576) return;

			let Plane;

			if (!document.querySelector(`#plane`)) {

				Plane = new Image();

				Plane.setAttribute(`id`, `plane`);
			}

			else Plane = document.querySelector(`#plane`);

			this.allocFile(Plane, File);

			Plane.onload = () => {

				if (Plane.naturalWidth < 500) return;

				if (Plane.naturalWidth !== Plane.naturalHeight) return;

				let fileSort;

				if (Plane.src.charAt(11) === `j`) fileSort = `data:image/jpeg;base64,`;

				else if (Plane.src.charAt(11) === `p`) fileSort = `data:image/png;base64,`;

				if (!fileSort) return;
			
				let b64 = Plane.src.replace(fileSort,``), Duals = atob(b64), Alloc = [];

				for (let i = 0; i < Duals.length; i++) {

					Alloc.push(Duals.charCodeAt(i));
				}

				let AllocFile = new Blob([new Uint8Array(Alloc)], {type: `image/jpeg`});

				document.querySelector(`#file-plane`).src = Plane.src;

		        document.querySelector(`#file-plane`).style.width = `200px`

		        document.querySelector(`#file-plane`).style.height = `200px`

		        document.querySelector(`#file-plane`).style.marginTop = `24px`

		        Puts(AllocFile);
			};
				
		}
	}

}

Tools = new Tools();