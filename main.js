$(document).ready(function() {
	// Check for smartphones and tablets (Doesn't detect touch screen PCs)
	var touchDevice = 'ontouchstart' in document.documentElement;
	// Gets each background_layer item and each navigation item
	let contentSections = $('.background_layer'),
		navigationItems = $('.nav_bar a'),
		headingItems = $('.heading'),
		headingLineItems = $('.headingLine');
		
	// Updates the navigation dot on page load
	updateNavigation();
	// Gets a new set of photos on page load
	generatePhotos();
	
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
	
	// Updates the navigation dot when a user, or a js function, scrolls
	$(window).on('scroll', function() {
		updateNavigation();
		scrollEffect();
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
	
	// Function that updates positions of all headings and lines
	function scrollEffect() {
		let ratio = screen.height / screen.width * 15
		// Loop through each heading item
		Array.prototype.forEach.call(headingItems, function(element) {
			// Magic maths that updates the left margin depending on the position of it's background_layer
			element.style.marginLeft =  Math.min(-(element.parentElement.getBoundingClientRect().top/ratio) + 50, 50) + "vw"
		});
		// Loop through each heading line item
		if(touchDevice) {
			// Mobile devices break when underline is too far right so it comes in with the heading from the left
			Array.prototype.forEach.call(headingLineItems, function(element) {
				// Magic maths that updates the left margin depending on the position of it's background_layer
				element.style.marginLeft =  Math.min(-(element.parentElement.getBoundingClientRect().top/ratio) + 50, 50) + "vw"
			});
		} else {
			Array.prototype.forEach.call(headingLineItems, function(element) {
				// Magic maths that updates the left margin depending on the position of it's background_layer
				element.style.marginLeft =  Math.max((element.parentElement.getBoundingClientRect().top/ratio) + 50, 50) + "vw"
			});
		}
	}
	
	// Function that generates a set of photos and appends them to the photoGallery element
	function generatePhotos() {
		let numbers = [];
		let i;
		// Loops through the number of photos needed
		for (i = 1; i < 9; i++) {
			do {
				// Generates a random number between 1 and the number of photos available
				var rand = Math.floor((Math.random() * 106) + 1);
				// Checks if the number has already been generated this round
				var check = numbers.includes(rand);	
				numbers.push(rand);
			} while (check);
			
			// greates a photos div element and the img element
			let div = document.createElement("div");
			div.setAttribute("class", "photo");
			let img = document.createElement("IMG");
			img.setAttribute("src", "images/compressed/" + rand + ".jpeg");
			// Adds the img element to the div then the div element to the photoGallery
			div.appendChild(img);
			document.getElementById('photoGallery').appendChild(div);  
		}
		
	}
});
