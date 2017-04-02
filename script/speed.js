
// For control animation

$( function() {
  $("#slider").slider({
                      value:100,
                      min: 1,
                      max: 1000,
                      step: 1,
                      slide: function( event, ui ){
                      $( "#slider-value" ).html( ui.value + " ms." );
                      }});
  
  $( "#slider-value" ).html(  $('#slider').slider('value') + " ms.");
  
});
