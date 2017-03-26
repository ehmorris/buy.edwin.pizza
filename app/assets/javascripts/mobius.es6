$(function() {
  if (!($('#mobius_top_trigger').length || $('#mobius_bottom_trigger').length)) return;

  let document_height = $(document).height();
  let window_height = $(window).height();
  let trigger_height = window_height;
  let safari_ui_height = 108;

  let invert_page = () => {
    $('.success_message').toggleClass('success_message--inverted');
    $('.scroll').toggleClass('scroll--inverted');
  };

  let set_mobius_to_top = (direction) => {
    if (direction === 'up') return;

    $(document).scrollTop(trigger_height + safari_ui_height);
    invert_page();
  };

  let set_mobius_to_bottom = (direction) => {
    if (direction === 'down') return;

    $(document).scrollTop(document_height - window_height - trigger_height - safari_ui_height);
    invert_page();
  };

  let bottom_trigger = new Waypoint.Inview({
    element: $('#mobius_bottom_trigger')[0],
    enter: set_mobius_to_top
  });

  let top_trigger = new Waypoint.Inview({
    element: $('#mobius_top_trigger')[0],
    enter: set_mobius_to_bottom
  });

  let initialize_page = () => {
    $(document).scrollTop(window_height + trigger_height);
  };

  setTimeout(initialize_page, 0);
});

