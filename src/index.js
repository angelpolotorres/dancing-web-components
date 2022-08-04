import "./components/WebCharacter.js";

const container = document.querySelector(".container");
container.addEventListener("INFO", (ev) => {
	const data = ev.detail;
	const board = document.querySelector(".board");
	board.textContent = data;
});
