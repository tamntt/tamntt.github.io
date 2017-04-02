
function drawText(svg,txt,x,y,color, size,id){
		var text = svg.append("text")
				   .text(txt)
				   .attr("text-anchor", "middle")
				   .attr("x", x)
				   .attr("y", y)
				   .attr("id",id)
				   .attr("font-family", "sans-serif")
				   .attr("font-size", size + "px")
				   .attr("fill", color);
        return text;
}
	
	function drawRect(svg,x,y,w,h,color,id)
	{
		var rect = svg.append("rect")
			   .attr("x", x)
			   .attr("y", y)
			   .attr("width", w )
			   .attr("height", h)
			   .attr("id",id)
			   .attr("fill", color);
			   return rect;
	}
	function drawLine(svg,x1,y1,x2,y2,color,id)
	{
		svg.append("line")
				   .attr("x1", x1)
				   .attr("y1", y1)
				   .attr("x2", x2)
				   .attr("y2", y2)
				   .attr("id", id)
				   .attr("stroke", color);
	}
	


function abortRead() {
    reader.abort();
}

function errorHandler(evt) {
    switch(evt.target.error.code) {
        case evt.target.error.NOT_FOUND_ERR:
            alert('File Not Found!');
            break;
        case evt.target.error.NOT_READABLE_ERR:
            alert('File is not readable');
            break;
        case evt.target.error.ABORT_ERR:
            break; // noop
        default:
            alert('An error occurred reading this file.');
    };
}

function updateProgress(evt) {
    // evt is an ProgressEvent.
    if (evt.lengthComputable) {
        var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
        // Increase the progress bar length.
        if (percentLoaded < 100) {
            progress.style.width = percentLoaded + '%';
            progress.textContent = percentLoaded + '%';
        }
    }
}

function loadFile() {
  document.getElementById('fileForUpload').value = "";
}

function handleFileSelect(evt) {
    
    // Reset progress indicator on new file selection.
    progress.style.width = '0%';
    progress.textContent = '0%';
    
    reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onprogress = updateProgress;
    reader.onabort = function(e) {
        alert('File read cancelled');
    };
    reader.onloadstart = function(e) {
        document.getElementById('progress_bar').className = 'loading';
    };
    var files = document.getElementById('fileForUpload').files;
    if (!files.length) {
        alert('Please select a file!');
        return;
    }
    var file = files[0];
    var start = 0;
    var stop = file.size - 1;
    reader.onload = function(evt) {
        // Ensure that the progress bar displays 100% at the end.
        progress.style.width = '100%';
        progress.textContent = '100%';
        setTimeout("document.getElementById('progress_bar').className='';  $('.run').attr('disabled', false);", 800);
        
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
            contents = evt.target.result;
            contents = contents.replace(/(\r\n|\n|\r)/gm,"").replace(/\s+/g," ");
            contents = contents.replace(/\s+/g," ").replace(/\s+/g," ");
        }
        
    }
    
    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
    
    // Read in the image file as a binary string.
    // reader.readAsBinaryString(evt.target.files[0]);
}

// end script

function formatString(value){
    
    if(value.endsWith(" (")){
        value = value.substring(0,value.length - 2);
    }
    var equal = 0;
    if(value.endsWith(")")){
        if(value.split("(").length == value.split(")").length){
            equal = 1;
            if(value.startsWith("(")){
                value = value.substring(1,value.length - 1);
            }
        }
        else value = value.substring(0,value.length - 1);
    }
    return value;
}

function getItems(ele, text){
    
    var l = ele.length;
    var item = ele[0];
    for(var i = 1 ; i< l ; i++ ){
        item = item + "|" + ele[i];
    }
    item = item.replace(/_/g, '.*?' );
    
    var regex = new RegExp(item , "g");
    
    var result = text.match(regex);
    return result;
}


function NormalizeText(key, text){
    var tmpValue = texDisplays[key];
    if(checkUndefined(tmpValue)) return text;
    else{
        var option = tmpValue[0];
        var result = getItems(tmpValue[1], text);
        var t = result.length;
        if(option == "REV" || option == "VER-REV"){
            
            result = result.reverse();
            var newText = result[0];
            for( var i = 1 ; i< t; i++){
                newText = newText + " "  + result[i];
            }
            
            return newText;
        }
        else
            
                
//                t.append("tspan").attr("x", 0).attr("dy", "1.0em")
//                .text("line 1") ;
         return text;
    }
    
}


