$(function() {
  var prevent_touchmove = function(e) {
    e.preventDefault();
  };

  $('[lock-body-scrolling]').on('click', function() {
    $(document).scrollTop(0);

    $('body').addClass('lock_body_scrolling');
    $(document).on('touchmove', prevent_touchmove);
  });

  $('[unlock-body-scrolling]').on('click', function() {
    $('body').removeClass('lock_body_scrolling');
    $(document).off('touchmove', prevent_touchmove);
  });
});
