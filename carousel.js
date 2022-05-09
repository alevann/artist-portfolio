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

