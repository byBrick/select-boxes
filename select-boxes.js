/**
 * Custom responsive select boxes.
 *
 * Copyright 2012 HŒkan Edling @tidyui.
 */
$(document).ready(function () {
	/**
	 * Find all custom select boxes and create the custom html.
	 */
	$.each($('.select select'), function(i, e) {
		// Get all of the option elements.
		var options = $(e).children('option') ;
		
		// Get the currently selected option.
		var selected = $(e).children('option:selected').text() ;
		// If nothing was selected, get the first option.
		if (selected == null)
			selected = $(children.get(0)).text() ;
		// Get tab index
		var tabindex = null ;
		if ($(this).attr('tabindex') != '')
			tabindex = $(this).attr('tabindex') ;
					
		// Lets build some html	
		var html =
			'<div class="select-btn"></div>' +
			'<div class="select-val"' + (tabindex != null ? ' tabindex=' + tabindex : '') + '>' + selected  + '</div>' +
			'<ul class="select-opt" data-id="' + $(e).attr('id') + '">' ;
		
		for (var n = 0; n < options.length; n++) {
			html += '<li>' + $(options[n]).text() + '</li>' ;
		}
		html += '</ul>' ;
		
		// Append the html to the parent container.
		$(e).parent().append(html);
	});

	/**
	 * Add the click event to the custom select box.
	 */
	$('.select-btn, .select-val').click(function() {
		$(this).siblings('.select-opt').fadeToggle('fast');
	});
	
	/**
	 * Add the click event to the custom select option.
	 */
	$('.select-opt li').click(function() {
		// Get the matching select box and the selected index.
		var select = $('#' + $(this).parent().attr('data-id')) ;
		var index = $(this).parent().find('li').index(this) ;

		// Select the new option in the "real" select list.
		select.children('option').removeAttr('selected');
		$(select.children('option').get(index)).attr('selected', 'selected') ;
		
		// Update & close the custom select list.
		$(this).parent().siblings('.select-val').text($(this).text()) ;
		$(this).parent().fadeToggle('fast');
	});
});
