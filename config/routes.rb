Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
    #apiのcontrollerを動かすための記述
    namespace :api do
      #defaultsオプションを利用し、このリクエストが来たらjson形式でレスポンスする
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end
