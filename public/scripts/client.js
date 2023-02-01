/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  created_at: 1461116232227,
};

const createTweetElement = function (tweet) {
  const $tweet = `
  <article class="tweet">

    <header>
      <div class="tweet-header-left">
        <span>🦁</span>
        <span>Queenie Phair</span>
      </div>
      <div class="tweet-header-right" >
        <span>@QPhair</span>
      </div>
      </header>

      <div class="tweet-text">
        <p>Do or do not. There is no try.</p>
      </div>

      <footer>
      <div class="tweet-footer-left">
        <p>Today</p>
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

$(() => {
  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)

  // to see what it looks like
  console.log($tweet);

  // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  $("#tweets-container").append($tweet);
});
