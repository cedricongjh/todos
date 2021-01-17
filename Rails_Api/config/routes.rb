Rails.application.routes.draw do

  resources :todos, :categories

  resource :users, only: [:create]
  post '/login', to: "users#login"
  post '/logout', to: "users#logout"
  get '/logged_in', to: "users#auto_login"
  get '/user', to: "users#index"

end
