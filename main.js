var tabUrl, tabName, latestLink;

//initialize cloudmine.me account
var ws = new cloudmine.WebService({
	appid: '3ada4699731e48f4bad21395fbe949ab',
	apikey: '095136cb56ce4a62964e7f09aff0c860'
});

//get current tab url and title
chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, function(tabArray) {
    var tab = tabArray[0];
    window.tabUrl = tab.url;
	window.tabName = tab.title;
});

//add link into the cloudmine database
function addLink() {
	var timestamp = Math.round((new Date()).getTime() / 1000);
	ws.set(null, {name: window.tabName, url: window.tabUrl, date: timestamp}).on('success', function(data, response) {
		$(".status").show();
		localStorage["latestURL"] = window.tabUrl;
		getLinks();
	});
}

//grabbing links from the cloudmine database		
function getLinks() {
	ws.get({limit: 5, sort: 'date:desc'}).on('success', function(data, response) {
		var result = "";
		for (var i in data) {
			if (data.hasOwnProperty(i)) {
				result += "<a href='" + data[i].url + "' alt='" + data[i].name + "'><img title ='" + data[i].name + "' alt='" + data[i].name + "' src='http://api.screenshotmachine.com/?key=cde14e&url=" + data[i].url + "&size=S&format=PNG' /></a><br/>";
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