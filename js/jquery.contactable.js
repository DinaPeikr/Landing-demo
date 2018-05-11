/*
 * contactable 1.2.1 - jQuery Ajax contact form
 *
 * Copyright (c) 2009 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Revision: $Id: jquery.contactable.js 2010-01-18 $
 *
 */
 
//extend the plugin
(function($){

	//define the new for the plugin ans how to call it	
	$.fn.contactable = function(options) {
		//set default options  
		var defaults = {
			url: 'http://cb90592.tmweb.ru/landing/mail.php',
			name: 'Username',
			email: 'E-mail',
			subject : 'Letter from registration form',
      page : location.href,
			submit : 'Register',
			recievedMsg : 'Thank you for registration',
			notRecievedMsg : 'Sorry, an error occurred while sending the message, please try again later.',
			hideOnSubmit: false

		};

		//call in the default otions
		var options = $.extend(defaults, options);
		//act upon the element that is passed into the design    
		return this.each(function() {
			//construct the form
			var this_id_prefix = '#'+this.id+' ';
			$(this).html('<div id="contactable_inner"></div><form id="contactForm" method="" action=""><div id="loading"></div><div id="callback"></div><div class="holder"><p><label for="name">'+options.name+'<span class="red"> * </span></label><br /><input id="name" class="contact" name="name"/></p><p><label for="email">'+options.email+' <span class="red"> * </span></label><br /><input id="email" class="contact" name="email" /></p><p><input class="submit" type="submit" value="'+options.submit+'"/></p></div></form>');
			//show / hide function
			$(this_id_prefix+'div#contactable_inner').toggle(function() {
				$(this_id_prefix+'#overlay').css({display: 'block'});
				$(this).animate({"marginRight": "-=0px"}, "fast"); 
				$(this_id_prefix+'#contactForm').animate({"marginRight": "-=0px"}, "fast");
				$(this).animate({"marginRight": "+=280px"}, "slow"); 
				$(this_id_prefix+'#contactForm').animate({"marginRight": "+=280px"}, "slow"); 
			}, 
			function() {
				$(this_id_prefix+'#contactForm').animate({"marginRight": "-=280px"}, "slow");
				$(this).animate({"marginRight": "-=280px"}, "slow").animate({"marginRight": "+=0px"}, "fast"); 
				$(this_id_prefix+'#overlay').css({display: 'none'});
			});
			
			//validate the form 
			$(this_id_prefix+"#contactForm").validate({
				//set the rules for the fild names
				rules: {
					name: {
						required: true,
						minlength: 2
					},
					email: {
						required: true,
						email: true
					}
				
				},
				//set messages to appear inline
					messages: {
						name: "",
						email: ""
						
					},			

				submitHandler: function() {
					$(this_id_prefix+'.holder').hide();
					$(this_id_prefix+'#loading').show();
$.ajax({
  type: 'POST',
  url: options.url,
  data: {subject:options.subject, page:options.page, name:$(this_id_prefix+'#name').val(), email:$(this_id_prefix+'#email').val()},
  success: function(data){
						$(this_id_prefix+'#loading').css({display:'none'}); 
						if( data == 'success') {
							$(this_id_prefix+'#callback').show().append(options.recievedMsg);
							if(options.hideOnSubmit == true) {
								//hide the tab after successful submition if requested
								$(this_id_prefix+'#contactForm').animate({dummy:1}, 2000).animate({"marginRight": "-=300px"}, "slow");
								$(this_id_prefix+'div#contactable_inner').animate({dummy:1}, 2000).animate({"marginRight": "-=300px"}, "slow").animate({"marginRight": "+=0px"}, "fast"); 
								$(this_id_prefix+'#overlay').css({display: 'none'});	
							}
						} else {
							$(this_id_prefix+'#callback').show().append(options.notRecievedMsg);
						   document.location.href="http://cb90592.tmweb.ru/landing/";
						

							setTimeout(function(){
								$(this_id_prefix+'.holder').show();
								$(this_id_prefix+'#callback').hide().html('');
							},2000);
						}
					},
  error:function(){
						$(this_id_prefix+'#loading').css({display:'none'}); 
						$(this_id_prefix+'#callback').show().append(options.notRecievedMsg);
                                        }
});		
				}
			});
		});
	};
 
})(jQuery);
