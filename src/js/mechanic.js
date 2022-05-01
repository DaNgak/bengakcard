// Button
const buttondownload = document.querySelector("#buttondownload");

// Download Button
buttondownload.onclick = function () {
	html2canvas(document.querySelector("#cardcanvas")).then((canvas) => {
		const imageUrl = canvas.toDataURL("image/png");
		let redirect = document.createElement("a");
		redirect.setAttribute("href", imageUrl);
		redirect.setAttribute("download", "bengakcard.png");
		redirect.click();
		redirect.remove();
	});
};


