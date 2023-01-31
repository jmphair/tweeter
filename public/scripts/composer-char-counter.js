$(document).ready(function() {
  // 'this' refers to the tweet-text input area receiving input? dev console is returning with every keystroke
  $("#tweet-text").on('input', function() {
    
    let countLength = $(this).val().length;
    // console.log(countLength);
    // I don't know how to use 'this' instead of .counter... ask in break-out/lecture/mentor?
    $('.counter').html(140 - countLength);

  });

});

// ok tested each method and it looks like I stumbled on input correctly!

// blur - fires when input field loses focus
// keydown - fires when user presses any key on the keyboard
// keyup - fires when user releases any key on teh keyboard
// keypress - fires over and over while a key is pressed
// change - fires when the value has been changed