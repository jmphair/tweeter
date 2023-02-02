/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


////////// CREATE TWEET ELEMENT //////////
// This function creates the tweet that appears in the 'tweets-container'

//use the second method here

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
        <p>${tweet.content.text}</p>
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
// seperate as per tip from Vasiliy, can add in the function calls here
$(() => {
  
  // Allows the new tweet to show up on the page without having to refresh
  const reFetch = function(formData) {
    $.ajax({ url: "/tweets", method: "POST", data: formData }).then(() => {
      $("#tweets-container").empty();
      loadTweets();
    });
  };

  // Event handler prevent the default behaviour when form is submitted
  $(".tweet-form").on("submit", function (evt) {
    evt.preventDefault();
    const formData = $(this).serialize();
    let tweetInput = $("#tweet-text").val();

    // VALIDATION
    if (tweetInput.length === 0) {
      alert("ERROR:\nYour tweet has no content!\n(min 1 character)");
      return;
    }
    if (tweetInput.length > 140) {
      alert("ERROR:\nYour tweet is too long!\n(max 140 characters)");
      return;
    }
    reFetch(formData);

  });

  // Fetch tweets from the /tweets page
  const loadTweets = function() {
    $.ajax({ url: "/tweets", method: "GET"})
      .then(result => renderTweets(result));
  }
  loadTweets();

});