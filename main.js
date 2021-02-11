$(document).ready(function() {
	// Smooth scrolling for links
	$("a").on('click', function(event) {

		updateNavigation();
		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();

			// Store hash
			let hash = this.hash;

			// Using jQuery's animate() method to add smooth page scroll
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800);
		}
	});

	// Animation of nav items on page load
	let dot = document.getElementsByClassName("dot");
	let label = document.getElementsByClassName("label");
	setTimeout(function() {
		// Animation on each navigation dot
		Array.prototype.forEach.call(dot, function(element, i) {
			setTimeout(function() {
				element.style.transform = "scale(1)";
				setTimeout(function() {
					element.removeAttribute('style');
				}, 200);
			}, 100 * i);
		});
		// Animation on each navigation label
		Array.prototype.forEach.call(label, function(element, i) {
			setTimeout(function() {
				element.style.opacity = 1;
				setTimeout(function() {
					element.removeAttribute('style');
				}, 200);
			}, 100 * i);
		});
	}, 500);

	// Gets each background_layer item and each navigation item
	let contentSections = $('.background_layer'),
		navigationItems = $('.nav_bar a');
		
	// Updates the navigation dot on page load
	updateNavigation();
	
	// Updates the navigation dot when a user, or a js function, scrolls
	$(window).on('scroll', function() {
		updateNavigation();
	});

	// Function that updates the navigation dot to highlight the current page
	function updateNavigation() {
		// Loop through each navigation item
		Array.prototype.forEach.call(contentSections, function(element) {
			// Get the data number for the current navigation item
			let activeSection = $('.nav_bar a[href="#' + element.id + '"]').data('number') - 1;
			// Checks current item view against users screen view and updates the 'is-selected' class
			if ((element.getBoundingClientRect().top - $(window)[0].innerHeight / 2 < 0) && (element.getBoundingClientRect().top + element.getBoundingClientRect().height - $(window)[0].innerHeight / 2 > 0)) {
				navigationItems.eq(activeSection).addClass('is-selected');
			} else {
				navigationItems.eq(activeSection).removeClass('is-selected');
			}
		});
	}
});