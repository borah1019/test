$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() < 100) {
      $('#header').removeClass('scroll');
    } else {
      $('#header').addClass('scroll');
    }
  });
});