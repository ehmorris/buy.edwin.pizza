$(function() {
  let prevent_touchmove = (e) => {
    e.preventDefault();
  };

  $('[lock-body-scrolling]').on('click', () => {
    $(document).scrollTop(0);

    $('body').addClass('lock_body_scrolling');
    $(document).on('touchmove', prevent_touchmove);
  });

  $('[unlock-body-scrolling]').on('click', () => {
    $('body').removeClass('lock_body_scrolling');
    $(document).off('touchmove', prevent_touchmove);
  });
});
