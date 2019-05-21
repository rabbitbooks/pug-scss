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

	if (targetSlide != 0) {
		document.querySelector('.header.btn-main')
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
		}, 570)
	}
})

returnView.onclick = () => {
	screen.classList.remove('perspective')
}

menuButton.onclick = () => {
	screen.classList.add('perspective')
}