function draw(){
 
    pair_index = 0;
    receiver_index = 0;
    
    var data  = loadData();
    allData = data;
    allRules = loadRules();
    initTime();
    svg = d3.select("#svgPicture").select("svg");
    elementDisplayState = d3.select("#diplayStateText");
    MakeTransition(data, speed);
    
    allData = {};
    allRules = [];
    
}
function reset()
{
    pair_index = 0;
    receiver_index = 0;
    initTime();
    allData = {};
    allRules = [];
    stepIndex = 0;
    
    $("#statePatterns").html("");
    svgSPIndex = 0;
    allStatePatterns = [];

}

function drawStep(){
    
    pair_index = 0;
    receiver_index = 0;
    
    if(stepIndex == 0)
    {
        allData  = loadData();
        allRules = loadRules();
        svg = d3.select("#svgPicture").select("svg");
        elementDisplayState = d3.select("#diplayStateText");
        stepIndex = 0;
        lengthData = allData.length ;
        
    }
    
    initTime();
    var state; ;
    var next_state;
    if(stepIndex < lengthData){
        if(stepIndex == 0){
            state= allData[stepIndex];
            next_state = state;
            allKeys = Object.keys(state);
            var index = 0;
            StateGraph(state, next_state,index);
        }
        else{
            state= allData[stepIndex-1];
            next_state = allData[stepIndex];
            StateGraph(state, next_state,stepIndex);
        }
        stepIndex = stepIndex + 1;
    }
    else
        stepIndex = 0;
    
}

function initTime()
{
    speed =$('#slider').slider('value') ;
    wait = speed/2;
    time = 0;
}

function MakeTransition(data, speed)
{
    var length = data.length ;
    for(var i = 0; i < length ; i++){
        var state = data[i];
        // get all keys from state input.
        var next_state;
        if(i < length){
            if(i == 0){
                state = data[i];
                next_state = state;
                allKeys = Object.keys(state);
                var index = 0;
                StateGraph(state, next_state,index);
            }
            else{
                state= allData[i-1];
                next_state = allData[i];
                StateGraph(state, next_state,i);
            }
        }
    }
}

//var sample = "< false,pac(0) > < false,pac(2) >" ;
//
//var someString = 'the cat looks like a cat';
//var anotherString = someString.replace(/cat/g, 'dog');
//
//var s1 = "pattern"
//var re = new RegExp(s1, "g");
//var e =  "pattern matching .".replace(re, "regex");


//var item = "<_,_>" ;
////"<.*?,.*?>";
//item = item.replace(/_/g, '.*?' );
//
//var regex = new RegExp(item, "g");
//
//var text = sample.match(regex);
//
//





function StateGraph(state, next_state,index){
    var numKeys = allKeys.length ;
    var k, s1 , s2, element;
    
    var ruleKeys = Object.keys(allRules);
    var lengthOfRules = ruleKeys.length;
    
    var changeSate = {};
    var displayState = "" ;
    var initSate = "" ;
    for (var i= 0; i< numKeys; i++){
        key = allKeys[i];
        s1 = state[key].trim();
        s2 = next_state[key].trim();
        displayState = displayState + "#" + key + ": " + s2  + " ";
        element =  svg.selectAll("[id='" + svgIDs[i] + "']" );
        
        if(checkUndefined(element) == false)
        {
            if(index == 0)
            {
                initSate = initSate + "#" + key + ": " + s1 + " " ;
                element.transition().text(NormalizeText(key,s1)).attr("fill", "black").duration(speed).delay(time);
            }
            
            if(s1 != s2){
                    // make change
                    if(s1.length > s2.length) changeSate[key] = "-";
                    else changeSate[key] = "+";
                    s2 = NormalizeText(key,s2);
                    element.transition().text(s2).attr("fill", "red").duration(speed).delay(time + wait);
            }
            else{
                s2 = NormalizeText(key,s2);
                element.transition().text(s2).attr("fill", "black").duration(speed).delay(time + wait);
            }
            
        }
    }
    if(index == 0)
    {
        elementDisplayState.transition().text("State 0 :" + initSate).attr("fill", "black").duration(speed).delay(time);
        time = speed;
    }
    
    else elementDisplayState.transition().text("State " + (index) + " :" + displayState).attr("fill", "black").duration(speed).delay(time);
    
//    for(var i = 0; i < lengthOfRules; i++ ){
//        var valueOfRule = allRules[ruleKeys[i]]; // chan1:+, chan2: -
//        var elem =  svg.selectAll("." + ruleKeys[i]  );
//        if(hasSameProps(valueOfRule, changeSate) == true){
//            if(checkUndefined(elem) == false)
//            {
//                elem.transition().attr("stroke", "red").duration(speed).delay(time);
//                elem.transition().attr("stroke", "black").duration(speed).delay(time + speed );
//            }
//        }
//    }
    
    if(index !=0) time =time + speed + wait;
    else time = time + wait;
}




	
			
			
   