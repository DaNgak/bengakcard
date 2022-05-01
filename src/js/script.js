import * as utility from "./utility.js";

// Path Data
const pathDataSource = "src/data/data.json";
const pathInit = "src/data/init.json";

// Input value
const inputname = document.querySelector("#name");
const inputblendopacity = document.querySelector("#opacity");
const inputmessage = document.querySelector("#messagetext");
const inputmessagelist = document.querySelector("#messagelist");
const inputtextcolor = document.querySelector("#textcolor");
const inputblendcolor = document.querySelector("#blendcolor");
const inputimage = document.querySelector("#inputimage");
const inputfont = document.querySelector("#inputfont");
const inputimagecustom = document.querySelector("#inputimagecustom");

// Output value
const outputname = document.querySelector("#outputname");
const outputmessage = document.querySelector("#outputmessage");
const outputimage = document.querySelector("#outputimage");

// Canvas
const cardcanvas = document.querySelector("#cardcanvas");
const blendElement = document.querySelector("#blendelement.blend");

// Alert
const namealert = document.querySelector("#namealert");
const messagetextalert = document.querySelector("#messagetextalert");
const blendopacityalert = document.querySelector("#opacityalert");
const inputimagecustomalert = document.querySelector("#inputimagecustomalert");

// Button
const buttonreset = document.querySelector("#buttonreset");
const buttonresetsmscreen = document.querySelector("#buttonresetsmscreen");

// Div element
const divUploadImage = document.querySelector("#divuploadimage");

// Hamburger Menu
const hamburgerbutton = document.querySelector("#hamburgerbutton");
const hamburgermenu = document.querySelector("#hamburgermenu");

// Validate File
let arrayFileValidate = ["png", "jpg", "jpeg", "jfif", "svg"];

// Init function
function init() {
	fetch(pathInit)
		.then((response) => response.json())
		.then((baseReloadPage) => {
			inputname.value = baseReloadPage.name;
			outputname.innerText = baseReloadPage.name;
			inputmessage.value = baseReloadPage.message;
			outputmessage.innerText = baseReloadPage.message;
			inputmessagelist.value = baseReloadPage.messageList;
			inputblendopacity.value = baseReloadPage.blendopacity;
			blendElement.style.opacity = baseReloadPage.blendopacity;
			inputtextcolor.value = baseReloadPage.textColor;
			cardcanvas.style.color = baseReloadPage.textColor;
			inputblendcolor.value = baseReloadPage.blendColor;
			blendElement.style.backgroundColor = baseReloadPage.blendColor;
			inputimage.value = baseReloadPage.imageInput;
			outputimage.src = baseReloadPage.backgroundImage;
			inputfont.value = baseReloadPage.fontInput;
			cardcanvas.style.fontFamily = baseReloadPage.font;
			if (!hamburgermenu.classList.contains("hidden")) {
				hamburgerbutton.click();
			}
			divUploadImage.classList.add("hidden");
			hamburgermenu.classList.add("hidden");
		})
		.catch((error) => console.log(error));
}

function reset() {
	init();
	utility.hiddenAlertElement(namealert);
	utility.hiddenAlertElement(blendopacityalert);
	utility.hiddenAlertElement(messagetextalert);
	utility.hiddenAlertElement(inputimagecustomalert);
}

// Init function
init();

// Name
utility.inputPreview(inputname, "keyup", outputname, 30, namealert);

// Message List
utility.inputPreview(inputmessage, "keyup", outputmessage, 220, messagetextalert);

