Rails.application.routes.draw do
  devise_for :users
  root 'home#index'

  get 'dashboard' => 'dashboard#index'
  post 'token/generate' => 'token#generate'
  post 'call/connect' => 'call#connect'

  resources :tickets, only: [:create]
end
