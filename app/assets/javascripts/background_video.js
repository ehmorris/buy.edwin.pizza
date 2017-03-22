$(function() {
  const player_settings = {
    modestbranding: 1,
    rel: 0,
    showinfo: 0,
    loop: 0,
    playsinline: 0,
    controls: 0,
    autoplay: 0,
  };

  let video_list = [{
    id: '4btICcOUkw0',
    duration: 40,
    $container: null,
    container_height: null,
    container_top_offset: null
  }, {
    id: 'Vo18tkgMtrs',
    duration: 32,
    $container: null,
    container_height: null,
    container_top_offset: null
  }, {
    id: 'bonGYH8iepg',
    duration: 22,
    $container: null,
    container_height: null,
    container_top_offset: null
  }, {
    id: 'vjV1Vmex6nA',
    duration: 26,
    $container: null,
    container_height: null,
    container_top_offset: null
  }, {
    id: 'bA3NFrggbw8',
    duration: 35,
    $container: null,
    container_height: null,
    container_top_offset: null
  }, {
    id: 'DSOssUb6l7w',
    duration: 39,
    $container: null,
    container_height: null,
    container_top_offset: null
  }, {
    id: '3udj8MTuIyE',
    duration: 37,
    $container: null,
    container_height: null,
    container_top_offset: null
  }, {
    id: 'liUr3HBo_Eo',
    duration: 27,
    $container: null,
    container_height: null,
    container_top_offset: null
  }, {
    id: 'zg9FIwCmx5w',
    duration: 143,
    $container: null,
    container_height: null,
    container_top_offset: null
  }, {
    id: 'PnGnjF0Klh4',
    duration: 58,
    $container: null,
    container_height: null,
    container_top_offset: null
  }, {
    id: 'VjOm9sYyEFE',
    duration: 62,
    $container: null,
    container_height: null,
    container_top_offset: null
  }, {
    id: 'MVdr3h73baU',
    duration: 103,
    $container: null,
    container_height: null,
    container_top_offset: null
  }, {
    id: '8CakQFGBGg8',
    duration: 78,
    $container: null,
    container_height: null,
    container_top_offset: null
  }, {
    id: 'VgeiwGB6Q4g',
    duration: 116,
    $container: null,
    container_height: null,
    container_top_offset: null
  }, {
    id: 'rZojgVucBTA',
    duration: 108,
    $container: null,
    container_height: null,
    container_top_offset: null
  }, {
    id: 'YFO1Wrkk6Bs',
    duration: 1663,
    $container: null,
    container_height: null,
    container_top_offset: null
  }];

  let player = null;
  let player_is_initialized, player_being_initialized = false;
  let video = null;
  let new_video_loaded = false;
  let scrolling_stopped = null;

  let clip_number = (n) => {
    return Math.min(Math.max(n, .01), .99);
  };

  let activate_focus_mode = () => {
    $('body').addClass('video_in_focus');
  };

  let deactivate_focus_mode = () => {
    $('body').removeClass('video_in_focus');
  };

  let new_youtube_player = (element_id, video_id, callback, on_state_change) => {
    return new YT.Player(element_id, {
      videoId: video_id,
      playerVars: player_settings,
      events: {
        'onReady': callback,
        'onStateChange': on_state_change
      }
    });
  };

  let set_video_values = () => {
    console.group('video_values');
    if (!video.container_height) {
      console.log(`video.container_height = ${video.$container.height()}`);
      video.container_height = video.$container.height();
    }

    if (!video.container_top_offset) {
      console.log(`video.container_top_offset = ${video.$container.offset().top}`);
      video.container_top_offset = video.$container.offset().top;
    }

    console.groupEnd();
  };

  let seek_player = () => {
    let element_scroll_distance =
      window.scrollY - video.container_top_offset;
    let percent_scrolled =
      clip_number(element_scroll_distance / video.container_height);

    player.seekTo(video.duration * percent_scrolled, true);

    activate_focus_mode();
    if (scrolling_stopped) window.clearTimeout(scrolling_stopped);
    scrolling_stopped = window.setTimeout(deactivate_focus_mode, 300);
  };

  let hide_video = () => {
    $('.video').addClass('video--hide');
  };

  let unhide_video = () => {
    window.setTimeout(() => {
      $('.video').removeClass('video--hide');
    });
  };

  let activate_article_video = ($article) => {
    let article_index = $('.famer').index($article);
    video = video_list[article_index];

    console.log(`activate article ${article_index}, video ${video.id}`);

    if (!video.$container) {
      video.$container = $article;
    }

    if (!player_is_initialized && !player_being_initialized) {
      player_being_initialized = true;
      console.log(`player being initialized with ${video.id}`);
      player = new_youtube_player('video_element', video.id, () => {
        console.log('player done initializing');
        player_is_initialized = true;
        player_being_initialized = false;
        set_video_values();
        window.addEventListener('scroll', seek_player);
      }, ({data: state}) => {
        let ended = 0, unstarted = -1;

        if (state === ended || state === unstarted) hide_video();
        else unhide_video();
      });
    } else if (player_is_initialized && !player_being_initialized) {
      console.log(`player.loadVideoById(${video.id})`);
      player.loadVideoById(video.id);
      set_video_values();
    }
  };

  window.onYouTubeIframeAPIReady = () => {
    $('.famer').each((_, article) => {
      let article_trigger = new Waypoint.Inview({
        element: article,
        enter: (direction) => {
          if (direction === 'down') activate_article_video($(article));
        },
        exit: (direction) => {
          if (direction === 'up') activate_article_video($(article));
        }
      });
    });
  };
});
