//////////////////////////////////////
//            install.js            //
//----------------------------------//
//  -Purpose: Control the install   //
//      and option pages.           //
//////////////////////////////////////

//Pop-Up function in order to display pictures. May replace with lightbox later.
function popUp(url, width, height) {
	newwindow=window.open(url,'name','height=' +  height + ',width=' + width);
	if (window.focus) {
		newwindow.focus();
	}
	return false;
}

/*Install function that will update the localStorate in order to get the
	extension up and running */
function install() {
	var bitPixelCode = document.getElementById("BPCode").value,
		appId = document.getElementById("cloudAppId").value,
		apiKey = document.getElementById("cloudApiKey").value;
		
	//Set localStorage for later
	localStorage["bitPixelCode"] = bitPixelCode;
	localStorage["appId"] = appId;
	localStorage["apiKey"] = apiKey;
	
	var bkg = chrome.extension.getBackgroundPage();
	bkg.location.reload();
}

//Chrome Extensions don't like any JS inside HTML:
jQuery(document).ready(function(){
	$("#install").click(function() {
		install();
		close();
	});
	
	//Filling in forms with current values (for updating settings)
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