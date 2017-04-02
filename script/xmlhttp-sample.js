// create drawsvg channel
var chan = Channel.build({
    debugOutput: true,
    window: document.getElementById("drawsvg").contentWindow,
    origin: "*",
    scope: "drawsvg"
});

// the URL of the svg document (for example)
var svgURL = "http://www.yourdomain.com/yoursvgpath";

// drawsvg ready callback
function onDrawSVGReady(trans,params) {
	// now you can communicate with drawsvg
	log("got drawsvg ready notification");
	// request and load your svg
	loadSVG();
}
/*
  Loading a svg with XMLHttpRequest/Get
*/
function loadSVG() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		// loading the document with drawsvg
		chan.call({
			method: "loadStringSVG",
			params: {
				// string svg contents
				'stringSVG' : xmlhttp.responseText,
				// svg name
				'nameSVG' : 'your svg name',
				// The name of the service which to be called 
				// when user clicks on the save button of drawsvg
				'saveService' :  'onSaveSVG',
				// don't show save dialog
				'showSaveDialog' : false,
				// Change the dimensions of the document to the full window (100%)
				'fullWindow' : true,
				// svg loading callbacks
				'onLoad' : function() {log("got svg1 onLoad notification");},
				'onError': function(err) {log("ERROR while loading svg1: "+err);}
			},
			// jsChannel callbacks
			error: function(error, message) { log( "ERROR: " + error + " (" + message + ")"); },
			success: function(v) {}
		});
	    }
	};
	xmlhttp.open("GET", svgURL, true);
	xmlhttp.send();
}

// drawsvg save svg service
function  onSaveSVG(trans,params) {
	log("onSaveSVG nameSVG="+params['nameSVG']+" stringSVG="+params['stringSVG']);
	var stringSVG = params['stringSVG'];
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("PUT", svgURL, true);
	xmlhttp.setRequestHeader("Content-Type", "image/svg+xml; charset=utf-8");
	xmlhttp.setRequestHeader("Content-Length", stringSVG.length);
	xmlhttp.send(stringSVG);
	xmlhttp.onload = function() {
		log("saved");
	}
	return "save done";
}

// bind drawsvg ready callback 
chan.bind("onDrawSVGReady", onDrawSVGReady);
// bind drawsvg save callback
chan.bind("onSaveSVG", onSaveSVG);
