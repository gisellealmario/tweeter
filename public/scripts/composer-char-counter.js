$(document).ready(function() {
  $(".new-tweet textarea").on("keyup", function() {
    const inputLength = $(this).val().length;
    const counter = $(this).closest("form").find(".counter");

    counter.text(140 - inputLength);
  });
});