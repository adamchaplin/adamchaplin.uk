$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    updateNavigation();
	// Make sure this.hash has a value before overriding default behavior
	if (this.hash !== "") {
	  // Prevent default anchor click behavior
	  event.preventDefault();

	  // Store hash
	  let hash = this.hash;

	  // Using jQuery's animate() method to add smooth page scroll
	  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	  $('html, body').animate({
		scrollTop: $(hash).offset().top
	  }, 800);
	}
  });

	let dot = document.getElementsByClassName("dot");
	let label = document.getElementsByClassName("label");
	setTimeout(function() {
	  Array.prototype.forEach.call(dot, function (element, i) {
	    setTimeout(function() {
			element.style.transform = "scale(1)";
			setTimeout(function() {
				element.removeAttribute('style');
			}, 200);
		}, 100 * i);
	  });
	  Array.prototype.forEach.call(label, function (element, i) {
	    setTimeout(function() {
			element.style.opacity = 1;
			setTimeout(function() {
				element.removeAttribute('style');
			}, 200);
		}, 100 * i);
	  });
	},500);
	
	let contentSections = $('.background_layer')
      , navigationItems = $('.nav_bar a');
    updateNavigation();
    $(window).on('scroll', function() {
        updateNavigation();
    });

    function updateNavigation() {
        Array.prototype.forEach.call(contentSections, function(element) {
            let activeSection = $('.nav_bar a[href="#' + element.id + '"]').data('number') - 1;
            if ((element.getBoundingClientRect().top - $(window)[0].innerHeight / 2 < 0) 
            	&& (element.getBoundingClientRect().top + element.getBoundingClientRect().height - $(window)[0].innerHeight / 2 > 0)) {
                navigationItems.eq(activeSection).addClass('is-selected');
            } else {
                navigationItems.eq(activeSection).removeClass('is-selected');
            }
        });
    }
});