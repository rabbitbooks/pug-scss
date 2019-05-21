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
	// initPageSlider()
	initWorkSlider()
})


const $slider = $('.js-page-slider')
const asideNavi = document.querySelectorAll('.navi li');
const pages = document.querySelectorAll('.js-page-slider section');

const findActiveSlide = () => {
	let slideNum;
	pages.forEach((item, index) => {
		if (item.classList.contains('page-slide--is-active')) {
			slideNum = index
		}
	})
	return slideNum
}

let isAnimationComplite = true

const changeSlide = (activeSlide, targetSlide) => {
	if (activeSlide == targetSlide || !isAnimationComplite) return
	isAnimationComplite = false

	const pagesCount = pages.length - 1

	if (targetSlide > pagesCount) {
		targetSlide = 0
	} else if (targetSlide < 0) {
		targetSlide = pagesCount
	}

	if (targetSlide != 0) {
		document.querySelector('.header.btn-main')
	}

	const direction = activeSlide < targetSlide ? 'up' : 'down'
	pages[activeSlide].classList.remove('page-slide--is-active')
	pages[targetSlide].classList.add('page-slide--is-active', `slide_${direction}`)

	setTimeout(() => {
		isAnimationComplite = true
	}, 500)
}

asideNavi.forEach((item, index) => {
	item.onclick = () => {
		changeSlide(findActiveSlide(), index)
	}
})

$slider.mousewheel((e) => {
	e.preventDefault()
	let activeSlide = findActiveSlide()
	if (e.deltaY < 0) {
		changeSlide(activeSlide, ++activeSlide)
	} else {
		changeSlide(activeSlide, --activeSlide)
	}
})