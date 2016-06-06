Rails.application.routes.draw do
  resources :notes
  resources :sessions, only: [:new, :create]
  resources :users, only: [:new, :create]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'
  root 'notes#index'
end
