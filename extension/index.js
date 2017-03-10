module.exports = function (nodecg){

	var techlahomaStatus = nodecg.Replicant('techlahoma-logo', {
		persistent: true,
		defaultValue: {
			show: true,
			autorun: false,
			location: 'okc_ss46',
			running: false
		}
	});

	function runEvent(send){
		if(send){
			nodecg.sendMessage('techlahoma.logo.run');
		}
		techlahomaStatus.value.running = true;
		setTimeout(function(){
			if(techlahomaStatus.value.running){
				techlahomaStatus.value.running = false;
			}
		}, 7500);
	}

	techlahomaStatus.value.location = 'okc_ss46';
	var autorunTimer;
	techlahomaStatus.on('change', function(status, oldStatus){
		if(status.autorun && (!oldStatus || !oldStatus.autorun)){
			if(!oldStatus){
				techlahomaStatus.value.running = false;
				runEvent(true);
			}
			autorunTimer = setInterval(function(){
				if(!status.running){
					runEvent(true);
				}
			}, 5 * 60000);
		}else if((!status.autorun && (oldStatus && oldStatus.autorun)) || (autorunTimer && !status.show)){
			clearInterval(autorunTimer);
		}
	});

	nodecg.listenFor('techlahoma.logo.show', function(){
		techlahomaStatus.value.show = true;
	});

	nodecg.listenFor('techlahoma.logo.hide', function(){
		techlahomaStatus.value.show = false;
	});

	nodecg.listenFor('techlahoma.logo.run', runEvent);
	nodecg.listenFor('techlahoma.logo.completed', function(){
		techlahomaStatus.value.running = false;
	});
	nodecg.listenFor('techlahoma.logo.autorun', function (msg){
		techlahomaStatus.value.autorun = msg.autorun;
	});
	nodecg.listenFor('techlahoma.logo.location', function (msg){
		techlahomaStatus.value.location = msg.location;
	});
}