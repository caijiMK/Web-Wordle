(function(){

	let answer = "";

	function getWord() {
		let index = parseInt((Math.random() * dictionary.length).toString());
		answer = dictionary[index];
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

	let finished = false;
	function restart() {
		init();
	}

	let id = 0;

	function clickButton(msg, t) {
		msg.nag('hide');
		if (t === "Click to Restart") {
			restart();
		}
	}
	function newMessage(t, col = "orange") {
		let msg = document.createElement("div"), cur = ++id;
		msg.setAttribute("id", "msg-" + cur);
		msg.setAttribute("class", "ui " + col + " inverted nag");
		msg.onclick = () => clickButton($(`#msg-${cur}`), t);
		msg.innerHTML = "<div class='title' style='color: #FFF;'>" + t + "</div>";
		document.getElementById("messages").appendChild(msg);
		$("#msg-" + cur).nag("show");
		if (t != "Click to Restart") {
			setTimeout(function () {
				$("#msg-" + cur).nag("hide");
				setTimeout(function () {
					document.getElementById("messages").removeChild(msg);
				}, 2000);
			}, 2500);
		}
	}

	document.onkeydown = function onKeyDown(event) {
		// 按键读取 & 胜负判断
		if (finished === true) {
			return;
		}
		let container = document.getElementsByClassName("container")[0];
		let lineNumber = parseInt(container.lineNumber);
		let word = document.getElementsByClassName("word")[lineNumber];
		if (event.code.length === 4 && "KeyA" <= event.code && event.code <= "KeyZ") {
			if (word.word.length !== 5) {
				let character =
					document.getElementsByClassName("character")
						[lineNumber * 5 + word.word.length];
				character.innerHTML = event.code[3];
				word.word = word.word + event.code[3];
			}
		} else if (event.code === "Backspace") {
			if (word.word.length !== 0) {
				let character =
					document.getElementsByClassName("character")
						[lineNumber * 5 + word.word.length - 1];
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
					newMessage("Win!", "green");
					newMessage("Click to Restart", "blue");
				} else if (container.lineNumber === "6") {
					finished = true;
					newMessage("Failed. Answer: " + answer, "red");
					newMessage("Click to Restart", "blue");
				}
			} else if (word.word.length === 5) {
				newMessage('Invalid Word.')
			}
		}
	};

	init();

})();
