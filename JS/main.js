let answer = "";

function getWord() {
	let index = parseInt((Math.random() * 2105).toString());
	answer = dictionary[index];
	// console.log("The answer is " + answer);
}
function init() {
	finished = false;
	getWord();
	let container = document.getElementsByClassName("container")[0];
	container.lineNumber = "0";
	container.innerHTML = "";
	for (let i = 1; i <= 6; i++) {
		let word = document.createElement("div");
		word.className = "word";
		word.word = "";
		for (let j = 0; j < 5; j++) {
			let character = document.createElement("div");
			character.className = "character";
			character.innerHTML = "&nbsp";
			word.appendChild(character);
		}
		container.appendChild(word);
	}
	let hint = document.createElement("div");
	hint.className = "hint";
	container.appendChild(hint);
	console.log("[INFO] Initialize finished.");
}

function check(str) {
	let res = "*****";
	let f = [0, 0, 0, 0, 0];
	for (let i = 0; i < 5; i++) {
		if (answer[i] === str[i]) {
			f[i] = 1;
			res = res.substring(0, i) + "!" + res.substring(i + 1);
		}
	}
	for (let i = 0; i < 5; i++) {
		if (res[i] !== "!") {
			for (let j = 0; j < 5; j++) {
				if (!f[j] && str[i] === answer[j]) {
					res = res.substring(0, i) + "#" + res.substring(i + 1);
					f[j] = 1;
					break;
				}
			}
		}
	}
	return res;
}

let canSeeHint = false;
let finished = false;
function closeHint() {
	// console.log("closing");
	let hint = document.getElementsByClassName("hint")[0];
	hint.style.visibility = "hidden";
	hint.innerHTML = "";
}
function restart() {
	closeHint();
	init();
}

document.onkeydown = function onKeyDown(event) {
	if (finished === true) {
		return;
	}
	let container = document.getElementsByClassName("container")[0];
	let lineNumber = parseInt(container.lineNumber);
	console.log("[INFO] Get " + event.code);
	let word = document.getElementsByClassName("word")[lineNumber];
	if (canSeeHint === false) {
		if (
			event.code.length === 4 &&
			"KeyA" <= event.code &&
			event.code <= "KeyZ"
		) {
			if (word.word.length !== 5) {
				let character =
					document.getElementsByClassName("character")[
						lineNumber * 5 + word.word.length
					];
				character.innerHTML = event.code[3];
				word.word = word.word + event.code[3];
			}
		} else if (event.code === "Backspace") {
			if (word.word.length !== 0) {
				let character =
					document.getElementsByClassName("character")[
						lineNumber * 5 + word.word.length - 1
					];
				character.innerHTML = "&nbsp";
				word.word = word.word.substring(0, word.word.length - 1);
			}
		} else if (event.code === "Enter" || event.code === "NumpadEnter") {
			if (dictionary.indexOf(word.word) !== -1) {
				let res = check(word.word);
				for (let i = 0; i < 5; i++) {
					if (res[i] === "!") {
						word.children[i].className = "character correct";
					} else if (res[i] === "#") {
						word.children[i].className = "character partial";
					} else {
						word.children[i].className = "character wrong";
					}
				}
				let container = document.getElementsByClassName("container")[0];
				container.lineNumber = (parseInt(container.lineNumber) + 1).toString();
				if (res === "!!!!!") {
					finished = true;
					let hint = document.getElementsByClassName("hint")[0];
					hint.style.visibility = "visible";
					hint.innerHTML =
						"<span class='button'>" +
						"<button onclick='closeHint()'>close</button>" +
						"<button autofocus onclick='restart()'>restart</button>" +
						"</span>" +
						"<span class='text'>Win!</span>" +
						"<span class='text' style='color: lightgreen'>" +
						answer +
						"</span>";
				}
				if (container.lineNumber === "6") {
					finished = true;
					let hint = document.getElementsByClassName("hint")[0];
					hint.style.visibility = "visible";
					hint.innerHTML =
						"<span class='button'>" +
						"<button onclick='closeHint()'>close</button>" +
						"<button autofocus onclick='restart()'>restart</button>" +
						"</span>" +
						"<span class='text'>Failed.</span>" +
						"<span class='text' style='color: orangered'>" +
						answer +
						"</span>";
				}
			} else if (word.word.length === 5) {
				let hint = document.getElementsByClassName("hint")[0];
				hint.style.visibility = "visible";
				hint.innerHTML =
					"<span class='button'><button autofocus onclick='closeHint()'>close</button></span>" +
					"<span class='text'>Invalid Word.</span>";
			}
		}
	}
};
