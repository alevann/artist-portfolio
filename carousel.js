const images = Array.from(document.getElementsByClassName('carousel-image'))
const nav = document.getElementById('carousel-nav')
const carousel = document.getElementById('carousel')


const links = []

for (const [i, _] of images.entries()) {
  const link = nav.appendChild(document.createElement('div'))
  link.classList.add('carousel-nav-link')
  link.onclick = () => select(i)
  links.push(link)
}



let selected = 0

/**
 * Moves the carousel to the selected position,
 * and updates the links to highlight the correct one
 * 
 * @param {number} index the index of the image to select
 */
function select(index) {
  links[selected].classList.remove('selected')
  
  selected = index

  links[selected].classList.add('selected')
  carousel.style.transform = `translateX(-${selected * 100}%)`
}

// Select the first image in the carousel
select(0)



let start_x = 0
let start_y = 0

carousel.addEventListener('touchstart', function (e) {
  const evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent
  const touch = evt.touches[0] || evt.changedTouches[0]

  start_x = touch.screenX
  start_y = touch.screenY
})

carousel.addEventListener('touchend', function (e) {
  const evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent
  const touch = evt.touches[0] || evt.changedTouches[0]

  const y_diff = start_y - touch.screenY
  const x_diff = start_x - touch.screenX

  // Ignore vertical swipes
  if (Math.abs(x_diff) < Math.abs(y_diff)) {
    return
  }

  // Smallest distance (in px) a swipe must be to be proccessed
  const swipe_threshold = 100
  if (Math.abs(x_diff) < swipe_threshold) {
    return
  }

  // Consume the event
  e.preventDefault()


  // Swipe left
  if (x_diff < 0 && selected > 0) {
    return select(selected-1)
  }
  // Swipe right
  if (x_diff > 0 && selected < images.length - 1) {
    return select(selected+1)
  }
})
