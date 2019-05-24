const $slider = $('.js-page-slider')
const asideNavi = document.querySelectorAll('.side-nav li')
const pages = document.querySelectorAll('.js-page-slider section')
const menuItems = document.querySelectorAll('.main-menu__item')

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

	const direction = activeSlide < targetSlide ? 'up' : 'down'
	const pagesCount = pages.length - 1

	if (targetSlide > pagesCount) {
		targetSlide = 0
	} else if (targetSlide < 0) {
		targetSlide = pagesCount
	}
	
	const headerButton = document.querySelector('.header .btn-main')
	if (targetSlide != 0 && targetSlide != 4) {
		headerButton.classList.remove('btn-main--is_hidden')
	} else {
		headerButton.classList.add('btn-main--is_hidden')
	}

	pages[activeSlide].classList.remove('page-slide--is-active')
	pages[activeSlide].classList.add(`page-slide--slide-${direction}`)
	pages[targetSlide].classList.add('page-slide--is-active')
	pages[targetSlide].classList.remove('page-slide--slide-up', 'page-slide--slide-down')
	asideNavi[activeSlide].classList.remove('side-nav__item--is-active')
	asideNavi[targetSlide].classList.add('side-nav__item--is-active')
	menuItems[activeSlide].classList.remove('main-menu__item--is-active')
	menuItems[targetSlide].classList.add('main-menu__item--is-active')


	setTimeout(() => {
		isAnimationComplite = true
	}, 400)
}
const hireButton = document.querySelectorAll('.hire-btn')

hireButton.forEach(item => {
	item.onclick = () => {
		changeSlide(findActiveSlide(), 4)
	}
})


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

// $slider.swipe( {
// 	swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
// 		let activeSlide = findActiveSlide()
// 		if (direction == 'up') {
// 			changeSlide(activeSlide, ++activeSlide)
// 		} else if (direction == 'down') {
// 			changeSlide(activeSlide, --activeSlide)
// 		}
// 	}
// })

const menuButton = document.querySelector('.main-menu-btn')
const screen = document.querySelector('.page__wrapper')
const returnView = document.querySelector('.return-view')


menuItems.forEach((item, index) => {
	item.onclick = () => {
		const activeSlide = findActiveSlide()
		menuItems[activeSlide].classList.remove('main-menu__item--is-active')
		menuItems[index].classList.add('main-menu__item--is-active')

		setTimeout(() => {
			screen.classList.remove('perspective')
		}, 70)
		
		setTimeout(() => {
			changeSlide(activeSlide, index)
		}, 430)
	}
})

returnView.onclick = () => {
	screen.classList.remove('perspective')
}

menuButton.onclick = () => {
	screen.classList.add('perspective')
}



const nextWorkSlide = (workSlider) => {
	workSlider.find('.work-slider__item:last-child').clone().prependTo(workSlider)
	workSlider.find('.work-slider__item:last-child').remove()
}
const prevWorkSlide = (workSlider) => {
	workSlider.find('.work-slider__item:first-child').clone().appendTo(workSlider)
	workSlider.find('.work-slider__item:first-child').remove()
}


const $sliderButtons = $('.work-slider__button'),
	$workSlider = $('.work-slider__wrapper')

function slideChange($clickedButton, direction = null) {
	let $workSlides = $('.work-slider__wrapper li')
	$workSlides.map((index, element) => {
		$(element).addClass('work-slider__item')
	})

	let clickDirection
	if ($clickedButton) {
		clickDirection = $clickedButton.hasClass('work-slider__button--prev') 
			? 
			clickDirection = $clickedButton.hasClass('work-slider__button--prev')
			:
			clickDirection = $clickedButton.hasClass('work-slider__button--next')
	} else {
		clickDirection = false
	}
	
	if (clickDirection || direction == 'left') {
		prevWorkSlide($workSlider)
	} else if (clickDirection || direction == 'right') {
		nextWorkSlide($workSlider)
	}
	
	$workSlides = $('.work-slider__wrapper li')
	$workSlides.each((index, element) => {
	
	let slidePosition
		if (index == 0 ) {
			slidePosition = 'left'
			$(element).removeClass().addClass('work-slider__item--' + slidePosition +' work-slider__item')
		} else if (index == 1 ) {
			slidePosition = 'center'
			$(element).removeClass().addClass('work-slider__item--' + slidePosition +' work-slider__item')
		} else if (index == 2 ) {
			slidePosition = 'right'
			$(element).removeClass().addClass('work-slider__item--' + slidePosition +' work-slider__item')
		}
	})
}

function runSliderChange($cickedButton = null, direction) {
	$workSlider.addClass('slide-change')
	setTimeout(() => {
		slideChange($cickedButton, direction)
		$workSlider.removeClass('slide-change')
	}, 300)
}

$sliderButtons.on('click', function() {
	runSliderChange($(this))
})

$(function() {
	$(".work-slider").swipe( {
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			runSliderChange(null, direction)
		}
	})
})