// Message List
inputmessagelist.addEventListener("change", function () {
	fetch(pathDataSource)
		.then((response) => response.json())
		.then((data) => {
			switch (inputmessagelist.value) {
				case "default":
					outputmessage.innerText = data.message.default;
					inputmessage.value = data.message.default;
					utility.hiddenAlertElement(messagetextalert);
					break;
				case "indonesia":
					outputmessage.innerText = data.message.indonesia;
					inputmessage.value = data.message.indonesia;
					utility.hiddenAlertElement(messagetextalert);
					break;
				case "english":
					outputmessage.innerText = data.message.english;
					inputmessage.value = data.message.english;
					utility.hiddenAlertElement(messagetextalert);
					break;
				case "jepang":
					outputmessage.innerText = data.message.jepang;
					inputmessage.value = data.message.jepang;
					utility.hiddenAlertElement(messagetextalert);
					break;
				case "arab":
					outputmessage.innerText = data.message.arab;
					inputmessage.value = data.message.arab;
					utility.hiddenAlertElement(messagetextalert);
					break;
			}
		})
		.catch((error) => {
			console.log(error);
		});
});

// Blend Opacity
inputblendopacity.addEventListener("input", function () {
	console.log(inputblendopacity.value);
	if (parseFloat(inputblendopacity.value) >= 0 && parseFloat(inputblendopacity.value) <= 1) {
		blendElement.style.opacity = inputblendopacity.value;
		utility.hiddenAlertElement(blendopacityalert);
	} else {
		if (inputblendopacity.value.length == "") {
			utility.displayAlertElement(blendopacityalert, "Value opacity cannot be empty (required)");
		} else {
			utility.displayAlertElement(blendopacityalert, "Value opacity must be between 0 and 1");
		}
	}
});

// Text Color
inputtextcolor.addEventListener("input", function () {
	cardcanvas.style.color = inputtextcolor.value;
});

// Blend Color
inputblendcolor.addEventListener("input", function () {
	blendElement.style.backgroundColor = inputblendcolor.value;
});

// Input Image
inputimage.addEventListener("change", function () {
	switch (inputimage.value) {
		case "default":
			outputimage.src = "src/img/bg-default.jpg";
			utility.hiddenElement(divUploadImage, "block");
			utility.hiddenAlertElement(inputimagecustomalert);
			break;
		case "bg1":
			outputimage.src = "src/img/bg1.jpg";
			utility.hiddenElement(divUploadImage, "block");
			utility.hiddenAlertElement(inputimagecustomalert);
			break;
		case "bg2":
			outputimage.src = "src/img/bg2.jpg";
			utility.hiddenElement(divUploadImage, "block");
			utility.hiddenAlertElement(inputimagecustomalert);
			break;
		case "custom":
			utility.displayElement(divUploadImage, "block");
			inputimagecustom.addEventListener("change", function (event) {
				if (event.target.files.length > 0) {
					let arrayFile = inputimagecustom.value.toLowerCase().split(".");
					let typeFile = arrayFile[arrayFile.length - 1];
					if (utility.searchStringInArray(typeFile, arrayFileValidate)) {
						// let reader = new FileReader();
						// reader.onload = function (e) {
						// 	console.log(e.target.result);
						// 	outputimage.src = e.target.result;
						// };
						// reader.readAsDataURL(event.target.files[0]);

						// console.log(event.target.files[0]);
						// console.log(URL.createObjectURL(event.target.files[0]));
						outputimage.src = URL.createObjectURL(event.target.files[0]);
						utility.hiddenAlertElement(inputimagecustomalert);
					} else {
						utility.displayAlertElement(inputimagecustomalert, "File type must be png, jpg, jpeg, jfif, and svg");
					}
				}
			});
			break;
	}
});

// Input Font

inputfont.addEventListener("change", function () {
	switch (inputfont.value) {
		case "default":
			cardcanvas.style.fontFamily = ["Poppins", "sans-serif"];
			break;
		case "itim":
			cardcanvas.style.fontFamily = ["Dancing Script", "cursive"];
			break;
		case "dancing":
			cardcanvas.style.fontFamily = ["Itim", "cursive"];
			break;
		case "cookie":
			cardcanvas.style.fontFamily = ["Cookie", "cursive"];
			break;
		case "kalam":
			cardcanvas.style.fontFamily = ["Kalam", "cursive"];
			break;
		case "merienda":
			cardcanvas.style.fontFamily = ["Merienda", "cursive"];
			break;
	}
});

// Reset Button
buttonreset.onclick = reset;

buttonresetsmscreen.onclick = reset;
