var set_timed_title = function(title, duration) {
  return setTimeout(function() { document.title = title; }, duration);
};

var annoying_title = function() {
  return [
    set_timed_title('hey', 0),
    set_timed_title('...', 3000),
    set_timed_title('HEY', 4000),
    set_timed_title('.', 5000),
    set_timed_title('HEY!', 5500),
    set_timed_title('COME BACK!', 7000),
    set_timed_title('BUY ME PIZZA!', 9500),
    set_timed_title('BUY ME PIZZA!!', 9700),
    set_timed_title('BUY ME PIZZA!!!', 9900),
    set_timed_title('BUY ME PIZZA!!!!', 10100),
    set_timed_title('BUY ME PIZZA!!!!!', 10300)
  ];
};

var clear_timeouts = function(timeouts_array) {
  timeouts_array.forEach(function(e) {
    clearTimeout(e);
  });
};

$(function() {
  var original_title = document.title;
  var annoying_title_timeouts;

  $(document).on('visibilitychange', function() {
    if (!!document.hidden) {
      annoying_title_timeouts = annoying_title();
    } else {
      clear_timeouts(annoying_title_timeouts);
      document.title = original_title;
    }
  });
});
