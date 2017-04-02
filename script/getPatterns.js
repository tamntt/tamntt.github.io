



var allStatePatterns = [];

function existPattern(state){
    var key, keySize, p, isExits;
    isExits = false;
    keySize = allKeys.length;
    for (var i = 0; i < allStatePatterns.length; i++) {
        p = allStatePatterns[i];
        
        for(var j=0; j< keySize; j++){
            key = allKeys[j];
            if(state[key] == p[key]){
                isExits = true;
            }
            else{
                isExits = false;
                break;
            }
        }
        if(isExits == true) return true;
        
    }
    
    return false;
}

function getPatterns(){
    var input = $("#input").val();
    var compare = input.split('\n');
    var sizeOfComp = compare.length;
    var tmp1, lst, op, cond, tmpCond, state, data;
    cond = true;
    for(var i = 0; i< sizeOfComp; i++){
        tmp1 = compare[i].split(':');
        op = tmp1[1];
        lst = tmp1[0].split(',');
        if(!checkUndefined(op)){
            
            cond = cond + " && (state['" + lst[0].trim() + "'] " + op.trim() + " state['" + lst[1].trim() + "'])" ;
        }
        
    }
    data = loadData();
    var sizeOfData = data.length;
    for(var i = 0;i < sizeOfData; i++ ){
        state = data[i];
        if(eval(cond) == true ){
            if(!existPattern(state)){
                drawPattern(state);
                allStatePatterns.push(state);
            }
        }
    }
}


function drawPattern(state){
    
    
    var sps = document.getElementById('statePatterns');
    svgSPIndex = svgSPIndex + 1;
    var ele = document.createElement("div");
    ele.setAttribute("id","sp" + svgSPIndex);
    sps.appendChild(ele);
    $("#sp" + svgSPIndex).html("<p>State Pattern " +  svgSPIndex + "</p>" + svgPicture);
    
    var numKeys = allKeys.length ;
    var key, sValue, svgText;
    var svgSP;
    for (var i= 0; i< numKeys; i++){
        key = allKeys[i];
        sValue = state[key].trim();
        svgSP = d3.select("#sp" + svgSPIndex).select("svg");
        svgText =  svgSP.selectAll("[id='" + key + "']" );
        
        if(checkUndefined(svgText) == false)
        {
            svgText.text(NormalizeText(key,sValue)).attr("fill", "black");
           
        }
    }
    

}

