const COORDS_MIN = 0;
const COORDS_MAX = 762;
const sliderContainer = document.querySelector('.slider-block');
const pinSlider = sliderContainer.querySelector('.slider-block__button');

pinSlider.addEventListener('mousedown', function (evt) {
	evt.preventDefault();

	let pinSliderDragger = false;

	let startCoordsX = evt.clientX;

	const onMouseMove = function (moveEvt) {
		moveEvt.preventDefault();

		const shift = startCoordsX - moveEvt.clientX;

		startCoordsX = moveEvt.clientX;
		let currentCoordsX = pinSlider.offsetLeft - shift;

		if (currentCoordsX < COORDS_MIN) {
			currentCoordsX = COORDS_MIN;
		}
		else if (currentCoordsX > COORDS_MAX) {
			currentCoordsX = COORDS_MAX;
		}

		pinSlider.style.left = currentCoordsX + 'px';
	};

	const onMouseUp = function (upEvt) {
		upEvt.preventDefault();
		pinSliderDragger = true;

		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	};

	if (pinSliderDragger) {
		const onClickPreventDefault = function (clickEvt) {
			clickEvt.preventDefault();
			pinSlider.removeEventListener('click', onClickPreventDefault);
		};
		pinSlider.addEventListener('click', onClickPreventDefault);
	}

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);

});
