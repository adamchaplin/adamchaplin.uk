$(document).ready(function() {
	// Sets up constants
	const photosAvailable = 200;
	// Check for smartphones and tablets (Doesn't detect touch screen PCs)
	var touchDevice = 'ontouchstart' in document.documentElement;
	// Gets lists of items used throughout the code
	let contentSections = $('.background_layer'),
		navigationItems = $('#nav_bar a'),
		headingItems = $('.heading'),
		headingLineItems = $('.heading_line');

	let jsonData = getData()

	// Adds 
	loadNav();
	// Updates the navigation dot on page load
	updateNavigation();
	// Loads all professional experince data on page load
	generateProfessionalExperience(jsonData);
	// Loads all volunteer experince data on page load
	generateVolunteerExperience(jsonData);
	// Loads all education data on page load
	generateEducation(jsonData);
	// Loads all programming data on page load
	generateProgramming(jsonData);
	// Gets a new set of photos on page load
	generatePhotos();
	
	// Smooth scrolling for links
	$('a').on('click', function(event) {

		updateNavigation();
		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== '') {
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
	let dot = document.getElementsByClassName('dot');
	let label = document.getElementsByClassName('label');
	setTimeout(function() {
		// Animation on each navigation dot
		Array.prototype.forEach.call(dot, function(el, i) {
			setTimeout(function() {
				el.style.transform = 'scale(1)';
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
		if(isScreenLandscape()){
			updateNavigation();
		}
		//scrollEffect(); stopped this due to it looking funny with the nav separator
	});

	// Updates the nav when window is resized
	$(window).on('resize', function() {
		loadNav();	
		updateNavigation();
	});
	
	// Updates different aspects of the nav bar
	function loadNav() {
		// Checks if the aspect ratio is less than 1:1
		if(isScreenLandscape()){
			document.getElementById('contact_block').style.removeProperty("left");
			document.getElementById('contact_block').style.removeProperty("transform");
			document.getElementById('contact_block').style.removeProperty("right");
			document.getElementById('nav_bar').style.removeProperty("content-visibility");
			document.getElementById('nav_separator').style.removeProperty("border");
			// Updates the padding for all windows
			addAllPadding(1.04, 1.1);
			let navigationListItems = $('#nav_bar li');	
			// Loop through each navigation item
			Array.prototype.forEach.call(navigationListItems, function(el) {
				let label = el.querySelector('.label');
				let some = label.getBoundingClientRect();
					el.style.marginTop = 0;
				
			});
		} else {
			document.getElementById('nav_bar').style.contentVisibility = "hidden";
			document.getElementById('nav_separator').style.border = "hidden";
			// Updates the padding for all windows
			addAllPadding(0, 0);
			document.getElementById('contact_block').style.left = "50%";
			document.getElementById('contact_block').style.transform = "translate(-50%, 0)";
			document.getElementById('contact_block').style.right = "auto";
			
		}
	}

	// Updates the navigation dot to highlight the current page
	function updateNavigation() {
		// Loop through each background item
		Array.prototype.forEach.call(contentSections, function(el) {
			// Get the data number for the current background item
			let activeSection = $('#nav_bar a[href="#' + el.id + '"]').data('number') - 1;
			let elTop = el.getBoundingClientRect().top;
			let elHeight = el.getBoundingClientRect().height;
			let midWindow = $(window)[0].innerHeight / 2;
			// Checks current item view against users screen view and updates the 'is-selected' class
			if ((elTop - midWindow < 0) && (elTop + elHeight - midWindow > 0)) {
				navigationItems.eq(activeSection).addClass('is-selected');
			} else {
				navigationItems.eq(activeSection).removeClass('is-selected');
			}
		});
	}
	
	// Updates positions of all headings and lines
	function scrollEffect() {
		let ratio = screen.height / screen.width * 15
		// Loop through each heading item
		Array.prototype.forEach.call(headingItems, function(el) {
			// Magic maths that updates the left margin depending on the position of it's background_layer
			el.style.marginLeft =  Math.min(-(el.parentElement.getBoundingClientRect().top/ratio) + 50, 50) + 'vw'
		});
		// Loop through each heading line item
		if(touchDevice) {
			// Mobile devices break when underline is too far right so it comes in with the heading from the left
			Array.prototype.forEach.call(headingLineItems, function(el) {
				// Magic maths that updates the left margin depending on the position of it's background_layer
				el.style.marginLeft =  Math.min(-(el.parentElement.getBoundingClientRect().top/ratio) + 50, 50) + 'vw'
			});
		} else {
			Array.prototype.forEach.call(headingLineItems, function(el) {
				// Magic maths that updates the left margin depending on the position of it's background_layer
				el.style.marginLeft =  Math.max((el.parentElement.getBoundingClientRect().top/ratio) + 50, 50) + 'vw'
			});
		}
	}
	
	// Adds padding to all backgrounds that need it
	function addAllPadding(navSeparator, pages) {
		let navLine = document.getElementById('nav_separator');
		let aboutBlock = document.getElementById('about_block');
		let profExperienceTimeline = document.getElementById('prof_experience_timeline');
		let volExperienceTimeline = document.getElementById('vol_experience_timeline');
		let educationTimeline = document.getElementById('education_timeline');
		let programmingTimeline = document.getElementById('programming_timeline');
		let photoGallery = document.getElementById('photo_gallery');
		let logoBackground = document.getElementById('logo_block');
		addPadding(navLine, navSeparator);
		addPadding(aboutBlock, pages);
		addPadding(profExperienceTimeline, pages);
		addPadding(volExperienceTimeline, pages);
		addPadding(educationTimeline, pages);
		addPadding(programmingTimeline, pages);
		addPadding(photoGallery, pages);
		addPadding(logoBackground, navSeparator);
	}
	
	// Adds padding to the element 'el'
	function addPadding(el, mul) {
		let navWidth = document.getElementById('nav_bar').getBoundingClientRect().width;
		el.style.marginLeft = navWidth*mul + 'px';
	}
	
	// Adds experience information to the experience_timeline element
	function generateProfessionalExperience(jsonData) {
		let experienceTimeline = document.getElementById('prof_experience_timeline');
		let bgBound = document.getElementById('two').getBoundingClientRect();
		// Loops through the number of experience objects
		for (let i = 0; i < jsonData.profExperience.length; i++) {
			// Creates an experince div element and adds styles and classes
			let div = document.createElement('div');
			div.setAttribute('class', 'prof_experience');
			div.style.minHeight = (bgBound.height-(experienceTimeline.y-bgBound.y)*1.5)/2 + 'px';
			div.style.maxHeight = (bgBound.height-(experienceTimeline.y-bgBound.y)*1.5)/2 + 'px';
			if(isScreenLandscape()){
				div.style.maxWidth = bgBound.width/4 + 'px';
			} else {
				div.style.maxWidth = bgBound.width/1.2 + 'px';
			}
		
			let titleEl = document.createElement('p');
			titleEl.innerHTML = jsonData.profExperience[i].title;
			let companyEl = document.createElement('p');
			companyEl.innerHTML = jsonData.profExperience[i].company;
			let datesEl = document.createElement('p');
			datesEl.innerHTML = jsonData.profExperience[i].dates;
			let techEl = document.createElement('p');
			techEl.innerHTML = jsonData.profExperience[i].technologies.join(", ");
			
			// Adds the elements to the div then the div element to experience_timeline
			div.appendChild(titleEl);
			div.appendChild(companyEl);
			div.appendChild(datesEl);
			div.appendChild(techEl);
			experienceTimeline.appendChild(div);  
		}
		
	}
	
	// Adds experience information to the experience_timeline element
	function generateVolunteerExperience(jsonData) {
		let experienceTimeline = document.getElementById('vol_experience_timeline');
		let bgBound = document.getElementById('three').getBoundingClientRect();
		// Loops through the number of experience objects
		for (let i = 0; i < jsonData.volExperience.length; i++) {
			// Creates an experince div element and adds styles and classes
			let div = document.createElement('div');
			div.setAttribute('class', 'vol_experience');
			div.style.minHeight = (bgBound.height-(experienceTimeline.y-bgBound.y)*1.5)/2 + 'px';
			div.style.maxHeight = (bgBound.height-(experienceTimeline.y-bgBound.y)*1.5)/2 + 'px';
			if(isScreenLandscape()){
				div.style.maxWidth = bgBound.width/4 + 'px';
			} else {
				div.style.maxWidth = bgBound.width/1.2 + 'px';
			}

			let titleVEl = document.createElement('p');
			titleVEl.innerHTML = jsonData.volExperience[i].title;
			let companyVEl = document.createElement('p');
			companyVEl.innerHTML = jsonData.volExperience[i].company;
			let datesVEl = document.createElement('p');
			datesVEl.innerHTML = jsonData.volExperience[i].dates;
			
			// Adds the elements to the div then the div element to experience_timeline
			div.appendChild(titleVEl);
			div.appendChild(companyVEl);
			div.appendChild(datesVEl);
			experienceTimeline.appendChild(div);  
		}
		
	}
	
	// Adds education information to the education_timeline element
	function generateEducation(jsonData) {
		let educationTimeline = document.getElementById('education_timeline');
		let bgBound = document.getElementById('four').getBoundingClientRect();
		// Loops through the number of education objects
		for (let i = 0; i < jsonData.education.length; i++) {
			// Creates an education div element and adds styles and classes
			let div = document.createElement('div');
			div.setAttribute('class', 'education');
			div.style.minHeight = (bgBound.height-(educationTimeline.y-bgBound.y)*1.5)/2 + 'px';
			div.style.maxHeight = (bgBound.height-(educationTimeline.y-bgBound.y)*1.5)/2 + 'px';
			if(isScreenLandscape()){
				div.style.maxWidth = bgBound.width/3 + 'px';
			} else {
				div.style.maxWidth = bgBound.width/1.2 + 'px';
			}

			let placeEl = document.createElement('p');
			placeEl.innerHTML = jsonData.education[i].place;
			let levelEl = document.createElement('p');
			levelEl.innerHTML = jsonData.education[i].level;
			let subjectsEl = document.createElement('p');
			subjectsEl.innerHTML = jsonData.education[i].subjects.join(', ');
			let gradeEl = document.createElement('p');
			gradeEl.innerHTML = jsonData.education[i].grade;
			
			// Adds the elements to the div then the div element to education_timeline
			div.appendChild(placeEl);
			div.appendChild(levelEl);
			div.appendChild(subjectsEl);
			div.appendChild(gradeEl);
			educationTimeline.appendChild(div);  
		}
	}
	
	// Adds programming information to the programming_timeline element
	function generateProgramming(jsonData) {
		let programmingTimeline = document.getElementById('programming_timeline');
		let bgBound = document.getElementById('five').getBoundingClientRect();
		// Loops through the number of programming objects
		for (let i = 0; i < jsonData.programming.length; i++) {
			// Creates an programming div element and adds styles and classes
			let div = document.createElement('div');
			div.setAttribute('class', 'programming');
			div.style.minHeight = (bgBound.height-(programmingTimeline.y-bgBound.y)*1.5)/2 + 'px';
			div.style.maxHeight = (bgBound.height-(programmingTimeline.y-bgBound.y)*1.5)/2 + 'px';
			if(isScreenLandscape()){
				div.style.maxWidth = bgBound.width/3 + 'px';
			} else {
				div.style.maxWidth = bgBound.width/1.2 + 'px';
			}

			let nameEl = document.createElement('p');
			nameEl.innerHTML = jsonData.programming[i].name;
			let githubEl = document.createElement('p');
			let githubLink = document.createElement('a');
			githubLink.innerHTML = "View code on GitHub";
			githubLink.href = jsonData.programming[i].githubLink;
			githubLink.target = "_blank"
			githubEl.appendChild(githubLink);
			let deploymentEl = document.createElement('p');
			let deploymentLink = document.createElement('a');
			deploymentLink.innerHTML = jsonData.programming[i].deploymentName;
			deploymentLink.href = jsonData.programming[i].deploymentLink;
			deploymentLink.target = "_blank"
			deploymentEl.appendChild(deploymentLink);
			
			// Adds the elements to the div then the div element to education_timeline
			div.appendChild(nameEl);
			div.appendChild(githubEl);
			div.appendChild(deploymentEl);
			programmingTimeline.appendChild(div);  
		}
		
	}
	
	// Generates a set of photos and adds them to the photoGallery element
	function generatePhotos() {
		let photoGallery = document.getElementById('photo_gallery');
		let navWidth = document.getElementById('nav_bar').getBoundingClientRect().width;
		let bgWidth = document.getElementById('six').getBoundingClientRect().width;
		let photoWidth = (bgWidth-navWidth)/3 + 'px';
		let numbers = [];
		// Loops through the number of photos needed
		for (let i = 1; i <= 6; i++) {
			do {
				// Generates a random number between 1 and the number of photos available
				var rand = Math.floor((Math.random() * photosAvailable) + 1);
				// Checks if the number has already been generated this round
				var check = numbers.includes(rand);	
				numbers.push(rand);
			} while (check);
			
			// Creates a photos div element and the img element
			let div = document.createElement('div');
			div.setAttribute('class', 'photo');
			let img = document.createElement('img');
			img.setAttribute('src', 'images/compressed/' + rand + '.jpg');
			// Adds the element to the div then the div element to the photoGallery
			div.appendChild(img);
			photoGallery.appendChild(div);  
		}
	}

	function isScreenLandscape() {
		return $(window).width()/$(window).height()>=1
	}

	// Gets the data
	function getData() {
		// JSON object of the date, would be nice to be in a database
		let pretendDatabase = '{ "profExperience" : [' +
		'{ "title":"Software Engineer", "company":"Nationwide Building Society", "location":"London, UK", "dates":"April 2021 - January 2022", "technologies":["Java","Spring Boot","Apigee","OpenShift","JavaScript","Mongo DB","Redis","Jenkins","Maven"], "desc":"I was a key member of the team tasked to transition code from external contractors to in-house. Despite many challenges faced, I persevered and remained focused on the project goals. Throughout the process, I collaborated closely with the security team to identify, prioritize and resolve issues in the existing code base." }' + 
		', { "title":"Analyst", "company":"Nationwide Building Society", "location":"Swindon, UK", "dates":"September 2019 - April 2021", "technologies":["Java","Spring Boot","Apigee","OpenShift","JavaScript","Mongo DB","Redis","Jenkins","Maven"], "desc":"Following a 3-month training course on software development, I joined the digital API hub. This team was mainly focused on Open Banking and I spent the beginning of my time, along with others on the TDP, developing an application to externally test API endpoints. This was a great opportunity to develop my learning." }' + 
		', { "title":"Undergraduate Software Analyst/ Developer", "company":"Gamma Telecom Holdings Limited", "location":"Newbury, UK", "dates":"June 2017 - July 2018", "technologies":["Java","Spring Boot","Wicket","JavaScript","SQL","Maven"], "desc":"Working on Horizon dealing mainly with Java, Spring Boot, Wicket, JavaScript, and SQL, updating both the front and back end services of the website. My biggest achievement here was when the other placement student and I took on and completed a project to allow customers to tailor the look of the website to match their theme. This involved understanding and updating a lot of the current code as well as designing database tables to assist the functionality. A lot of interest was generated in this product and it produced a healthy profit." }' + 
		'], "volExperience" : [' +
		'{ "title":"Audio and Visual Technician", "company":"Network Vineyard Church & West End Church", "location":"Reading, UK & Fareham, UK", "dates":"September 2010 - August 2019", "desc":"At the main service on Sunday as well as at other events I control the sound and projection.  This also includes checking the equipment before the service and helping guest speakers connect their laptops to our system and transferring files onto our computer." }' + 
		', { "title":"Youth Group Leader", "company":"West End Church & Duncan Road Church", "location":"Fareham, UK & Park Gate, UK", "dates":"September 2010 - August 2019", "desc":"I plan and lead games for groups of children with ages ranging between 4 and 15 at three different youth groups. Two groups range in age from 4 to 11 and a third group caters for 11 to 15 year olds." }' + 
		', { "title":"Camp Leader", "company":"South Hants Bible Camp & Good News Camp", "location":"Romsey, UK", "dates":"Yearly, August 2012-2017", "desc":"I was responsible for a group of children aged 9 -12 years at South Hants Bible Camps and 8-15 at Good News Camps. Each involved leading activities and assisting with any problems the children may have throughout the week. Health and Safety and Child Protection guidelines were very important and had to be learnt and adhered to. Working as a team and being enthusiastic were important throughout the week." }' + 
		', { "title":"Sunday School Teacher", "company":"Network Vineyard Church & West End Church", "location":"Reading, UK & Fareham, UK", "dates":"Yearly, September 2012-2015", "desc":"I helped plan and lead activities and a relating story for a group of children aged between 3 and 10 years on a monthly rota basis. I have also been involved in a children’s ‘fun day’ event for school years reception to year 6 which happens every 3 months." }' + 
		'], "education" : [' +
		'{ "place":"University of Reading", "level":"BSc Computer Science", "grade":"First Class", "subjects":["Maths","Software Engineering","Databases","Software Quality and Testing","Information Security","Artificial Intelligence"]}' + 
		', { "place":"Barton Peveril College", "level":"A-Level", "grade":"BBC", "subjects":["Electronics","Computing","Maths"]}' + 
		', { "place":"Brookfield School", "level":"GCSE", "grade":"10 A*-C", "subjects":["Maths(A)","English(CC)","Science(ABCC)"]}' + 
		'], "programming" : [' +
		'{ "name": "Website", "githubLink": "https://github.com/adamchaplin/adamchaplin.uk", "deploymentName": "Loop back to here again", "deploymentLink": "https://adamchaplin.uk"}' +
		', { "name": "Country Counter App", "githubLink": "https://github.com/adamchaplin/CountryCounter","deploymentName": "View on the Google play store", "deploymentLink": "https://play.google.com/store/apps/details?id=uk.co.adamchaplin.countrycounter"}' +
		']}';
		return JSON.parse(pretendDatabase);
	}
});
