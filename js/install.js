function popUp(url, width, height) {
	newwindow=window.open(url,'name','height=' +  height + ',width=' + width);
	if (window.focus) {
		newwindow.focus();
	}
	return false;
}
function install() {
	var bitPixelCode,
		appId,
		apiKey;
		
	bitPixelCode = document.getElementById("BPCode").value;
	appId = document.getElementById("cloudAppId").value;
	apiKey = document.getElementById("cloudApiKey").value;
	
	//Set localStorage for later
	localStorage["bitPixelCode"] = bitPixelCode;
	localStorage["appId"] = appId;
	localStorage["apiKey"] = apiKey;
	
	var bkg = chrome.extension.getBackgroundPage();
	bkg.location.reload();
}

//Chrome Extensions dont like any JS inside HTML:
jQuery(document).ready(function(){
	$("#install").click(function() {
		install();
		close();
	});
	if (localStorage["bitPixelCode"] != "" || localStorage["bitPixelCode"] != undefined) {
		document.getElementById("BPCode").value = localStorage["bitPixelCode"];
	}
	if (localStorage["appId"] != "" || localStorage["appId"] != undefined) {
		document.getElementById("cloudAppId").value = localStorage["appId"];
	}
	if (localStorage["apiKey"] != "" || localStorage["apiKey"] != undefined) {
		document.getElementById("cloudApiKey").value = localStorage["apiKey"];
	}
})