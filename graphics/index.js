'use strict';
$(function(){
	var techlahomaLogo = nodecg.Replicant('techlahoma-logos');
	var techlahomaLocationLogo = nodecg.Replicant('techlahoma-locations-logos');
	var techlahomaLocationBackgrounds = nodecg.Replicant('techlahoma-locations-backgrounds');

	var container = $('.container'),
		logo = $('#techlahomaLogo'),
		location = $('#techlahomaLocation');

	var techlahomaStatus = nodecg.Replicant('techlahoma-logo', {
		persistent: true,
		defaultValue: {
			show: true,
			autorun: false,
			running: false
		}
	});

	function doRun(show){
		if(show){
			return runShow();
		}else{
			return runHide();
		}
	}

	function runShow(callback){
		console.log('show');
		callback = callback || function(){};
		logo.hide();
		location.css({width: 0});
		container.show();
		logo.fadeIn(250, callback);
	}
	function runHide(callback){
		console.log('hide');
		logo.fadeOut(250, function(){
			location.css({width: 0});
			container.hide();
			if(callback){ return callback(); }
		});
	}

	function runAnimation(){
		console.log('runAnimation');
		location.addClass('moveBg');
		location.animate({
			width: 375
		}, 250, function(){
			setTimeout(function(){
				location.animate({
					width: 0
				}, 250, function(){
					location.removeClass('moveBg');
					nodecg.sendMessage('techlahoma.logo.completed');
				});
			}, 5000)
		});
	}

	nodecg.listenFor('techlahoma.logo.run', runAnimation);

	techlahomaStatus.on('change', function(status, oldStatus){
		if(!oldStatus){
			// set the stage, no animation
			location.addClass(status.location);
			if(status.show){
				container.show();
			}else{
				container.hide();
			}
		}else{
			if(status.show != oldStatus.show){
				doRun(status.show);
			}
			if(oldStatus.location !=status.location){
				location.removeClass(oldStatus.location);
				location.addClass(status.location);
			}
		}
		console.log('new status', status);
		console.log('old status', oldStatus);
	})


	techlahomaLogo.on('change', function(newValue, oldValue){
		console.log('new logo', newValue, oldValue);
	});
});