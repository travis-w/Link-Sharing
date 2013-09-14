//////////////////////////////////////
//           background.js          //
//----------------------------------//
//  -Purpose: to start install file //
//		if installing.  And to      //
//      send Desktop Notifications  //
//      when a new link is added    //
//////////////////////////////////////

//Initialize cloudmine.me account
var ws = new cloudmine.WebService({
	appid: localStorage["appId"],
	apikey: localStorage["apiKey"]
});

//Get current tab URL and title
chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, function(tabArray) {
    var tab = tabArray[0];
    window.tabUrl = tab.url;
	window.tabName = tab.title;
});

//Add link into the cloudmine database
function addLink() {
	var timestamp = Math.round((new Date()).getTime() / 1000);
	ws.set(null, {name: window.tabName, url: window.tabUrl, date: timestamp}).on('success', function(data, response) {
		$(".status").show();
		localStorage["latestURL"] = window.tabUrl;
		getLinks();
	});
}

//Grabbing links from the cloudmine database		
function getLinks() {
	ws.get({limit: 5, sort: 'date:desc'}).on('success', function(data, response) {
		var result = "";
		for (var i in data) {
			if (data.hasOwnProperty(i)) {
				result += "<a href='" + data[i].url + "' alt='" + data[i].name + "'><img title ='" + data[i].name + "' alt='" + data[i].name + "' src='http://img.bitpixels.com/getthumbnail?code=" + localStorage["bitPixelCode"] + "&url=" + data[i].url + "&size=200&format=PNG' /></a><br/>";
			}
		}
		$("#displayLinks").html(result);
	});
}

//detecting whether or not Add Site button is clicked in order to add links to database
window.addEventListener("load", function() {
	document.getElementById("addSite").addEventListener("click", addLink, false);
}, false);

getLinks();