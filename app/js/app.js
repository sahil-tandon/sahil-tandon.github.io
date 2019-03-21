/* app.js
   ----------------------------- */

   var app = {
   		init : function(){
   			app.initCache();
   			app.initEvents();
   		},
   		initCache : function(){
   			app.cache = {
   				hamburger : $('.hamburger')
   			}
   		},
   		initEvents : function(){
   			app.cache.hamburger.click(function(){
   				$(this).toggleClass('active');
   			});
   		},
   };

   $(document).ready(function(){
   		app.init();
   });