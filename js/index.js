import { Visualizer, Analyzer } from "./Visualizer.js";
import circular from "./modules/circular.js";

const aud = document.getElementById("aud");

const fileSelector = document.getElementById("file-selector");
fileSelector.addEventListener("change", (e) => {
	const files = fileSelector.files;
	const file = URL.createObjectURL(files[0]);
	aud.src = file;
	aud.play();
});

const canvas = document.getElementById("canvas");
window.vis = new Visualizer(canvas, aud);

vis.useModule(circular);
vis.start();
