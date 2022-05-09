const carousel_view = document.getElementById('carousel-view')
const logo_view = document.getElementById('logo-view')


/**
 * Scrolls into view the passed... view
 * 
 * Called at the end of a scroll to center the correct view in the page
 * 
 * @param {HTMLElement} view should be either logo-view or carousel-view
 */
 function scroll_to_view(view) {
  view.scrollIntoView({
    block: 'start',
    inline: 'nearest',
    behavior: 'smooth' 
  })
}


// Auto-scroll the carousel into view when the arrow is clicked
const logo_scroll = document.getElementById('logo-view-scroll')
logo_scroll.onclick = () => scroll_to_view(carousel_view)



let last_intersection_ratio = 1.0
let most_visible_view = logo_view

// Callback called when the logo_view intersection threshold changes
function on_in_view(changes) {  
  const logo_view_intersection_ratio = changes[0].intersectionRatio

  const scrolling_down = logo_view_intersection_ratio < last_intersection_ratio
  const scrolling_up = logo_view_intersection_ratio > last_intersection_ratio


  const scrolling_to_carousel = most_visible_view === logo_view && scrolling_down
  const scrolling_to_logo = most_visible_view === carousel_view && scrolling_up


  if (scrolling_to_carousel) {
    most_visible_view = carousel_view
  } else if (scrolling_to_logo) {
    most_visible_view = logo_view
  }

  last_intersection_ratio = logo_view_intersection_ratio
}


// Thresholds at which an IntersectionObserver's callback should be fired
const view_scroll_thresholds = [0.0, 0.15, 0.30, 0.45, 0.60, 0.75, 0.90, 1.0]

// Intersection observer which observes the logo_view
new IntersectionObserver(on_in_view, { threshold: view_scroll_thresholds }).observe(logo_view)



let scroll_timeout_handle
document.addEventListener('scroll', function () {
  // Clear the previous timeout to prevent
  // functions firing unexpectedly or mid scroll
  clearTimeout(scroll_timeout_handle)

  // Set a new timeout which scrolls the correct view
  scroll_timeout_handle = setTimeout(() => {
    scroll_to_view(most_visible_view)
  }, 50);
}, { passive: true })
