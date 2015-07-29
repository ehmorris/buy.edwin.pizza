class ApplicationController < ActionController::Base
  PRICE = 1500
  DISCOUNT_PRICE = 1200

  def show
    @price = PRICE
    @discount_price = DISCOUNT_PRICE
  end

  def charge
    Stripe.api_key = ENV["STRIPE_SECRET_KEY"]

    price = params[:price]

    unless price.to_i == PRICE || price.to_i == DISCOUNT_PRICE
      render "_failure"
      return
    end

    token = params[:stripeToken]
    description = params[:description]

    begin
      charge = Stripe::Charge.create(
        :amount => price,
        :currency => "usd",
        :source => token,
        :description => description
      )
    rescue Stripe::CardError => e
      render "_failure"
      return
    end

    render "_success"
  end
end
