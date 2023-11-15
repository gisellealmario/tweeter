$(document).ready(function() {
  $(".new-tweet textarea").on("keyup", function() {
    const inputLength = $(this).val().length; // Get the length of the current value in the textarea
    const counter = $(this).closest("form").find(".counter");

    counter.text(140 - inputLength); //updated the text contect of the counter to show remaining characters
  });
});