function loadData(){
    
    
    
    var displayInput = contents.split('###textDisplay')[1].split('###states')[0].trim().split('\n');
    
    //alert(displayInput[0]) ;
    var lenOfDisplayInput = displayInput.length;
    
    for(var i = 0; i < lenOfDisplayInput; i++){
        var element = displayInput[i].split('::::');
       // var elementID = element[0] ;
      //  var option = element[1];
      //  var textItems = element[2].split('++++');
        var value = [];
        if(!checkUndefined(element[1]))
        {
            value.push( element[1]);
            value.push( element[2].split('++++')) ;
            texDisplays[element[0]] = value ;
        }
        
        
    }

    
    //contents.split('###svgIDs')[1].split('###keys')[0].trim().split(" ");
    var keys = contents.split('###keys')[1].split('###textDisplay')[0].trim().split(" ");
    svgIDs = keys;
    allKeys = keys;
    var numOfKeys = keys.length;
    var states = contents.split('###states');
    var lines = states[1].trim().split(' || ');
    var numOfLines = lines.length - 1 ; // remove nil
    var dataset = [];
    for(var i = 0;i < numOfLines; i++){
        var line = lines[i].substring(1, lines[i].length - 1) || "";
        var state = {};
        for(var j= 0 ; j< numOfKeys; j++){
            var tmp = (line.replace(/\s+/g," ").split(keys[j] + ":"))[1];
            var value;
            if((j + 1) == numOfKeys ){
                if(checkUndefined(tmp)) alert(j + " " + keys[j] + line);
                value = tmp.trim();
            }
            else value = tmp.split(keys[(j+1)] + ":")[0].trim();
            
            value = formatString(value);
            
            state[keys[j]] =value;
            //NormalizeText(keys[j],value);
        }
        dataset.push(state);
    }

    
   /* var lines = states[1].split('\n');
    for(var i = 0;i < lines.length;i++){
        var line = lines[i].split('| ');
        if(line.length > 1)
        {
            var state = {};
            for(var m = 0; m < line.length; m++)
            {
                data = line[m].split(': ');
                var key =  data[0];
                var value =  data[1];
                if(checkUndefined(key) == false && checkUndefined(value) == false) state[key] = value;
            }
            dataset.push(state);
        }
    }
    
    */
    
    return dataset;
}


function loadRules(){
    var dataset = {};
    var input = contents.split('###rules');
    if(input.length > 1){
        var rules = input[1].split('###keys')[0];
        var lines = rules.split('\n');
        for(var i = 0;i < lines.length;i++){
            var ruleLine = lines[i].split(':');
            if(ruleLine.length > 0)
            {
                var key =  ruleLine[0].replace(/\s/g, '');;
                if(checkUndefined(key) == false && key != ""){
                    var value =  ruleLine[1].split('|');
                    var term = []; var state = {}
                    for(var m = 0; m < value.length; m++)
                    {
                        var data = value[m].split(' ');
                        var key2 =  data[0]; var value2 =  data[1];
                        if(checkUndefined(key2) == false && checkUndefined(value2) == false)
                            state[key2] = value2;
                    }
                    term.push(state);
                    dataset[key] = state;
                }
            }
        }
    }
    
    return dataset;
}

function checkUndefined(variable)
{
    if(variable === undefined || variable === null)
        return true;
    else
        return false;
}

function hasSameProps( obj1, obj2 ) {
    var obj1Props = Object.keys( obj1 ),
    obj2Props = Object.keys( obj2 );
    return obj1Props.every( function( prop ) {
                               var index = obj2Props.indexOf( prop );
                               return ((index >= 0)&&(obj1[prop] == obj2[prop]));
                           });

}



(function (exports) {
 function urlsToAbsolute(nodeList) {
 if (!nodeList.length) {
 return [];
 }
 var attrName = 'href';
 if (nodeList[0].__proto__ === HTMLImageElement.prototype
     || nodeList[0].__proto__ === HTMLScriptElement.prototype) {
 attrName = 'src';
 }
 nodeList = [].map.call(nodeList, function (el, i) {
                        var attr = el.getAttribute(attrName);
                        if (!attr) {
                        return;
                        }
                        var absURL = /^(https?|data):/i.test(attr);
                        if (absURL) {
                        return el;
                        } else {
                        return el;
                        }
                        });
 return nodeList;
 }
 
 function screenshotPage() {
 urlsToAbsolute(document.images);
 urlsToAbsolute(document.querySelectorAll("link[rel='stylesheet']"));
 var screenshot = document.documentElement.cloneNode(true);
 var b = document.createElement('base');
 b.href = document.location.protocol + '//' + location.host;
 var head = screenshot.querySelector('head');
 head.insertBefore(b, head.firstChild);
 screenshot.style.pointerEvents = 'none';
 screenshot.style.overflow = 'hidden';
 screenshot.style.webkitUserSelect = 'none';
 screenshot.style.mozUserSelect = 'none';
 screenshot.style.msUserSelect = 'none';
 screenshot.style.oUserSelect = 'none';
 screenshot.style.userSelect = 'none';
 screenshot.dataset.scrollX = window.scrollX;
 screenshot.dataset.scrollY = window.scrollY;
 var script = document.createElement('script');
 script.textContent = '(' + addOnPageLoad_.toString() + ')();';
 screenshot.querySelector('body').appendChild(script);
 var blob = new Blob([screenshot.outerHTML], {
                     type: 'text/html'
                     });
 return blob;
 }
 
 function addOnPageLoad_() {
 window.addEventListener('DOMContentLoaded', function (e) {
                         var scrollX = document.documentElement.dataset.scrollX || 0;
                         var scrollY = document.documentElement.dataset.scrollY || 0;
                         window.scrollTo(scrollX, scrollY);
                         });
 }
 
 function generate() {
 window.URL = window.URL || window.webkitURL;
 window.open(window.URL.createObjectURL(screenshotPage()));
 }
 exports.screenshotPage = screenshotPage;
 exports.generate = generate;
 })(window);

