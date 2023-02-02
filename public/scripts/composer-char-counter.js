////////// CHARACTER COUNTER //////////
// This function shows the user how many characters are remaining for them to meet the 140 character conditions.
// It also hides any alert that is showing when the user begins to input text.
$(() => {
  $("#tweet-text").on('input', function() {
    let countLength = $(this).val().length;
    $('.counter').html(140 - countLength);
    if (countLength > 140) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', '#545149')
      $('.alert').slideUp('slow');
    }
  });
});