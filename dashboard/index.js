$(function(){

	var techlahomaStatus = nodecg.Replicant('techlahoma-logo');

	var hideButton = $('#hideLogo'),
		showButton = $('#showLogo'),
		location = $('#location'),
		runButton = $('#runLocation'),
		autorunButton = $('#autorunLocation');


	techlahomaStatus.on('change', function(newValue){
		showButton.prop("disabled", newValue.show);
		hideButton.prop("disabled", !newValue.show || newValue.running);
		runButton.prop("disabled", !newValue.show || newValue.running);
		if(newValue.running){
			runButton.text('Animating...');
		}else{
			runButton.text('Animate');
		}
		location.val(newValue.location);
		autorunButton.prop("disabled", !newValue.show);
		autorunButton.prop("checked", newValue.autorun);
	});

	showButton.bind('click', function(){
		nodecg.sendMessage('techlahoma.logo.show');
	});
	hideButton.bind('click', function(){
		nodecg.sendMessage('techlahoma.logo.hide');
	});
	runButton.click(function(){
		nodecg.sendMessage('techlahoma.logo.run');
	});
	location.change(function(){
		var loc = location.val();
		nodecg.sendMessage('techlahoma.logo.location', {
			location: loc
		});
	})
	autorunButton.change(function(){
		var set = autorunButton.prop('checked');
		nodecg.sendMessage('techlahoma.logo.autorun', {
			autorun: set
		});
	});
});