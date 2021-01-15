Rails.application.routes.draw do

  resources :todos, :categories

  resource :users, only: [:create]
  post '/login', to: "users#login"
  get '/logged_in', to: "users#loggedin"

end
