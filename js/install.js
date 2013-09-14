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
}

//Chrome Extensions dont like any JS inside HTML:
jQuery(document).ready(function(){
	$("#install").click(function() {
		install();
		close();
	});
})