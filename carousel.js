const images = Array.from(document.getElementsByClassName('carousel-image'))
const nav = document.getElementById('carousel-nav')
const carousel = document.getElementById('carousel')


// Contains the HTML elements of the small black boxes 
// that appear at the bottom of the carousel
const links = []

for (const [i, _] of images.entries()) {
  const link = nav.appendChild(document.createElement('div'))
  link.classList.add('carousel-nav-link')
  link.onclick = () => select(i)
  links.push(link)
}



const prev = document.getElementById('prev')
const next = document.getElementById('next')


let selected = 0

/**
 * Moves the carousel to the selected position,
 * and updates the links to highlight the correct one
 * 
 * @param {number} index the index of the image to select
 */
function select(index) {
  // Remove highlight from current link
  links[selected].classList.remove('selected')
  
  selected = index

  // Add highlight to newly selected link and move the carousel
  links[selected].classList.add('selected')
  carousel.classList.add('adjusting')
  carousel.style.transform = `translateX(-${selected * 100}%)`

  // Hide/show the next/prev arrows
  if (selected === images.length - 1) {
    next.style.display = 'none'
  }
  else if (selected === 0) {
    prev.style.display = 'none'
  }
  else {
    prev.style.display = 'flex'
    next.style.display = 'flex'
  }
}

// Select the first image in the carousel
select(0)


/*
 * Manage the pop-up that appears when
 * selecting an image in the carousel
 */
const popup_div = document.getElementById('carousel-popup')
popup_div.onclick = () => popup_div.classList.remove('show')

const popup_img = popup_div.children[0]

const image_on_click = () => {
  popup_div.classList.add('show')
  // Use the selected image and not the image that has been clicked
  // to prevent a missmatch when someone clicks while the carousel
  // is moving
  popup_img.src = images[selected].src
  popup_img.alt = images[selected].alt
}

for (const image of images) {
  image.onclick = image_on_click
}





let start_x = 0
let start_y = 0

carousel.addEventListener('touchstart', function (e) {
  const evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent
  const touch = evt.touches[0] || evt.changedTouches[0]

  start_x = touch.screenX
  start_y = touch.screenY
}, { passive: true })

carousel.addEventListener('touchmove', function (e) {
  const evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent
  const touch = evt.touches[0] || evt.changedTouches[0]

  const y_diff = start_y - touch.screenY
  const x_diff = start_x - touch.screenX

  // Threshold in px that determines whether a swipe is 
  // considered to go up or not
  const y_treshold = 200
  if (Math.abs(y_diff) > y_treshold) {
    return
  }

  // Make sure this translation is not being animated
  // this interaction needs instant feedback
  carousel.classList.remove('adjusting')
  carousel.style.transform = `translateX(calc(-${selected * 100}% - ${x_diff}px))`
}, { passive: true })

carousel.addEventListener('touchend', function (e) {
  const evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent
  const touch = evt.touches[0] || evt.changedTouches[0]

  const y_diff = start_y - touch.screenY
  const x_diff = start_x - touch.screenX

  // Ignore vertical swipes and nullify
  // any changes made by the touchmove listener
  if (Math.abs(x_diff) < Math.abs(y_diff)) {
    return select(selected)
  }

  // Smallest distance (in px) a swipe must be to be proccessed
  const swipe_threshold = carousel.clientWidth / 4
  if (Math.abs(x_diff) < swipe_threshold) {
    return select(selected)  // nullify the effect of the swipes
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

  // Correct the offset that was applied by the touchmove listener
  // when at a limit
  if (x_diff < 0 && selected === 0 ||
      x_diff > 0 && selected === images.length - 1) {
    return select(selected)
  }
})


prev.addEventListener('click', function () {
  if (selected === 0) {
    return
  }
  select(selected-1)
})

next.addEventListener('click', function () {
  if (selected === images.length - 1) {
    return
  }
  select(selected+1)  
})
