//////////////////////////////////////
//           background.js          //
//----------------------------------//
//  -Purpose: to start install file //
//		if installing.  And to      //
//      send Desktop Notifications  //
//      when a new link is added    //
//////////////////////////////////////

/*Checking if extension is being installed for the first time
	if so, send to install.html and set localStorage to prevent
	this from running in the future */
function install_notice() {
	if (localStorage["install_time"]) {
		return;
	}

	var now = new Date().getTime();
	localStorage["install_time"] = now;
	chrome.tabs.create({url: "install.html"});
}
install_notice();

//Initialize cloudmine.me account
var ws = new cloudmine.WebService({
	appid: localStorage["appId"],
	apikey: localStorage["apiKey"]
});

/*Get latest link and check against latest link in localStorage
	Notify user if the link is new */
function getLatest() {
	ws.get({limit: 1, sort: 'date:desc'}).on('success', function(data, response) {
		var newLink = "";
		for (var i in data) {
			if (data.hasOwnProperty(i)) {
				newLink = data[i].url;
			}
		}
		if (localStorage["latestURL"] != newLink) {
			//Display Desktop Notification
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

//Set interval to check for updates
setInterval(getLatest, 30000);