Rails.application.routes.draw do
  root :to => "application#show"
  
  post "charge", to: "application#charge"
end
