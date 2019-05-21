const findActiveSlide = () => {
	let slideNum;
	pages.forEach((item, index) => {
		if (item.classList.contains('page-slide--is-active')) {
			slideNum = index
		}
	})
	return slideNum
}

let isAnimationComplete = true

const changeSlide = (activeSlide, targetSlide) => {
	if (activeSlide == targetSlide || !isAnimationComplete) return
	isAnimationComplete = false

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
		isAnimationComplete = true
	}, 500)
}

module.export.findActiveSlide = findActiveSlide
module.export.changeSlide = changeSlide