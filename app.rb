require "sinatra"
require "stripe"

set :server, "webrick"
set :public_folder, "public"

Stripe.api_key = ENV["STRIPE_SECRET_KEY"]

get "/" do
  erb :index
end

get "/failed" do
  erb :failed
end

post "/charge" do
  token = params[:stripeToken]

  begin
    charge = Stripe::Charge.create(
      :amount => 1500,
      :currency => "usd",
      :source => token,
      :description => "medium cheese — $15.00"
    )
  rescue Stripe::CardError => e
    redirect "/failed"
  end

  redirect "/"
end

post "/charge_discount" do
  token = params[:stripeToken]

  begin
    charge = Stripe::Charge.create(
      :amount => 1200,
      :currency => "usd",
      :source => token,
      :description => "medium cheese — $12.00, cause I’m a cheap dick"
    )
  rescue Stripe::CardError => e
    redirect "/failed.html"
  end

  redirect "/"
end
