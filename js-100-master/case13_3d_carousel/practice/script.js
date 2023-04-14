;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  const cellCount = 6
  let selectedIndex = 0
  const prevButton = get('.prev_button')
  const nextButton = get('.next_button')
  const carousel = get('.carousel')

  const rotateCarousel = () => {
    const angle = (selectedIndex / cellCount) * -360
    carousel.style.transform = `translateZ(-346px) rotateY(${angle}deg)`
  }

  prevButton.addEventListener('click', () => {
    selectedIndex--
    rotateCarousel()
  })

  nextButton.addEventListener('click', () => {
    selectedIndex++
    rotateCarousel()
  })
})()
