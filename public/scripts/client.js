////////// SECURE INPUT FUNCTION //////////
// This function changes unsafe characters into a safe 'encoded' representation
const secureInput = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

////////// CREATE TWEET ELEMENT //////////
// This function creates the tweet that appears in the 'tweets-container'
const createTweetElement = function(tweet) {
  const timePassed = timeago.format(tweet.created_at);  
  const $tweet = `
  <article class="tweet">

    <header>
      <div class="tweet-header-left">
        <img src=${tweet.user.avatars}/>
        <span>${tweet.user.name}</span>
      </div>
      <div class="tweet-header-right" >
        <span>${tweet.user.handle}</span>
      </div>
      </header>

      <div class="tweet-text">
        <p>${secureInput(tweet.content.text)}</p>
      </div>

      <footer>
      <div class="tweet-footer-left">
        <p>${timePassed}</p>
      </div>
        <div class="tweet-footer-right">
          <i id="flag" class="fa-solid fa-flag"></i>
          <i id="retweet" class="fa-solid fa-retweet"></i>            
          <i id="heart" class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`;

  return $tweet;
};

////////// RENDER TWEETS //////////
// This function gets an array of tweet objects then loops through them and appends eachTweet to the page
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const eachTweet = createTweetElement(tweet);
    // change to prepend to have the newest tweet appear first...
    $("#tweets-container").prepend(eachTweet);
  }
};


////////// DOCUMENT READY FUNCTION //////////
$(() => {
  
  // Allows the new tweet to show up on the page without having to refresh
  const reFetch = function(formData) {
    $.ajax({ url: "/tweets", method: "POST", data: formData }).then(() => {
      $("#tweets-container").empty();
      $("#tweet-text").val("");
      $(".alert").empty();
      $(".counter").first().val(140);
      $('.counter').css('color', '#545149')
      loadTweets();
    });
  };


  // Event handler prevents the default behaviour when form is submitted
  $(".tweet-form").on("submit", function (evt) {
    evt.preventDefault();
    const formData = $(this).serialize();
    let tweetInput = $("#tweet-text").val();

    // VALIDATION
    if (tweetInput.length === 0) {
      $(".alert")
        .empty()
        .append("<p>ERROR: you need to write more things... (min 1 character)</p>");
      $('.alert').hide().slideDown('slow');
    } else if (tweetInput.length > 140) {
      $(".alert")
        .empty()
        .append("<p>ERROR: you need to write... less of the things. (max 140 characters)</p>");
      $('.alert').hide().slideDown('slow');
    } else {
      reFetch(formData);
    }
  });

  // Fetch tweets from the /tweets page
  const loadTweets = function() {
    $.ajax({ url: "/tweets", method: "GET"})
      .then(result => renderTweets(result));
  }
  loadTweets();

});