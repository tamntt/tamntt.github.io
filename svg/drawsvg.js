

/* This sample demonstrates the use of drawsvg with jschannel

1. load the jschannel.js messaging abstraction
2. create an iframe holding www.drawsvg.appspot.com/drawsvg.html#jsChannel:
3. establish a communication channel with drawsvg iframe
4. bind calbacks, ready and save
5. with svg1 button, load a svg with it's serialized contents and save it when the user clicks on the save button of DRAWSVG
6. with svg2 button, load a svg with it's URL  and save it when the user clicks on the save button of DRAWSVG

*/

// disable buttons
var stringSVG1 = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1040px" height="320px" viewBox="0 0 1040 320" preserveAspectRatio="xMidYMid meet" xmlns:svg="http://www.w3.org/2000/svg" ><defs id="svgEditorDefs"><marker id="arrow15-12-right" markerHeight="12" markerUnits="strokeWidth" markerWidth="15" orient="auto" refX="-3" refY="0" viewBox="-15 -5 20 20"><path d="M -15 -5 L 0 0 L -15 5 z" fill="black"/></marker><marker id="arrow15-12-left" markerHeight="12" markerUnits="strokeWidth" markerWidth="15" orient="auto" refX="3" refY="0" viewBox="0 -5 20 20"><path d="M 15 -5 L 0 0 L 15 5 z" fill="black"/></marker><marker id="arrow10-8-left" markerHeight="8" markerUnits="strokeWidth" markerWidth="10" orient="auto" refX="3" refY="0" viewBox="0 -5 20 20"><path d="M 15 -5 L 0 0 L 15 5 z" fill="black"/></marker><marker id="arrow20-16-left" markerHeight="16" markerUnits="strokeWidth" markerWidth="20" orient="auto" refX="3" refY="0" viewBox="0 -5 20 20"><path d="M 15 -5 L 0 0 L 15 5 z" fill="black"/></marker><marker id="arrow8-6-right" markerHeight="6" markerUnits="strokeWidth" markerWidth="8" orient="auto" refX="-3" refY="0" viewBox="-15 -5 20 20"><path d="M -15 -5 L 0 0 L -15 5 z" fill="black"/></marker><marker id="arrow20-16-right" markerHeight="16" markerUnits="strokeWidth" markerWidth="20" orient="auto" refX="-3" refY="0" viewBox="-15 -5 20 20"><path d="M -15 -5 L 0 0 L -15 5 z" fill="black"/></marker></defs><rect id="svgEditorBackground" x="0" y="0" width="1040" height="320" style="fill: none; stroke: none;"/><rect x="332" y="34" stroke="black" id="e1_rectangle" style="stroke-width: 1px;" width="337" height="38" fill="khaki"/><rect x="334" y="200" stroke="black" id="chan2_obj" style="stroke-width: 1px;" width="337" height="38" fill="khaki"/><image x="197" y="111" id="e27_image" preserveAspectRatio="xMidYMid meet" xlink:href="data:image/gif;base64,R0lGODlhWABJAHcAMSH+GlNvZnR3YXJlOiBNaWNyb3NvZnQgT2ZmaWNlACH5BAEAAAAALAAAAABWAEkAhwAAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBmAABmMwBmZgBmmQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNmZjNmmTNmzDNm/zOZADOZMzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZmzGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZAJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+ZzP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zP///wECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwECAwj/AAEIHEiwoMGDCBMqXMiwoUOH0yJKnPawosWLBydq3CgRo8ePBTmKFAmy5MORKEemMsnSYMqXKFu2FJmqyp8/MFPK/DjyTwAWAQJUyRlzp0WN1Gza/CmolQChRIsaZahxFdCgQQNh2woUZ1SSUxUiXSHgCrYrLMxu3RrAyteRYRFuBFR2bdO1W68ESPWWY1yXGlNZCYC38NZWLKpQ6+v3LwCOqgQAMtyqsuW0ixlrdCzyjwBB2CoLQnsVa4AVmTVPjDsS0E/TP1nIvkIbKF/Vm6eKpKY3AFpBTVtRDuAVd8edKasEEL7WsmXgelekmn4bN3KUK1g0BS77ddDST78X/1c9k2aqPyu8Z5+N5Qrw0T9rA11hnKLAoAACINQvd6OqKkCFp10grDCHDSt4teLbVq6s8lN1jK2U32n4GVRhRhNRQ1d88Bm4ViBVrNIcUKFhERQgxtX0XSBAFWRafxMJ0pZa2KRlYGVAseChIGm1INRQuFGTXlBm8cjfhBcCNtEKKwBSWWgLruWgdpTNh2KKVgigXZQtIrlQYHo9NVsAg+DFSoGhjQZcaHpBGKEq6bGAzSAsaIWNjAMdCeNEqwBSBZPprYCgYTJiRWUgAagSETV88UVNaimpGCWiZXKlZ0KRnsfCCtcQKtt7P7ViTVupqGKFFSv8ecWVKf0xGJVbAf9YKTbpQcRRKoA0GmVhehkoo1nRhZfdFU8pOhI16H2HF1prXeNaQnpylNSmfzLlnnvA7RqabHfO1pSI27q1m4+faSubgYNcit+FNMm26XewYaVWK6CltRVoht0ZQGdAXSGcvWsx29yFsBFEUwCCKMoUvfSqyaWO3OYbsHQZquIawAriy5WOzemV531HjgSgri1ILKMg14Cqcb6/agSIjwjbtRxePPKapJIbnReRa3ZSlh4g7vnmoV08amnNRH/MR5jMO3Is86U4ZyjRYIPmuwrMpw09Glo/VVGNRCrW6ZqvAniYMc1QRx3RH1ek6qoAEjcHXCtVHzZfk+OlQhbH6Rr/6GDdPK6s4JcbKfdaejTGrfim002Ea1Yya8xKkwnGPGLaA22UrGVBray4xFig5rhyV/QMpYfaKpi4gpgLVHgA4J418+eKt4l0W0NPbnrEawFst4Uha7RC4mgNTTs219DWgm1IU17YNW11upUVsG4r58B5FvyY8DSyktjxhg12WnaBON4WyjYbyIq2xV+ePcjbL+nvVtAHIj343VahSqNfT6Qck2u6V/VcQaKB3ehmUVMOc2Q0K/zJyE2BAQSqOLSKa2hNcJbbFlWaxwJrtEIv+FsWCyC4EWT5JCjZCaDEFBQI5gxOLBsZzAp8xKkQ3isArPoPq1yWmKQ9pSyCiF1h/1pQw221Ln4Z+kO1rGBDuwklVQHQkkgGE5H//Gk+2hHiWWDFuveFpDMZtCFi5LUpkTBpGoAAlBUA4cPTuMeFUcITyLBiMJFU4TNNbA7D6LWvuQBlMGXxkRX+gCzx+aYFBAKhvlxEx8xxhHp5NJlk/AOgUKXpQdNgwSBPGJsFscBC9/lihrQVSby0RSSWlFkg0OOVOXYSWnUMDClLyRX65IyUk6ONLe3jyiPG0nyeo2WNKCbLYHZHXCyJodOEKTNj8cl39HtVK00SGN4x8zACGM+ihFY5Nh6HmhPp3DVNeQVIRUQ5KyNWda4zjaTFZhXGs+EqWLQpc04jFf3ijgAUE/8Ro0gEENrpTVqCSbtA8GhImMxZesIjrn76cxrZuZchPwWaobXCWVt7V3eEEoBAnKqhazvNTTIjoYemB18WLM133MXSd32nCq2wCg4LJSxn3tGZDg2L4Wanr+BwzTRjopJwnCUU4Yj0PE9ZpU+sACHHEOlch4leXuT1JL1MZi2uEdS2dpmsQDXVqYTRSxWktyk4BsWF1nTQ/Layz+qcxyZfdQwA1GLVG2pMLzSS0VX1tcyz7FIqf/lJ71ZQUUXKrgq9c5qC8ChCEn5TrkTaypSEc7JuCbanTgzmA+EiV4J8RzQxWx93sCIIVgwmsQSVkTYjUtLOZs83eEWeXlTqGy5XhbFyJHTtfl7DnDTGy5KtUKDJEpMb3e42ilZAEG0je8PEHYZrQMqpcaG10uXytEYcE01viMOX6Vrkt58NDWjdZRr6ePcj4M2Rd0wzlPPKBLwIdK985xsQADs=" width="60" height="49.7727" stroke="black" fill="khaki" style="stroke-width: 1px;"/><image x="756" y="120" id="e56_image" preserveAspectRatio="xMidYMid meet" xlink:href="data:image/gif;base64,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" width="60" height="54.2466" stroke="black" fill="khaki" style="stroke-width: 1px;" /><text fill="black" x="463" y="25" id="e110_texte" style="font-family: Arial; font-size: 12.8px;" >channel 1</text><text fill="black" x="463" y="254" id="e139_texte" style="font-family: Arial; font-size: 13.1px;" >channel 2</text><text fill="black" x="113" y="64.9999" id="bit1_test" style="font-family: Arial; font-size: 13.6px;" dy="" dx="">Bit1: False</text><text fill="black" x="806" y="203" id="bit2_text" style="font-family: Arial; font-size: 13.1px;" >Bit2: False</text><text fill="black" x="711" y="83" id="e322_texte" style="font-family: Arial; font-size: 20px;"></text><text fill="black" x="237" y="185" id="e350_texte" style="font-family: Arial; font-size: 20px;" ></text><text fill="black" x="347" y="44" id="e480_texte" style="font-family: Arial; font-size: 20px;"></text><text fill="black" x="360" y="55" id="e508_texte" style="font-family: Arial; font-size: 20px;" transform="matrix(25.728 0 0 1 -8830.58 0)"></text><g id="ele_chan1_group"><rect x="608" y="38" stroke="black" id="ele_chan1" style="stroke-width: 1px;" width="54" height="29" fill="lavender"/><text fill="black" x="618" y="58" id="e796_texte" style="font-family: Arial; font-size: 14.2px;" >&lt;F,0&gt;</text></g><rect x="338.99999999999585" y="204.99999999997974" stroke="black" id="chan2_element" style="stroke-width: 1px;" width="54" height="29" fill="lavender"/><text fill="black" x="347" y="223" id="chan2_txt_element" style="font-family: Arial; font-size: 12.6px;" dy="" dx="">False</text><rect x="332" y="34" stroke="black" id="chan1_obj" style="stroke-width: 1px;" width="337" height="38" fill="khaki"/><g id="e1135_chan1_group"><rect x="609.0000000000366" y="37.999999999982606" stroke="black" id="chan1_element" style="stroke-width: 1px;" width="54" height="29" fill="lavender"/><text fill="black" x="613" y="56" id="chan1_txt_element" style="font-family: Arial; font-size: 10.5px;" dy="" dx="">&lt;False,0&gt;</text></g><g id="e1157_chan1_group" transform="matrix(1 0 0 1 22 62)"/><g id="e1385_chan1_group" transform="matrix(1 0 0 1 1 78)"/><g id="e1386_chan1_group" transform="matrix(1 0 0 1 1 78)"/><polyline stroke="black" id="sender-chan1_polyline" style="fill: none; stroke-width: 1px; marker-end: url(&quot;#arrow15-12-right&quot;);" points="221 112 221 50.9999 331 49.9999" /><polyline stroke="black" id="chan1-receiver_polyline" style="fill: none; stroke-width: 1px; marker-end: url(&quot;#arrow15-12-right&quot;);" points="669 50.9999 779 51.9999 779 124" transform="matrix(1 0 0 0.935484 0 2.64515)"/><polyline stroke="black" id="chan2-sender_polyline" style="fill: none; stroke-width: 1px; marker-start: url(&quot;#arrow15-12-left&quot;);" points="218 165 219 223 330 223" transform="matrix(1.02767 0 0 1.0486 -5.41915 -11.3235)"/><polyline stroke="black" id="receiver-chan2_polyline" style="fill: none; stroke-width: 1px; marker-start: url(&quot;#arrow8-6-right&quot;); marker-end: url(&quot;#arrow15-12-right&quot;);" points="782 175 781 222 673 222" /><text fill="black" x="114" y="103" id="packet_test" style="font-family: Arial; font-size: 13.6px;" >Packet: 0</text><text fill="black" x="780.153" y="248.538" id="list_test" style="font-family: Arial; font-size: 19.4px;" transform="matrix(0.684125 0 0 0.684125 277.582 86.141)" dy="" dx="">List: nil</text><text fill="black" x="230" y="170" id="sender" style="font-family: Arial; font-size: 13.1px;" dy="" dx="">Sender</text><text fill="black" x="720" y="177" id="receiver" style="font-family: Arial; font-size: 13.1px;" dy="" dx="">Receiver</text></svg>';

document.getElementById("getbtn").disabled=true;
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
              'enableSamples' : false,
              // disable taks new and open
              'disableTasks' : 'new open'
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
              
                $("#stack").html(v);
                $(".control").css("display", "block");
              
             alert(v);
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
