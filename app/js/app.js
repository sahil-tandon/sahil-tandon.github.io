/* app.js
   ----------------------------- */

   var app = {
   		init : function(){
   			app.initCache();
   			app.initEvents();
   			app.initAnalyticsEvents();
   		},
   		initCache : function(){
   			app.cache = {
   				logo : $('header .logo'),
   				hamburgerToggle : $('.hamburger-toggle'),
   				hamburgerLinks : $('.hamburger-links a'),
   				hamburgerSocialLinks : $('.hamburger-social a'),
   				aboutQuickLinks : $('#about .quick-links a')
   			}
   		},
   		initEvents : function(){
   			app.cache.hamburgerToggle.click(function(){
   				$(this).toggleClass("active");
   			});
   		},
   		initAnalyticsEvents : function(){
   			app.cache.logo.click(function(){
   				var thisCategory = "Internal Link Click",
   					thisAction = "Header Logo - intro",
   					thisLabel = $(this).attr('href');

   				ga('send', 'event', thisCategory, thisAction, thisLabel);
   			});
   			app.cache.hamburgerToggle.click(function(){
   				var thisCategory = "Hamburger",
   					thisAction = "Toggle Click",
   					thisLabel = $(this).hasClass("active") ? "Open" : "Close";

   				ga('send', 'event', thisCategory, thisAction, thisLabel);
   			});
   			app.cache.hamburgerLinks.click(function(){
   				var thisCategory = $(this).attr('target') == "_blank" ? "External Link Click" : "Internal Link Click",
   					thisAction = "Hamburger - " + $(this).text().trim(),
   					thisLabel = $(this).attr('href');

   				ga('send', 'event', thisCategory, thisAction, thisLabel);
   			});
   			app.cache.hamburgerSocialLinks.click(function(){
   				var thisCategory = "External Link Click",
   					thisAction = "Hamburger Social - " + $(this).parent().attr('class'),
   					thisLabel = $(this).attr('href');

   				ga('send', 'event', thisCategory, thisAction, thisLabel);
   			});
   			app.cache.aboutQuickLinks.click(function(){
   				var thisCategory = $(this).attr('target') == "_blank" ? "External Link Click" : "Internal Link Click",
   					thisAction = "Quick Links in About - " + $(this).text().trim(),
   					thisLabel = $(this).attr('href');

   				ga('send', 'event', thisCategory, thisAction, thisLabel);
   			});
   		}
   };

   $(document).ready(function(){
   		app.init();
   });