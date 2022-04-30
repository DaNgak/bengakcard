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

// Button
const buttondownload = document.querySelector("#buttondownload");
const buttonreset = document.querySelector("#buttonreset");
const buttonrandomphoto = document.querySelector("#buttonrandomphoto");

// Div element
const divElementButtonRandom = document.querySelector("#divbuttonrandom");
const divUploadImage = document.querySelector("#divuploadimage");

function init() {
	fetch(pathInit)
		.then((response) => response.json())
		.then((baseReloadPage) => {
			inputname.value = baseReloadPage.name;
			outputname.innerText = baseReloadPage.name;
			inputmessage.value = baseReloadPage.message;
			outputmessage.innerText = baseReloadPage.message;
			inputtextcolor.value = baseReloadPage.textColor;
			inputblendopacity.value = baseReloadPage.blendopacity;
			blendElement.style.backgroundColor = baseReloadPage.blendColor;
			blendElement.style.opacity = baseReloadPage.blendopacity;
		})
		.catch((error) => console.log(error));
}

init();

function inputPreview(component, event, outputcomponent, maxsize, alertcomponent) {
	component.addEventListener(event, function () {
		if (component.value.length == 0) {
			displayAlertElement(alertcomponent, "Text cannot be empty (required)");
		} else if (component.value.length >= maxsize) {
			if (component.value.length == maxsize) {
				displayAlertElement(alertcomponent, "Text cannot be more than " + maxsize + " characters");
				outputcomponent.innerText = component.value;
			} else {
				displayAlertElement(alertcomponent, "Text over limit, max " + maxsize + " characters");
			}
		} else {
			outputcomponent.innerText = component.value;
			hiddenAlertElement(alertcomponent);
		}
	});
}

function displayAlertElement(element, message) {
	element.classList.remove("hidden");
	element.classList.add("block");
	element.innerText = message;
}

function hiddenAlertElement(element) {
	element.classList.remove("block");
	element.classList.add("hidden");
	element.innerText = "";
}

function displayElement(element, display) {
	element.classList.remove("hidden");
	element.classList.add(display);
}

function hiddenElement(element, display) {
	element.classList.remove(display);
	element.classList.add("hidden");
}

// Name
inputPreview(inputname, "keyup", outputname, 30, namealert);

// Message List
inputPreview(inputmessage, "keyup", outputmessage, 220, messagetextalert);

// Message List
inputmessagelist.addEventListener("change", function () {
	fetch(pathDataSource)
		.then((response) => response.json())
		.then((data) => {
			switch (inputmessagelist.value) {
				case "default":
					outputmessage.innerText = data.message.default;
					inputmessage.value = data.message.default;
					hiddenAlertElement(messagetextalert);
					break;
				case "indonesia":
					outputmessage.innerText = data.message.indonesia;
					inputmessage.value = data.message.indonesia;
					hiddenAlertElement(messagetextalert);
					break;
				case "english":
					outputmessage.innerText = data.message.english;
					inputmessage.value = data.message.english;
					hiddenAlertElement(messagetextalert);
					break;
				case "jepang":
					outputmessage.innerText = data.message.jepang;
					inputmessage.value = data.message.jepang;
					hiddenAlertElement(messagetextalert);
					break;
				case "arab":
					outputmessage.innerText = data.message.arab;
					inputmessage.value = data.message.arab;
					hiddenAlertElement(messagetextalert);
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
		hiddenAlertElement(blendopacityalert);
	} else {
		if (inputblendopacity.value.length == "") {
			displayAlertElement(blendopacityalert, "Value opacity cannot be empty (required)");
		} else {
			displayAlertElement(blendopacityalert, "Value opacity must be between 0 and 1");
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
			hiddenElement(divElementButtonRandom, "flex");
			divElementButtonRandom.classList.remove("justify-center");
			hiddenElement(divUploadImage, "flex");
			divUploadImage.classList.remove("justify-center");
			outputimage.src = "src/img/bg-default.jpg";
			break;
		case "bg1":
			hiddenElement(divElementButtonRandom, "flex");
			divElementButtonRandom.classList.remove("justify-center");
			hiddenElement(divUploadImage, "flex");
			divUploadImage.classList.remove("justify-center");
			outputimage.src = "src/img/bg1.jpg";
			break;
		case "bg2":
			hiddenElement(divElementButtonRandom, "flex");
			divElementButtonRandom.classList.remove("justify-center");
			hiddenElement(divUploadImage, "flex");
			divUploadImage.classList.remove("justify-center");
			outputimage.src = "src/img/bg2.jpg";
			break;
		case "random":
			displayElement(divElementButtonRandom, "flex");
			divElementButtonRandom.classList.add("justify-center");
			hiddenElement(divUploadImage, "flex");
			divUploadImage.classList.remove("justify-center");
			outputimage.src = "src/img/bg-test.jpg";
			break;
		case "custom":
			hiddenElement(divElementButtonRandom, "flex");
			divElementButtonRandom.classList.remove("justify-center");
			displayElement(divUploadImage, "flex");
			divUploadImage.classList.add("justify-center");
			break;
	}
});

// Download Button
buttondownload.onclick = function () {
	html2canvas(cardcanvas).then((canvas) => {
		const imageUrl = canvas.toDataURL("image/png");
		let redirect = document.createElement("a");
		redirect.setAttribute("href", imageUrl);
		redirect.setAttribute("download", "bengakcard.png");
		redirect.click();
		redirect.remove();
	});
};

// Reset Button
buttonreset.onclick = function () {
	init();
};

// Random Photo Button
buttonrandomphoto.addEventListener("click", function () {
	outputimage.src = "https://source.unsplash.com/1900x1200?mosque";
});
// buttonrandomphoto.onclick = function () {
// 	outputimage.src = "https://source.unsplash.com/1900x1200?mosque";
// };
