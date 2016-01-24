$(function() {
  $('.famer-video').each(function() {
    new Waypoint.Sticky({
      element: this,
      wrapper: '<div class="famer-video_wrapper" />',
      stuckClass: 'famer-video--docked'
    });
  });
});
