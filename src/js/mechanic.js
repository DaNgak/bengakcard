window.onscroll = function () {
	const navbar = document.querySelector("#navbar");
	const buttontotop = document.querySelector("#buttontotop");
	if (window.pageYOffset > navbar.offsetTop) {
		buttontotop.classList.remove("hidden");
		buttontotop.classList.add("flex");
	} else {
		buttontotop.classList.remove("flex");
		buttontotop.classList.add("hidden");
	}
};

// Hamburger Navbar
const hamburgerbutton = document.querySelector("#hamburgerbutton");
const hamburgermenu = document.querySelector("#hamburgermenu");

hamburgerbutton.addEventListener("click", function () {
	hamburgerbutton.classList.toggle("hamburger-active");
	hamburgermenu.classList.toggle("hidden");
});

// Button
const buttondownload = document.querySelector("#buttondownload");
const buttondownloadsmscreen = document.querySelector("#buttondownloadsmscreen");

function convertToImage() {
	html2canvas(document.querySelector("#cardcanvas")).then((canvas) => {
		const imageUrl = canvas.toDataURL("image/png");
		let redirect = document.createElement("a");
		redirect.setAttribute("href", imageUrl);
		redirect.setAttribute("download", "bengakcard.png");
		redirect.click();
		redirect.remove();
	});
}

// Download Button
buttondownload.onclick = convertToImage;

buttondownloadsmscreen.onclick = convertToImage;
