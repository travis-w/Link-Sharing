//Check if on install
function install_notice() {
	if (localStorage["install_time"]) {
		return;
	}

	var now = new Date().getTime();
	localStorage["install_time"] = now;
	chrome.tabs.create({url: "install.html"});
}
install_notice();

//initialize cloudmine.me account
var ws = new cloudmine.WebService({
	appid: localStorage["appId"],
	apikey: localStorage["apiKey"]
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