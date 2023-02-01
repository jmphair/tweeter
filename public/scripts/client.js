/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


////////// CREATE TWEET ELEMENT //////////
// This function creates the tweet that appears in the 'tweets-container'
const createTweetElement = function(tweet) {
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
        <p>${tweet.content.text}</p>
      </div>

      <footer>
      <div class="tweet-footer-left">
        <p>${tweet.created_at}</p>
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
    $("#tweets-container").append(eachTweet);
  }
};


////////// DOCUMENT READY FUNCTION //////////
// seperate as per tip from Vasiliy, can add in the function calls here
$(() => {
  
  // Event handler prevent the default behaviour when form is submitted
  $(".tweet-form").on("submit", function (evt) {
    evt.preventDefault();
    // Serialize the form data
    const formData = $(this).serialize();
    console.log(formData);
    // Send the formData to the server...
    $.post("/tweets", formData);
  });

  // Fetch tweets from the /tweets page
  const loadTweets = function() {
    //ajax needs to look at the url using get
    $.ajax({ url: "/tweets", method: "GET"})
      // 'then' i need to pass this into the renderTweets function which I deleted above
      .then(result => renderTweets(result));
  }
  // Call new function right after the definition
  loadTweets();

});