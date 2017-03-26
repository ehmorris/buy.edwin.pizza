Rails.application.routes.draw do
  root :to => "application#show"
  get "success" => "application#success"
  get "failure" => "application#failure"
  post "charge", to: "application#charge"
end
