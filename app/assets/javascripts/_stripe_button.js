var handler = StripeCheckout.configure({
  key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
  image: '/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: function(token) {
    // Use the token to create the charge with a server-side script.
    // You can access the token ID with `token.id`
  }
});

$('#customButton').on('click', function(e) {
  handler.open({
    name: 'Stripe.com',
    description: '2 widgets',
    amount: 2000
  });

  e.preventDefault();
});

$(window).on('popstate', function() {
  handler.close();
});
