$(document).on("click", "[data-target]", function() {
  var $target_element = $("[data-targetable="+$(this).data("target")+"]");

  if ($target_element.hasClass("showing")) return false;

  $target_element.addClass("show");

  $(document).scrollTop($(this).offset().top - 32);

  return false;
});
