/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



//AJAX POST that sends the form data to the server

$(document).ready(function() { 
  $('form').on('submit', function(event) {
    event.preventDefault();
    $('.error1').slideUp();
    $('.error2').slideUp();

    // Get the trimmed value of the textarea
    const tweetText = $('textarea').val().trim();
    
    // Check if the tweet is empty
    if (tweetText.length === 0) {
      $('.error1').slideDown();
      return;
    } else if (tweetText.length > 140) {
      $('.error2').slideDown();
      return;
    }

    // Perform an AJAX POST request to the server to save the tweet
    $.ajax({
      method: 'POST', 
      data: { text: tweetText },
      url: '/tweets', 
      success: function() { 
        $('form')[0].reset(); // Reset the form and load tweets on successful submission

        $('.counter').text('140'); 
        loadTweets();
      }
    }); 
  }); 

  // Function to load tweets from the server
  const loadTweets = function() {
    $.ajax({
      method: 'GET', 
      datatype: JSON, 
      url: '/tweets', 
      success: function(data) { 
        renderTweets(data);
      }
    }); 
  }; 

  loadTweets(); 

  // Function to escape HTML characters to prevent XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }; 

  // Function to render tweets on the page
  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };
    
  // Function to create HTML element for a single tweet
  const createTweetElement = function(tweet) {
    const $tweet = `
      <article class="article"> 
        <header class="tweet-header">
          <div class='user'> 
            <span><img src="${tweet.user.avatars}" width="50" height="50"></img></span>
            <span class='name'> ${tweet.user.name} </span>  
          </div> 
          <span class='username'> ${tweet.user.handle} </span>  
        </header> 
        <p class="older-tweets"> ${escape(tweet.content.text)}</p> 
        <footer> 
          <span class='date'> ${timeago.format(tweet.created_at)} </span>
          <div class='user'> 
            <span><i id='img2' class="fa-solid fa-flag"></i></span>
            <span><i id='img3' class="fa-solid fa-retweet"></i></span> 
            <span><i id='img4' class="fa-solid fa-heart"></i></span>
          </div> 
        </footer>
      </article>
    `; 
    return $tweet;
  };
});
