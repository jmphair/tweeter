$(document).ready(function() {
  // 'this' refers to the tweet-text input area receiving input? dev console is returning with every keystroke
  $("#tweet-text").on('input', function() {
    console.log(this); 
  });

});