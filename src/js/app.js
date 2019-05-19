const $slider = $('.js-page-slider')
const initPageSlider = () => {
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

const $workSlider = $('.js-work-slide')
const initWorkSlider = () => {
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

$slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
	if (++nextSlide == 1 &&  event.target.classList.contains('js-page-slider')) {
		$('.header .btn-main').addClass('btn-main--is_hidden')
	} else {
		$('.header .btn-main').removeClass('btn-main--is_hidden')
	}
})