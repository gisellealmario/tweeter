/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



//AJAX POST that sends the form data to the server

$(document).ready(function() { 
  $('form').on('submit', function(event) {
    event.preventDefault();  
    $.ajax({
      method: 'POST', 
      data: $(this).serialize(), 
      url: '/tweets', 
      success: function() { 
        $('form')[0].reset(); 
        $('.counter').text('140'); 
        loadTweets();
      }
    }); 
  }); 

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

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }; 

  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };
    

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
