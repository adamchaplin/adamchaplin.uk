$(document).ready(function() {
	// Check for smartphones and tablets (Doesn't detect touch screen PCs)
	var touchDevice = 'ontouchstart' in document.documentElement;
	// Gets each background_layer item and each navigation item
	let contentSections = $('.background_layer'),
		navigationItems = $('#nav_bar a'),
		headingItems = $('.heading'),
		headingLineItems = $('.headingLine');
		
	// Updates the navigation dot on page load
	updateNavigation();
	// Loads up the about details on page load
	loadAbout();
	// Loads all experince data on page load
	generateExperience();
	// Loads all education data on page load
	generateEducation();
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
		Array.prototype.forEach.call(dot, function(el, i) {
			setTimeout(function() {
				el.style.transform = "scale(1)";
				setTimeout(function() {
					el.removeAttribute('style');
				}, 200);
			}, 100 * i);
		});
		// Animation on each navigation label
		Array.prototype.forEach.call(label, function(el, i) {
			setTimeout(function() {
				el.style.opacity = 1;
				setTimeout(function() {
					el.removeAttribute('style');
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
		Array.prototype.forEach.call(contentSections, function(el) {
			// Get the data number for the current navigation item
			let activeSection = $('#nav_bar a[href="#' + el.id + '"]').data('number') - 1;
			// Checks current item view against users screen view and updates the 'is-selected' class
			let elTop = el.getBoundingClientRect().top;
			let elHeight = el.getBoundingClientRect().height;
			let midWindow = $(window)[0].innerHeight / 2;
			if ((elTop - midWindow < 0) && (elTop + elHeight - midWindow > 0)) {
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
		Array.prototype.forEach.call(headingItems, function(el) {
			// Magic maths that updates the left margin depending on the position of it's background_layer
			el.style.marginLeft =  Math.min(-(el.parentElement.getBoundingClientRect().top/ratio) + 50, 50) + "vw"
		});
		// Loop through each heading line item
		if(touchDevice) {
			// Mobile devices break when underline is too far right so it comes in with the heading from the left
			Array.prototype.forEach.call(headingLineItems, function(el) {
				// Magic maths that updates the left margin depending on the position of it's background_layer
				el.style.marginLeft =  Math.min(-(el.parentElement.getBoundingClientRect().top/ratio) + 50, 50) + "vw"
			});
		} else {
			Array.prototype.forEach.call(headingLineItems, function(el) {
				// Magic maths that updates the left margin depending on the position of it's background_layer
				el.style.marginLeft =  Math.max((el.parentElement.getBoundingClientRect().top/ratio) + 50, 50) + "vw"
			});
		}
	}
	
	function addPadding(el) {
		let navWidth = document.getElementById('nav_bar').getBoundingClientRect().width;
		el.style.paddingLeft = navWidth*1.1 + 'px';
	}
	
	function loadAbout() {
		let aboutBlock = document.getElementById('aboutBlock');
		addPadding(aboutBlock);
	}
	
	function generateExperience() {
		let experienceTimeline = document.getElementById('experienceTimeline');
		addPadding(experienceTimeline);
		
		let bgBound = document.getElementById('two').getBoundingClientRect();
		
		let experienceText = '{ "experience" : [' +
			'{ "title":"Technology Development Programme, Analyst", "company":"Nationwide Building Society", "location":"Swindon, UK", "dates":"September 2019 - present", "desc":"Following a 3-month training course on software development, I joined the digital API hub. This team was mainly focused on Open Banking and I spent the beginning of my time, along with others on the TDP, developing an application to externally test API endpoints. This was a great opportunity to develop my learning." }' + 
			', { "title":"Undergraduate Software Analyst/ Developer", "company":"Gamma Telecom Holdings Limited", "location":"Newbury, UK", "dates":"June 2017 - July 2018", "desc":"Working on Horizon dealing mainly with Java, Spring Boot, Wicket, JavaScript, and SQL, updating both the front and back end services of the website. My biggest achievement here was when the other placement student and I took on and completed a project to allow customers to tailor the look of the website to match their theme. This involved understanding and updating a lot of the current code as well as designing database tables to assist the functionality. A lot of interest was generated in this product and it produced a healthy profit." }' + 
			', { "title":"Audio and Visual Technician", "company":"Network Vineyard Church & West End Church", "location":"Reading, UK & Fareham, UK", "dates":"September 2010 - August 2019", "desc":"At the main service on Sunday as well as at other events I control the sound and projection.  This also includes checking the equipment before the service and helping guest speakers connect their laptops to our system and transferring files onto our computer." }' + 
			', { "title":"Youth group Leader", "company":"West End Church & Duncan Road Church", "location":"Fareham, UK & Park Gate, UK", "dates":"September 2010 - August 2019", "desc":"I plan and lead games for groups of children with ages ranging between 4 and 15 at three different youth groups. Two groups range in age from 4 to 11 and a third group caters for 11 to 15 year olds." }' + 
			', { "title":"Camp Leader", "company":"South Hants Bible Camp & Good News Camp", "location":"Romsey, UK", "dates":"Yearly, August 2012-2017", "desc":"I was responsible for a group of children aged 9 -12 years at South Hants Bible Camps and 8-15 at Good News Camps. Each involved leading activities and assisting with any problems the children may have throughout the week. Health and Safety and Child Protection guidelines were very important and had to be learnt and adhered to. Working as a team and being enthusiastic were important throughout the week." }' + 
			', { "title":"Sunday School Teacher", "company":"Network Vineyard Church & West End Church", "location":"Reading, UK & Fareham, UK", "dates":"Yearly, September 2012-2015", "desc":"I helped plan and lead activities and a relating story for a group of children aged between 3 and 10 years on a monthly rota basis. I have also been involved in a children’s ‘fun day’ event for school years reception to year 6 which happens every 3 months." }' + 
			']}';
		let exObj = JSON.parse(experienceText);
		// Loops through the number of photos needed
		for (let i = 0; i < exObj.experience.length; i++) {
			
			
			// greates a photos div element and the img element
			let div = document.createElement("div");
			div.setAttribute("class", "experience");
			div.style.minHeight = (bgBound.height-(experienceTimeline.y-bgBound.y)*1.5)/2 + 'px';
			div.style.maxHeight = (bgBound.height-(experienceTimeline.y-bgBound.y)*1.5)/2 + 'px';
			div.style.maxWidth = bgBound.width/3 + 'px';
		
			let titleEl = document.createElement("p");
			titleEl.innerHTML = exObj.experience[i].title;
			let companyEl = document.createElement("p");
			companyEl.innerHTML = exObj.experience[i].company;
			
			// Adds the img element to the div then the div element to the photoGallery
			div.appendChild(titleEl);
			div.appendChild(companyEl);
			document.getElementById('experienceTimeline').appendChild(div);  
		}
		
	}
	
	function generateEducation() {
		let educationTimeline = document.getElementById('educationTimeline');
		addPadding(educationTimeline);
		
		let bgBound = document.getElementById('three').getBoundingClientRect();
		
		let educationText = '{ "education" : [' +
			'{ "place":"University of Reading, Analyst", "level":"BSc Computer Science", "grade":"First Class", "subjects":["Maths","Software Engineering","Databases","Software Quality and Testing","Information Security","Artificial Intelligence"]}' + 
			', { "place":"Barton Peveril College", "level":"A-Level", "grade":"BBC", "subjects":["Electronics","Computing","Maths"]}' + 
			', { "place":"Brookfield School", "level":"GCSE", "grade":"10 A*-C", "subjects":["Maths(A)","English(CC)","Science(ABCC)"]}' + 
			']}';
		let edObj = JSON.parse(educationText);
		// Loops through the number of photos needed
		for (let i = 0; i < edObj.education.length; i++) {
			
			
			// greates a photos div element and the img element
			let div = document.createElement("div");
			div.setAttribute("class", "education");
			div.style.minHeight = (bgBound.height-(experienceTimeline.y-bgBound.y)*1.5)/2 + 'px';
			div.style.maxHeight = (bgBound.height-(experienceTimeline.y-bgBound.y)*1.5)/2 + 'px';
			div.style.maxWidth = bgBound.width/3 + 'px';
		
			let placeEl = document.createElement("p");
			placeEl.innerHTML = edObj.education[i].place;
			let levelEl = document.createElement("p");
			levelEl.innerHTML = edObj.education[i].level;
			
			// Adds the img element to the div then the div element to the photoGallery
			div.appendChild(placeEl);
			div.appendChild(levelEl);
			document.getElementById('educationTimeline').appendChild(div);  
		}
		
	}
	
	// Function that generates a set of photos and appends them to the photoGallery element
	function generatePhotos() {
		let photoGallery = document.getElementById('photoGallery');
		addPadding(photoGallery);
		
		let navWidth = document.getElementById('nav_bar').getBoundingClientRect().width;
		let bgWidth = document.getElementById('five').getBoundingClientRect().width;
		let photoWidth = (bgWidth-navWidth)/3 + "px";
		let numbers = [];
		// Loops through the number of photos needed
		for (let i = 1; i < 9; i++) {
			do {
				// Generates a random number between 1 and the number of photos available
				var rand = Math.floor((Math.random() * 106) + 1);
				// Checks if the number has already been generated this round
				var check = numbers.includes(rand);	
				numbers.push(rand);
			} while (check);
			
			// Creates a photos div element and the img element
			let div = document.createElement("div");
			div.setAttribute("class", "photo");
			//div.style.width = photoWidth;
			let img = document.createElement("img");
			//img.style.width = photoWidth;
			//img.style.height = photoWidth;
			img.setAttribute("src", "images/compressed/" + rand + ".jpeg");
			// Adds the img element to the div then the div element to the photoGallery
			div.appendChild(img);
			photoGallery.appendChild(div);  
		}
		
	}
});
