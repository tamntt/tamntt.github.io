

/* This sample demonstrates the use of drawsvg with jschannel

1. load the jschannel.js messaging abstraction
2. create an iframe holding www.drawsvg.appspot.com/drawsvg.html#jsChannel:
3. establish a communication channel with drawsvg iframe
4. bind calbacks, ready and save

*/

document.getElementById("getbtn").disabled=false;
$(".control").css("display", "none");
// log utility
function log( m) {
    var tag = 'output' ;
    m = "> " + m;
    var e = document.createElement('div');
    if (typeof e.innerText !== 'undefined') e.innerText = m;
    else e.textContent = m;
    document.getElementById(tag).appendChild(e);
}

// create drawsvg channel
var chan = Channel.build({
                         debugOutput: true,
                         window: document.getElementById("drawsvg").contentWindow,
                         origin: "*",
                         scope: "drawsvg"
                         });



// drawsvg ready callback
function onDrawSVGReady(trans,params) {
    // now you can communicate with drawsvg
    log("got drawsvg ready notification");
    // enable buttons
    document.getElementById("svg1btn").disabled=false;
    document.getElementById("getbtn").disabled=false;
    // setting document menu
    // call 'setDocumentMenu' method
    // with params {enableSamples, disableTasks}
    chan.call({
              method: "setDocumentMenu",
              params: {
              // disable samples sub-menu
              'enableSamples' : true,
              // disable taks
              'disableTasks' : ''
              },
              // jsChannel callbacks
              error: function(error, message) { log( "ERROR: " + error + " (" + message + ")"); },
              success: function(v) {log("setting document menu done");}
              });
    return "connected";
};

// bind drawsvg ready callback
chan.bind("onDrawSVGReady", onDrawSVGReady);

// save svg service
function  onSaveSVG(trans,params) {
    log("onSaveSVG nameSVG="+params['nameSVG']+" stringSVG="+params['stringSVG']);
    // save svg with stringSVG
    
    // .... write your code
    
    return "save done";
}

// bind save callback
chan.bind("onSaveSVG", onSaveSVG);


// getting SVG
function getSVG() {
    //log("getSVG");
    
    chan.call({
              method: "getSVG",
              params: {},
              error: function(error, message) { log( "ERROR: " + error + " (" + message + ")"); },
              success: function(v) {
              //log(v);
              svgPicture = v ;
                $("#svgPicture").html(v);
                $(".control").css("display", "block");
                $(".run").attr("disabled", true);
              //.disabled = true;
              
           // alert(v);
              }
    });
}



// Loading svg1
function  loadStringSVG1() {
    log("load svg1");
    // load SVG with the contents of the document
    // call 'loadStringSVG' method
    // with params {stringSVG, nameSVG, saveService, showSaveDialog, fullWindow, saveButtonLabel, onLoad, onError}
    chan.call({
              method: "loadStringSVG",
              params: {
              // string svg contents
              'stringSVG' : stringSVG1,
              // svg name
              'nameSVG' : 'svg1',
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
};
