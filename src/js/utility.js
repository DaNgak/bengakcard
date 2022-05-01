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

function previewImage(imageinput, imageoutput) {
	const oFReader = new FileReader();
	oFReader.readAsDataURL(imageinput.files[0]);

	oFReader.onload = function (oFREvent) {
		imageoutput.src = oFREvent.target.result;
	};
}

function searchStringInArray(string, array) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] === string) {
			return true;
		}
	}
	return false;
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

export { inputPreview, previewImage, displayAlertElement, hiddenAlertElement, displayElement, hiddenElement, searchStringInArray };
