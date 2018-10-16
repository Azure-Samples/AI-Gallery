$( document ).ready(function() {
	/* ------------------------------------------------------ EXAMPLES ------------------------------------*/


	// duration of scroll animation
	var scrollDuration = 600;
	// paddles
	var leftPaddle_examples = document.getElementById('example-left');
	var rightPaddle_examples = document.getElementById('example-right');

	// get items dimensions
	var exampleItemsLength = $('.examplesitem').length;
	var exampleItemSize = $('.examplesitem').outerWidth(true);
	// get some relevant size for the paddle triggering point
	var paddleMargin = 20;

	// get wrapper width
	var getExampleMenuWrapperSize = function() {
		return $('#examples-menu').outerWidth();
	}
	var exampleMenuWrapperSize = getExampleMenuWrapperSize();
	// the wrapper is responsive
	$(window).on('resize', function() {
		exampleMenuWrapperSize = getExampleMenuWrapperSize();
	});
	// size of the visible part of the menu is equal as the wrapper size 
	var examplemenuVisibleSize = exampleMenuWrapperSize;

	// get total width of all menu items
	var getExampleMenuSize = function() {
		return exampleItemsLength * exampleItemSize;
	};

	var exampleMenuSize = getExampleMenuSize();
	// get how much of menu is invisible
	var exampleMenuInvisibleSize = exampleMenuSize - exampleMenuWrapperSize;

	// get how much have we scrolled to the left
	var getExampleMenuPosition = function() {
		return $('#examples-menu').scrollLeft();
	};

	// finally, what happens when we are actually scrolling the menu
	$('#examples-menu').on('scroll', function() {
		// get how much of menu is invisible
		exampleMenuInvisibleSize = exampleMenuSize - exampleMenuWrapperSize;
		// get how much have we scrolled so far
		var menuPosition = getExampleMenuPosition();
		var menuEndOffset = examplemenuVisibleSize - paddleMargin;

		// show & hide the paddles 
		// depending on scroll position
		if (menuPosition <= paddleMargin) {
			$(leftPaddle_examples).addClass('hidden');
			$(rightPaddle_examples).removeClass('hidden');
		} else if (menuPosition+examplemenuVisibleSize < exampleMenuSize) {
			// show both paddles in the middle
			$(leftPaddle_examples).removeClass('hidden');
			$(rightPaddle_examples).removeClass('hidden');
		} else if (menuPosition+examplemenuVisibleSize >= exampleMenuSize) {
			$(leftPaddle_examples).removeClass('hidden');
			$(rightPaddle_examples).addClass('hidden');
		}


		// print important values
		$('#print-wrapper-size span').text(exampleMenuWrapperSize);
		$('#print-menu-size span').text(exampleMenuSize);
		$('#print-menu-invisible-size span').text(exampleMenuInvisibleSize);
		$('#print-menu-position span').text(menuPosition);

	});


	// scroll to left
	$(rightPaddle_examples).on('click', function() {
		$('#examples-menu').animate( { scrollLeft: exampleMenuWrapperSize}, scrollDuration);
	});

	// scroll to right
	$(leftPaddle_examples).on('click', function() {
		$('#examples-menu').animate( { scrollLeft: '0' }, scrollDuration);
	});



	/* ------------------------------------------------------ MODELS ------------------------------------*/


	var leftPaddle_models = document.getElementById('model-left');
	var rightPaddle_models = document.getElementById('model-right');

	// get items dimensions
	var modelItemsLength = $('.modelsitem').length;
	var modelItemSize = $('.modelsitem').outerWidth(true);


	// get wrapper width
	var getModelMenuWrapperSize = function() {
		return $('#models-menu').outerWidth();
	}

	var modelMenuWrapperSize = getModelMenuWrapperSize();
	// the wrapper is responsive
	$(window).on('resize', function() {
		modelMenuWrapperSize = getModelMenuWrapperSize();
	});
	// size of the visible part of the menu is equal as the wrapper size 
	var modelMenuVisibleSize = modelMenuWrapperSize;

	// get total width of all menu items
	var getModelMenuSize = function() {
		return modelItemsLength * modelItemSize;
	};

	var modelMenuSize = getModelMenuSize();
	// get how much of menu is invisible
	var modelMenuInvisibleSize = modelMenuSize - modelMenuWrapperSize;

	// get how much have we scrolled to the left
	var getModelMenuPosition = function() {
		return $('#models-menu').scrollLeft();
	};

	// finally, what happens when we are actually scrolling the menu
	$('#models-menu').on('scroll', function() {

		// get how much of menu is invisible
		modelMenuInvisibleSize = modelMenuSize - modelMenuWrapperSize;
		// get how much have we scrolled so far
		var menuPosition = getModelMenuPosition();
		var menuEndOffset = modelMenuVisibleSize - paddleMargin;

		// show & hide the paddles 
		// depending on scroll position
		if (menuPosition <= paddleMargin) {
			$(leftPaddle_models).addClass('hidden');
			$(rightPaddle_models).removeClass('hidden');
		} else if (menuPosition+modelMenuVisibleSize < modelMenuSize) {
			// show both paddles in the middle
			$(leftPaddle_models).removeClass('hidden');
			$(rightPaddle_models).removeClass('hidden');
		} else if (menuPosition+modelMenuVisibleSize >= modelMenuSize) {
			$(leftPaddle_models).removeClass('hidden');
			$(rightPaddle_models).addClass('hidden');
		}


		// print important values
		$('#print-wrapper-size span').text(modelMenuWrapperSize);
		$('#print-menu-size span').text(modelMenuSize);
		$('#print-menu-invisible-size span').text(modelMenuInvisibleSize);
		$('#print-menu-position span').text(menuPosition);

		
	});

	// scroll to left
	$(rightPaddle_models).on('click', function() {
		$('#models-menu').animate( { scrollLeft: modelMenuWrapperSize}, scrollDuration);
	});

	// scroll to right
	$(leftPaddle_models).on('click', function() {
		$('#models-menu').animate( { scrollLeft: '0' }, scrollDuration);
	});
});
