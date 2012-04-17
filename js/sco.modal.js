/* ==========================================================
 * sco.modal.js
 * http://github.com/terebentina/sco.js
 * ==========================================================
 * Copyright 2012 Dan Caragea.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

/*jshint laxcomma:true, sub:true, browser:true, jquery:true, devel:true */
/*global define:true, Spinner:true */

(function(factory) {
	"use strict";

    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery'
			,'../spin.js'
        ], factory);
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function($) {
	"use strict";

	function Modal(options) {
		options = $.extend({}, $.fn.scomodal.defaults, options);

		var $modal = $(options.target).attr('class', 'modal fade')
			,$backdrop = $('.modal-backdrop');

		$modal.find('.modal-header h3').html(options.title);

		if (typeof options.css !== 'undefined') {
			$modal.addClass(options.css);
		}

		if (typeof options.width !== 'undefined') {
			$modal.width(options.width);
		}

		if (typeof options.left !== 'undefined') {
			$modal.css({'left': options.left});
		}

		if (typeof options.height !== 'undefined') {
			$modal.height(options.height);
		}

		if (typeof options.top !== 'undefined') {
			$modal.css({'top': options.top});
		}

		if (!$backdrop.length) {
			$backdrop = $('<div class="modal-backdrop fade" />').appendTo(document.body);
			$backdrop[0].offsetWidth; // force reflow
			$backdrop.addClass('in');
		}
		$modal.on('close', function() {
			$(this).hide().find('.inner').html('');
			$('.modal-backdrop').remove();
		}).show().addClass('in');
		if (typeof options.href !== 'undefined') {
			var spinner = new Spinner({color: '#3d9bce'}).spin($modal[0]);
			$('.inner', $modal).load(options.href, function() {
				spinner.stop();
			});
		}
	}


	$.fn.scomodal = function(opts) {
		return this.each(function() {
			var $this = $(this)
				,data = $this.data()
				,options = $.extend({}, data, opts)
				;
			if ($this.attr('href') != '' && $this.attr('href') != '#') {
				options.href = $this.attr('href');
			}
			delete options.scomodal;
			if (typeof data.scomodal != 'undefined') {
				$this.data('scomodal', new Modal(options));
			}
		});
	};

	$.scomodal = function(options) {
		return new Modal(options);
	};

	$.fn.scomodal.defaults = {
		title: '&nbsp;'		// modal title
		,target: '#modal'	// the modal id
	};

	$(document).on('click.scomodal', ['data-trigger="modal"'], function(e) {
		$(this).scomodal();
		//return false;
	}).on('click.scomodal', '[data-dismiss="modal"]', function(e) {
		e.preventDefault();
		$(this).parents('.modal').trigger('close');
	});
}));
