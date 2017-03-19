$(function() {
  new Waypoint.Inview({
    element: $('#mobius_trigger')[0],
    enter: function() {
      $(document).scrollTop(0);
      $('.success_message').toggleClass('success_message--inverted');
      $('.scroll').toggleClass('scroll--inverted');
    }
  });
});

