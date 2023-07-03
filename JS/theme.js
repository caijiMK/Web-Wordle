function changeTheme(themeName) {
	let head = document.getElementsByTagName("head")[0];
	let links = document.getElementsByTagName("link");
	for (let i = 0; i < links.length; ++i) {
		let now = links[i];
		console.log(
			now.href + " | " + document.URL.match("^(.*)://(.*/)")[0] + themeName
		);
		if (now.href === document.URL.match("^(.*)://(.*/)")[0] + themeName) {
			console.log("removed " + now);
			head.removeChild(now);
			return;
		}
	}
	let themeStyleSheet = document.createElement("link");
	themeStyleSheet.rel = "stylesheet";
	themeStyleSheet.href = themeName;
	head.appendChild(themeStyleSheet);
}
