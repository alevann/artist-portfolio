const carousel_view = document.getElementById('carousel-view')
const logo_scroll = document.getElementById('logo-view-scroll')


// Auto-scroll the carousel into view when the arrow is clicked
logo_scroll.onclick = () => carousel_view.scrollIntoView({
  block: 'start',
  inline: 'nearest',
  behavior: 'smooth' 
})
