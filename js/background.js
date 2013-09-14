//initialize cloudmine.me account
var ws = new cloudmine.WebService({
	appid: '',
	apikey: ''
});

function getLatest() {
	ws.get({limit: 1, sort: 'date:desc'}).on('success', function(data, response) {
		var newLink = "";
		for (var i in data) {
			if (data.hasOwnProperty(i)) {
				newLink = data[i].url;
			}
		}
		if (localStorage["latestURL"] != newLink) {
			var notification = webkitNotifications.createNotification(
				'icon19.png',
				'New Link!',
				'A new link has been added to your Link Sharing' 
			);
			notification.show();
			setTimeout(function() { 
				notification.cancel(); 
			}, 5000);
			localStorage["latestURL"] = newLink;
		}
	});
}


setInterval(getLatest, 30000);