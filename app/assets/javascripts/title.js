$(function() {
  let set_timed_title = (title, duration) => {
    return setTimeout(() => { document.title = title; }, duration);
  };

  let title_sequence = () => {
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

  let clear_timeouts = (timeouts_array) => {
    timeouts_array.forEach((e) => { clearTimeout(e); });
  };

  let original_title = document.title;
  let title_sequence_timeout;

  $(document).on('visibilitychange', () => {
    if (!!document.hidden) {
      title_sequence_timeout = title_sequence();
    } else if (!!title_sequence_timeout) {
      clear_timeouts(title_sequence_timeout);
      document.title = original_title;
    }
  });
});
