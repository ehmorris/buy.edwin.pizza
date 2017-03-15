class ApplicationController < ActionController::Base
  PRICE = 1500
  DISCOUNT_PRICE = 1200
  PRICE_DESC = "medium cheese — $15"
  DISCOUNT_PRICE_DESC = "medium cheese — $12"

  def show
    @price = PRICE
    @discount_price = DISCOUNT_PRICE
    @price_desc = PRICE_DESC
    @discount_price_desc = DISCOUNT_PRICE_DESC
  end

  def success
  end

  def failure
  end

  def charge
    Stripe.api_key = ENV["STRIPE_SECRET_KEY"]
    token = params[:stripeToken]
    discount = params[:discount]

    begin
      Stripe::Charge.create(
        :amount => discount ? DISCOUNT_PRICE : PRICE,
        :currency => "usd",
        :source => token,
        :description => discount ? DISCOUNT_PRICE_DESC : PRICE_DESC
      )
    rescue Stripe::CardError => e
      redirect_to failure_path
      return
    end

    redirect_to success_path
  end
end
