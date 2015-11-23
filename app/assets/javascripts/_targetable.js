$(document).on("click", "[data-target]", function() {
  var $target_element = $("[data-targetable="+$(this).data("target")+"]");

  $("[data-targetable]").removeClass("show");

  $target_element.addClass("show");

  return false;
});
