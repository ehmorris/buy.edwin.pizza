$(function() {
  var hidden_class = 'slides-slide-hidden';

  $('[slide]:not(:first-child)').addClass(hidden_class);

  $('[open-next-slide]').on('click', function() {
    var $this_slide = $(this).parents('[slide]');

    $this_slide.next('[slide]').removeClass(hidden_class);
    $this_slide.addClass(hidden_class);
  });
});
