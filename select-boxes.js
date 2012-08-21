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
		if ($(this).attr('tabindex') != '') {
			tabindex = $(this).attr('tabindex') ;
			$(this).removeAttr('tabindex') ;
		}
		
		// Lets build some html	
		var html =
			'<div class="select-btn"></div>' +
			'<div class="select-val"' + (tabindex != null ? ' tabindex=' + tabindex : '') + '>' + selected  + '</div>' +
			'<ul class="select-opt" data-id="' + $(e).attr('id') + '">' ;
		
		for (var n = 0; n < options.length; n++) {
			html += '<li tabindex="-1">' + $(options[n]).text() + '</li>' ;
		}
		html += '</ul>' ;
		
		// Append the html to the parent container.
		$(e).parent().append(html);
	});

	/**
	 * Add the click event to the custom select box.
	 */
	$('.select-btn, .select-val').click(function() {
		$(this).siblings('.select-opt').fadeToggle('fast') ;
	});
	
	/**
	 * Add the enter event to select boxes.
	 */
	$('.select-val').keydown(function(evt) {
		keycode = (evt.which) ? evt.which : event.keyCode ;
			
		if (keycode == 13) {
			evt.preventDefault() ;
			$(this).siblings('.select-opt').fadeToggle('fast') ;
		} else if (keycode == 40) {
			$(this).siblings('.select-opt').children('li:first').focus() ;			
		}
	});
	
	$('.select-opt li').keydown(function(evt) {
		keycode = (evt.which) ? evt.which : event.keyCode ;
		var index = getIndexOfOption($(this));
		
		if (keycode == 40) {
			evt.preventDefault() ;
			if ($(this).next().get(0) != null) {
				$(this).next().focus() ;
			}
		} else if (keycode == 38) {
			evt.preventDefault() ;
			if ($(this).prev().get(0) != null)
				$(this).prev().focus() ;			
		} else if (keycode == 13) {
			evt.preventDefault() ;
			selectOption($(this)) ;
		}
	});

	/**
	 * Add the click event to the custom select option.
	 */
	$('.select-opt li').click(function() {
		selectOption($(this));
	});
	
	/**
	 * Gets the index of the given li option.
	 */
	function getIndexOfOption(li) {
		return li.parent().find('li').index(this);		
	}
	
	/**
	 * Selects the given li option
	 */
	function selectOption(li) {
		// Get the matching select box and the selected index.
		var select = $('#' + li.parent().attr('data-id'));
		var index = getIndexOfOption(li);

		// Select the new option in the "real" select list.
		select.children('option').removeAttr('selected');
		$(select.children('option').get(index)).attr('selected', 'selected');
		
		// Update & close the custom select list.
		li.parent().siblings('.select-val').text(li.text());
		li.parent().fadeToggle('fast');
		li.parent().siblings('.select-val').focus();
	}
});
