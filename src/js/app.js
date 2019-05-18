const initPageSlider = () => {
	const $slider = $('.js-page-slider');
	$slider.slick({
		arrows: false,
		vertical: true
	})

	$slider.mousewheel((e) => {
		e.preventDefault()
		if (e.deltaY < 0) {
			$slider.slick('slickNext')
		} else {
			$slider.slick('slickPrev')
		}
	})

	$slider.on('afterChange', function(event, slick, currentSlide){
		console.log(++currentSlide);
	});

	$slider.swipe({
		swipe: (e, direction, distance, duration, fingerCount, fingerData) => {
			if (direction == 'up') {
				$slider.slick('slickNext')
			} else {
				$slider.slick('slickPrev')
			}
		},
		treshold: 0
	})
}

const initWorkSlider = () => {
	const $workSlider = $('.js-work-slide');
	$workSlider.slick({
		slidesToShow: 3,
		loop: true,
		centerMode: true,
		arrows: true
	})
}

$(document).ready(() => {
	initPageSlider()
	initWorkSlider()
})